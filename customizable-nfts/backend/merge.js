import { nodeUrl, operationType } from './consts.js';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import { network, contracts, wallets } from './consts.js';
import { getAccountNonce, readOnlySCJsonResponse, chainGetTxIdStatus, sleep, callSCFunction } from './helper_sc.js';
import {
  fetchJsonFromUrl,
  getAttributesMapTraitValue,
  getImgComponentUrlFromJson,
  getImgGameUrlFromJson,
  jsonContentCreate,
} from './helper_json.js';
import { jsonResponseToTokenUri, replaceTokenCurrentId, pinataToHTTPUrl, hashToPinataUrl } from './converters.js';
import { oldToNewComponentNames } from './mapOldNewComponentNames.js';
import { imgInGameContentCreate, imgProfileContentCreate } from './helper_files.js';
import { uploadFlowImg, uploadFlowJson } from './uploads.js';
import { dbGetTxId, dbIncremendId, dbInsertNFTINdex, dbReadId, dbUpdateLastDone, dbUpdateTxId } from './helper_db.js';
import {
  getNrOperationsAvailable,
  getWalletStoredNonce,
  globalNonce,
  setNrOperationsAvailable,
  setWalletStoredNonce,
} from './variables.js';

let networkN =
  network === 'mainnet'
    ? new StacksMainnet({ url: nodeUrl[network] })
    : network === 'testnet'
    ? new StacksTestnet({ url: nodeUrl[network] })
    : new StacksMocknet();

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
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin[network],
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'get-merge-work-queue',
    []
  );
  return listOfTuplesResponseToList(values);
};

// add in list values with pre-filler.js so this can be done
const mergeServerFlow = async (operationLimit) => {
  // for every work queue element
  let valuesToMerge = await getValuesFromQueueMerge();
  console.log('valuesToMerge: ', valuesToMerge);

  // maximum 25 transactions done in a block by the same account
  let upperLimit = valuesToMerge.length < operationLimit ? valuesToMerge.length : operationLimit;

  let lastTxId = null;
  for (let i = 0; i < upperLimit; i++) {
    //verify available nonce

    const tuple = valuesToMerge[i];
    let attributes = {};

    // get the token uri
    let contractType = '';
    if (tuple.degenType == 'miami') contractType = 'miami';
    else contractType = 'nyc';
    console.log(contractType);
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
    console.log('urlJsonDegen', urlJsonDegen);
    // -> get the json
    // miami needs the replacement of ${TOKEN_ID} with the id
    let jsonDegen;
    if (tuple.degenType == 'miami')
      jsonDegen = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlJsonDegen, tuple.degenId)));
    // nyc gets the url with the id correct
    else jsonDegen = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlJsonDegen, tuple.degenId)));
    // -> get the attributes
    let attributesDegen = getAttributesMapTraitValue(jsonDegen);
    const backgroundNewName = oldToNewComponentNames[contractType].background[attributesDegen.Background];
    const carNewName =
      contractType == 'miami'
        ? oldToNewComponentNames[contractType].car[attributesDegen.Car]
        : oldToNewComponentNames[contractType].car[attributesDegen.Colors];
    console.log(attributesDegen);
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

    const urlBackgroundJSON = jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].backgrounds.split('.')[0],
        contracts[network].backgrounds.split('.')[1],
        'get-name-url',
        [backgroundNewName]
      )
    );

    const urlCarJSON = jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].cars.split('.')[0],
        contracts[network].cars.split('.')[1],
        'get-name-url',
        [carNewName]
      )
    );
    const urlRimsJSON = jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].rims.split('.')[0],
        contracts[network].rims.split('.')[1],
        'get-name-url',
        [rimsNewName]
      )
    );
    const urlHeadJSON = jsonResponseToTokenUri(
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
    console.log('urlRimsJSON', urlRimsJSON);
    const rimsJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlRimsJSON)));
    const headJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlHeadJSON)));

    const urlImgComponentBackground = getImgComponentUrlFromJson(backgroundJSONResponse);
    const urlImgGameCar = getImgGameUrlFromJson(carJSONResponse);
    const urlImgComponentCar = getImgComponentUrlFromJson(carJSONResponse);
    const urlImgComponentRims = getImgComponentUrlFromJson(rimsJSONResponse);
    const urlImgGameHead = getImgGameUrlFromJson(headJSONResponse);
    const urlImgComponentHead = getImgComponentUrlFromJson(headJSONResponse);

    let attributeBackground = getAttributesMapTraitValue(backgroundJSONResponse);
    let attributeCar = getAttributesMapTraitValue(carJSONResponse);
    let attributeRims = getAttributesMapTraitValue(rimsJSONResponse);
    let attributeHead = getAttributesMapTraitValue(headJSONResponse);

    const imgContent = await imgProfileContentCreate(
      pinataToHTTPUrl(urlImgComponentBackground),
      pinataToHTTPUrl(urlImgComponentCar),
      pinataToHTTPUrl(urlImgComponentRims),
      pinataToHTTPUrl(urlImgComponentHead)
    );

    let degenDbId = await dbReadId('degen');

    const degenName = `StacksDegen#${degenDbId}`;
    const degenImgName = `ImgStacksDegen#${degenDbId}`;
    const degenImgGameName = `ImgGameStacksDegen#${degenDbId}`;
    const degenJsonName = `JsonStacksDegen#${degenDbId}`;

    attributes = { ...attributeBackground, ...attributeCar, ...attributeHead, ...attributeRims };
    attributes = { ...attributes, Type: attributes.Race };
    const { Race, ...otherAttributes } = attributes;
    attributes = otherAttributes;

    const degenImgGame = await imgInGameContentCreate(pinataToHTTPUrl(urlImgGameCar), pinataToHTTPUrl(urlImgGameHead));

    const degenImgHash = await uploadFlowImg(degenImgName, imgContent);
    const degenImgGameHash = await uploadFlowImg(degenImgGameName, degenImgGame);

    const degenJson = jsonContentCreate(
      degenName,
      hashToPinataUrl(degenImgHash),
      '',
      hashToPinataUrl(degenImgGameHash),
      attributes,
      `StacksDegensNFT`
    );

    const degenJsonHash = await uploadFlowJson(degenJsonName, degenJson);
    // -> mint them

    lastTxId = await callSCFunction(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'merge-finalize',
      [tuple.degenId, tuple.address, hashToPinataUrl(degenJsonHash)],
      getWalletStoredNonce(wallets.admin.name)
    );
    setNrOperationsAvailable(getNrOperationsAvailable() - 1);
    setWalletStoredNonce(wallets.admin.name, getWalletStoredNonce(wallets.admin.name) + 1);
    await dbIncremendId('degen', degenDbId);
    await dbUpdateTxId(operationType.merge, lastTxId);
    await dbInsertNFTINdex(
      'stacksdegens',
      degenDbId,
      `StacksDegen#${degenDbId}`,
      'ipfs://' + degenJsonHash,
      'ipfs://' + degenImgHash,
      'ipfs://' + degenImgGameHash
    );
  }
};

export const checkToStartFlowMerge = async () => {
  const txId = await dbGetTxId(operationType.merge); //readFromDB
  // fetchJSONResponse(txId)
  // general call
  const status = await chainGetTxIdStatus(txId);
  const nrOperationsAvailable = getNrOperationsAvailable();
  console.log('operationLimit', nrOperationsAvailable);

  if ((status === 'success' || status === undefined) && nrOperationsAvailable > 0) {
    console.log('--------------flow can start-----------');
    await mergeServerFlow(nrOperationsAvailable);
    console.log('--------------db update-----------');
    await dbUpdateLastDone('merge');
  } else if (status === 'abort_by_response') {
    // todo: alert if problem case happen (as long as the SC has stx it will not happen)
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------aborted-----------xxxxxxx');
    console.error(`error: failed tx ${txId} with status: ${status}`);
  } else if (status === 'pending') {
    // do nothing
    console.log('----------pending----------');
  } else if (nrOperationsAvailable === 0) {
    // should never happen here because of check in recurrent
    console.log('No operations available');
  } else {
    console.error(`invalid status "${status}" txid: ${txId}`);
  }
};

// await checkToStartFlowMerge();
