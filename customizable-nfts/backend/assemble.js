// Assemble:
import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, operationType, wallets } from './consts.js';
import { hashToPinataUrl, jsonResponseToTokenUri, pinataToHTTPUrl } from './converters.js';
import { dbGetTxId, dbIncremendId, dbReadCurrentId, dbUpdateLastDone, dbUpdateTxId } from './helper_db.js';
import { imgInGameContentCreate, imgProfileContentCreate } from './helper_files.js';
import {
  jsonContentCreate,
  fetchJsonFromUrl,
  getAttributesMapTraitValue,
  getImageUrlFromJson,
  getImgGameUrlFromJson,
  getImgComponentUrlFromJson,
} from './helper_json.js';
import {
  callSCFunctionWithNonce,
  chainGetTxIdStatus,
  checkNonceUpdate,
  getAccountNonce,
  getMempoolTransactionCount,
  readOnlySCJsonResponse,
  sleep,
} from './helper_sc.js';
import { uploadFlowImg, uploadFlowJson } from './uploads.js';

// - needs nft id fetched from nfts owned combined with the nft metadata - gets it from the queue

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

const listOfTuplesResponseToList = (tupleResponse) => {
  let idLists = [];
  const tupleList = tupleResponse.value.value;
  tupleList.forEach((x) => {
    idLists.push({
      address: x.value.member.value,
      backgroundId: x.value['background-id'].value,
      carId: x.value['car-id'].value,
      rimId: x.value['rim-id'].value,
      headId: x.value['head-id'].value,
    });
  });
  return idLists;
};

const getValuesFromQueueAssemble = async () => {
  // return a list having {}
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin[network],
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'get-assemble-work-queue',
    []
  );
  return listOfTuplesResponseToList(values);
};

const assembleServerFlow = async (operationLimit) => {
  // get values from queue
  let valuesToAssemble = await getValuesFromQueueAssemble();
  console.log('valuesToAssemble: ', valuesToAssemble);
  console.log('valuesToAssemble.length: ', valuesToAssemble.length);

  // min( operationLimit, values.length )
  let upperLimit = valuesToAssemble.length < operationLimit ? valuesToAssemble.length : operationLimit;
  let availableNonce = await getAccountNonce(wallets.admin[network]);
  let lastUsedNonce = availableNonce - 1;

  console.log('upperLimit', upperLimit);

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
    // verify available nonce
    await checkNonceUpdate();

    const tuple = valuesToAssemble[i];
    console.log('tuple', tuple);
    let attributes = {};

    // Promise all
    // take jsons (background, rims, car, head - type: alien/skull, face, head)
    const urlJsonBackground = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].backgrounds.split('.')[0],
        contracts[network].backgrounds.split('.')[1],
        'get-token-uri',
        [tuple.backgroundId]
      )
    );

    const urlJsonCar = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].cars.split('.')[0],
        contracts[network].cars.split('.')[1],
        'get-token-uri',
        [tuple.carId]
      )
    );

    const urlJsonHead = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].heads.split('.')[0],
        contracts[network].heads.split('.')[1],
        'get-token-uri',
        [tuple.headId]
      )
    );

    const urlJsonRims = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].rims.split('.')[0],
        contracts[network].rims.split('.')[1],
        'get-token-uri',
        [tuple.rimId]
      )
    );

    // Promise all
    // get the attribute value & imgUrl from each json
    const jsonBackground = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonBackground));
    const jsonCar = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonCar));
    const jsonHead = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonHead));
    const jsonRims = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonRims));

    const urlImgComponentBackground = getImgComponentUrlFromJson(jsonBackground);
    let attributeBackground = getAttributesMapTraitValue(jsonBackground);

    const urlImgGameCar = getImgGameUrlFromJson(jsonCar);
    const urlImgComponentCar = getImgComponentUrlFromJson(jsonCar);
    let attributeCar = getAttributesMapTraitValue(jsonCar);

    // console.log('jsonHead: ', jsonHead);
    const urlImgGameHead = getImgGameUrlFromJson(jsonHead);
    const urlImgComponentHead = getImgComponentUrlFromJson(jsonHead);
    let attributeHead = getAttributesMapTraitValue(jsonHead);

    const urlImgComponentRims = getImgComponentUrlFromJson(jsonRims);
    // console.log('urlImgComponentRims', urlImgComponentRims);
    let attributeRims = getAttributesMapTraitValue(jsonRims);

    attributes = { ...attributeBackground, ...attributeCar, ...attributeHead, ...attributeRims };

    //convert Race -> Type
    attributes = { ...attributes, Type: attributes.Race };
    const { Race, ...otherAttributes } = attributes;
    attributes = otherAttributes;
    console.log('attributes', attributes);

    const currentDbId = await dbReadCurrentId();
    const degenName = `BadDegen#${currentDbId}`;
    const degenImgName = `BadImgDegen#${currentDbId}`;
    const degenImgGameName = `BadImgGameDegen#${currentDbId}`;
    const degenJsonName = `BadJsonDegen#${currentDbId}`;

    // create image from component img urls (background_url, rims_url, car_url, head_url)
    const degenImg = await imgProfileContentCreate(
      pinataToHTTPUrl(urlImgComponentBackground),
      pinataToHTTPUrl(urlImgComponentCar),
      pinataToHTTPUrl(urlImgComponentHead),
      pinataToHTTPUrl(urlImgComponentRims)
    );

    const degenImgGame = await imgInGameContentCreate(pinataToHTTPUrl(urlImgGameCar), pinataToHTTPUrl(urlImgGameHead));

    // upload image and get hash
    const degenImgHash = await uploadFlowImg(degenImgName, degenImg);
    const degenImgGameHash = await uploadFlowImg(degenImgGameName, degenImgGame);

    // create json with component attributes (name#id, img hash, img comp hash, img game hash, attributes, collection("DegenNFT"))
    const degenJson = jsonContentCreate(
      degenName,
      hashToPinataUrl(degenImgHash),
      '',
      hashToPinataUrl(degenImgGameHash),
      attributes,
      'DegenNFT'
    );
    // console.log(degenJson);

    // upload json and get hash
    const degenJsonHash = await uploadFlowJson(degenJsonName, degenJson);
    console.log('jsonHash', degenJsonHash);

    // call assemble_finalize (member as address, json_hash as uri)
    lastTxId = await callSCFunctionWithNonce(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'assemble-finalize',
      [tuple.address, hashToPinataUrl(degenJsonHash)]
    );

    // increment id
    await dbIncremendId(currentDbId);

    console.log('lastTxId', lastTxId);
    await dbUpdateTxId(operationType.assemble, lastTxId);
  }
};

export const checkToStartFlowAssemble = async () => {
  const txId = await dbGetTxId(operationType.assemble); //readFromDB
  // fetchJSONResponse(txId)
  // general call
  const status = await chainGetTxIdStatus(txId);
  const transactionCount = await getMempoolTransactionCount(wallets.admin[network]);
  const operationLimit = 25 - transactionCount;
  console.log('operationLimit', operationLimit);

  if ((status === 'success' || status === undefined) && operationLimit > 0) {
    console.log('--------------flow can start-----------');
    await assembleServerFlow(operationLimit);
    console.log('--------------db update-----------');
    await dbUpdateLastDone('assemble');
  } else if (status === 'abort_by_response') {
    // todo: alert if problem case happen (as long as the SC has stx it will not happen)
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------aborted-----------xxxxxxx');
    console.error(`error: failed tx ${txId} with status: ${status}`);
  } else if (status === 'pending') {
    // do nothing
    console.log(`----------pending---------- ${txId}`);
  } else {
    console.error(`invalid status "${status}" txid: ${txId}`);
  }
};

// await checkToStartFlowAssemble();

await assembleServerFlow(25);
