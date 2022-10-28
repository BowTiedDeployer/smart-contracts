// Assemble:
import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, nodeUrl, operationType, wallets } from './consts.js';
import { hashToPinataUrl, jsonResponseToTokenUri, pinataToHTTPUrl } from './converters.js';
import { dbGetTxId, dbIncremendId, dbInsertNFTINdex, dbReadId, dbUpdateLastDone, dbUpdateTxId } from './helper_db.js';
import { imgInGameContentCreate, imgProfileContentCreate } from './helper_files.js';
import {
  jsonContentCreate,
  fetchJsonFromUrl,
  getAttributesMapTraitValue,
  getImgGameUrlFromJson,
  getImgComponentUrlFromJson,
} from './helper_json.js';
import {
  callSCFunction,
  chainGetTxIdStatus,
  instantiateAllAccountsNonce,
  readOnlySCJsonResponse,
  sleep,
} from './helper_sc.js';
import { uploadFlowImg, uploadFlowJson } from './uploads.js';
import {
  getNrOperationsAvailable,
  getWalletStoredNonce,
  globalNonce,
  setNrOperationsAvailable,
  setWalletStoredNonce,
} from './variables.js';

// - needs nft id fetched from nfts owned combined with the nft metadata - gets it from the queue
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
  // console.log('valuesToAssemble: ', valuesToAssemble);

  // min( operationLimit, values.length )
  let upperLimit = valuesToAssemble.length < operationLimit ? valuesToAssemble.length : operationLimit;

  let lastTxId = null;
  for (let i = 0; i < upperLimit; i++) {
    // verify available nonce

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

    const degenDbId = await dbReadId('degen');
    const degenName = `Degen#${degenDbId}`;
    const degenImgName = `ImgDegen#${degenDbId}`;
    const degenImgGameName = `ImgGameDegen#${degenDbId}`;
    const degenJsonName = `JsonDegen#${degenDbId}`;

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

    //// upload json and get hash
    const degenJsonHash = await uploadFlowJson(degenJsonName, degenJson);
    console.log('jsonHash', degenJsonHash);

    // call assemble_finalize (member as address, json_hash as uri)
    let availableNonce = getWalletStoredNonce(wallets.admin.name);
    lastTxId = await callSCFunction(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'assemble-finalize',
      [tuple.address, hashToPinataUrl(degenJsonHash)],
      availableNonce
    );
    setNrOperationsAvailable(getNrOperationsAvailable() - 1);
    setWalletStoredNonce(wallets.admin.name, availableNonce + 1);
    console.log(`Nonce Used: ${availableNonce}`);

    await dbInsertNFTINdex(
      'stacksdegens',
      degenDbId,
      `Degen${degenDbId}`,
      degenJsonHash,
      degenImgHash,
      degenImgGameHash
    );
    // increment id
    await dbIncremendId('degen', degenDbId);

    console.log('lastTxId', lastTxId);
    await dbUpdateTxId(operationType.assemble, lastTxId);
  }
};

export const checkToStartFlowAssemble = async () => {
  const txId = await dbGetTxId(operationType.assemble); //readFromDB
  // fetchJSONResponse(txId)
  // general call

  instantiateAllAccountsNonce();
  const status = await chainGetTxIdStatus(txId);
  // const transactionCount = await getMempoolTransactionCount(wallets.admin[network]);
  // const operationLimit = 25 - transactionCount;
  const nrOperationsAvailable = getNrOperationsAvailable();
  console.log('operationLimit', nrOperationsAvailable);
  if ((status === 'success' || status === undefined) && nrOperationsAvailable > 0) {
    console.log('--------------flow can start-----------');
    await assembleServerFlow(nrOperationsAvailable);
    console.log('--------------db update-----------');
    await dbUpdateLastDone('assemble');
  } else if (status === 'abort_by_response') {
    // todo: alert if problem case happen (as long as the SC has stx it will not happen)
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------aborted-----------xxxxxxx');
    console.error(`error: failed tx ${txId} with status: ${status}`);
  } else if (status === 'pending') {
    // do nothing
    console.log(`----------pending---------- ${txId}`);
  } else if (nrOperationsAvailable === 0) {
    // should never happen here because of check in recurrent
    console.log('No operations available');
  } else {
    console.error(`invalid status "${status}" txid: ${txId}`);
  }
};

await checkToStartFlowAssemble();
// console.log('tx mempool', await getMempoolTransactionCount(wallets.admin[network]));
// await assembleServerFlow(25);
