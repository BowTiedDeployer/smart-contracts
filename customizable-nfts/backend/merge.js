import fetch from 'node-fetch';
import { metadataOldDegensSrc, operationType } from './consts.js';
import {
  standardPrincipalCV,
  cvToHex,
  hexToCV,
  cvToJSON,
  PostConditionMode,
  makeContractCall,
  broadcastTransaction,
  stringAsciiCV,
} from '@stacks/transactions';
import BigNum from 'bn.js';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import { network, contracts, wallets } from './consts.js';
import {
  getAccountNonce,
  getNormalizedFee,
  readOnlySCJsonResponse,
  callSCFunction,
  callSCFunctionWithNonce,
  callSCFunctionWithNonceUser,
  checkNonceUpdate,
  chainGetTxIdStatus,
  sleep,
} from './helper_sc.js';
import { fetchJsonFromUrl, getAttributesMapTraitValue, jsonContentCreate } from './helper_json.js';
import dotenv from 'dotenv';
import {
  jsonResponseToTokenUri,
  stringToMap,
  intToHexString,
  replaceTokenCurrentId,
  pinataToHTTPUrl,
  jsonResponseToTokenName,
  hashToPinataUrl,
} from './converters.js';
import { oldToNewComponentNames } from './mapOldNewComponentNames.js';
import { imgProfileContentCreate } from './helper_files.js';
import { uploadFlowImg, uploadFlowJson } from './uploads.js';
import { dbGetTxId, dbIncremendId, dbReadCurrentId, dbUpdateTxId } from './helper_db.js';

let networkN =
  // @ts-ignore
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

const listOfTuplesResponseToList = (tupleResponse) => {
  let idLists = [];
  const tupleList = tupleResponse.value.value;
  tupleList.forEach((x) => {
    idLists.push({
      degenId: x.value['degen-id'].value,
      degenType: x.value['degen-type'].value,
      address: x.value.member.value,
    });
  });
  return idLists;
};

const getValuesFromQueueMerge = async () => {
  // return a list having {address, id}
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin[network],
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'get-merge-work-queue',
    []
  );
  //return [];
  return listOfTuplesResponseToList(values);
};

// add in list values with pre-filler.js so this can be done
const mergeServerFlow = async () => {
  // for every work queue element
  let valuesToMerge = await getValuesFromQueueMerge();

  // maximum 25 transactions done in a block by the same account
  let upperLimit = valuesToMerge.length > 25 ? 25 : valuesToMerge.length;
  let availableNonce = await getAccountNonce(wallets.admin[network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.admin[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  let lastTxId = null;
  for (let i = 0; i < upperLimit; i++) {
    //verify available nonce
    await checkNonceUpdate();

    const tuple = valuesToMerge[i];
    console.log(tuple);
    let attributes = {};

    // get the token uri
    let contractType = '';
    if (tuple.degenType == 'miami') contractType = 'miami';
    else contractType = 'nyc';
    const urlJsonDegen = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network][contractType].split('.')[0],
        contracts[network][contractType].split('.')[1],
        'get-token-uri',
        [tuple.degenId]
      )
    );
    // -> get the json
    const jsonDegen = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlJsonDegen, tuple.degenId)));
    // -> get the attributes
    let attributesDegen = getAttributesMapTraitValue(jsonDegen);
    const backgroundNewName = oldToNewComponentNames[contractType].background[attributesDegen.Background];
    const carNewName =
      contractType == 'miami'
        ? oldToNewComponentNames[contractType].car[attributesDegen.Car]
        : oldToNewComponentNames[contractType].car[attributesDegen.Colors];
    const headPartialNewName = oldToNewComponentNames[contractType].head[attributesDegen.Head];
    const facePartialNewName = oldToNewComponentNames[contractType].face[attributesDegen.Face];
    const rimsNewName = oldToNewComponentNames[contractType].rims[attributesDegen.Rims];
    let headNewName = '';
    let typeNewName = '';
    if (tuple.degenType == 'miami') {
      typeNewName = 'Skull';
      headNewName = `Miami_${headPartialNewName}_${facePartialNewName}`;
    } else if (tuple.degenType == 'nyc') {
      typeNewName = 'Alien';
      headNewName = `NYC_${headPartialNewName}_${facePartialNewName}`;
    }

    //console.log('urlheadJSON', urlHeadJSON);
    const urlBackgroundJSON = jsonResponseToTokenName(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].backgrounds.split('.')[0],
        contracts[network].backgrounds.split('.')[1],
        'get-name-url',
        [backgroundNewName]
      )
    );

    const urlCarJSON = jsonResponseToTokenName(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].cars.split('.')[0],
        contracts[network].cars.split('.')[1],
        'get-name-url',
        [carNewName]
      )
    );
    const urlRimsJSON = jsonResponseToTokenName(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].rims.split('.')[0],
        contracts[network].rims.split('.')[1],
        'get-name-url',
        [rimsNewName]
      )
    );
    const urlHeadJSON = jsonResponseToTokenName(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].heads.split('.')[0],
        contracts[network].heads.split('.')[1],
        'get-name-url',
        [headNewName]
      )
    );
    const backgroundJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlBackgroundJSON)));
    const carJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlCarJSON)));
    const rimsJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlRimsJSON)));
    const headJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlHeadJSON)));

    const urlImgBackground = backgroundJSONResponse.image;
    const urlImgCar = carJSONResponse.image;
    const urlImgRims = rimsJSONResponse.image;
    const urlImgHead = headJSONResponse.image;

    let attributeBackground = getAttributesMapTraitValue(backgroundJSONResponse);
    let attributeCar = getAttributesMapTraitValue(carJSONResponse);
    let attributeRims = getAttributesMapTraitValue(rimsJSONResponse);
    let attributeHead = getAttributesMapTraitValue(headJSONResponse);

    //const backgroundImgUrl= await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlBackgroundJSON)));
    console.log('imgHeadURL', pinataToHTTPUrl(replaceTokenCurrentId(urlHeadJSON)));

    const imgContent = await imgProfileContentCreate(
      pinataToHTTPUrl(urlImgBackground),
      pinataToHTTPUrl(urlImgCar),
      pinataToHTTPUrl(urlImgRims),
      pinataToHTTPUrl(urlImgHead)
    );
    let currentDbId = await dbReadCurrentId();
    const degenName = `BadDegen#${currentDbId}`;
    const degenImgName = `BadImgDegen#${currentDbId}`;

    attributes = { ...attributeBackground, ...attributeCar, ...attributeHead, ...attributeRims };
    attributes = { ...attributesDegen, Type: attributes.Race };
    const { Race, ...otherAttributes } = attributes;
    attributes = otherAttributes;

    const degenImgHash = await uploadFlowImg(degenImgName, imgContent);
    // todo: should pass attribute dictionary instead of list -> function jsonContentCreate
    const degenJson = jsonContentCreate(degenName, hashToPinataUrl(degenImgHash), '', '', attributes, `DegenNFT`);
    const degenJsonHash = await uploadFlowJson(`JSONDegen#${currentDbId}`, degenJson);
    // -> mint them
    //(define-public (merge-finalize (degen-id uint) (member principal) (metadata-uri-dgn (string-ascii 99)))

    // todo: should pass ipfs://jsonHash instead of jsonHash -> function hashToPinataUrl
    lastTxId = await callSCFunctionWithNonce(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'merge-finalize',
      [tuple.degenId, tuple.address, degenJsonHash]
    );
    await dbIncremendId(currentDbId);
    await dbUpdateTxId(operationType.merge, lastTxId);
  }
};

const checkToStartFlow = async () => {
  const txId = await dbGetTxId(operationType.merge); //readFromDB
  // fetchJSONResponse(txId)
  // general call
  const status = await chainGetTxIdStatus(txId);

  if (status === 'success') {
    await mergeServerFlow();
    console.log('--------------flow can start-----------');
  } else if (status === 'abort_by_response') {
    // todo: alert if problem case happen (as long as the SC has stx it will not happen)
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------aborted-----------xxxxxxx');
    console.error(`error: failed tx ${txId} with status: ${status}`);
  } else if (status === 'pending') {
    // do nothing
    console.log('----------pending----------');
  } else {
    console.error(`invalid status "${status}" txid: ${txId}`);
  }
};

await checkToStartFlow();
