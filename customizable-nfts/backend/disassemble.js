// done without insertion of elements in queue

// take {id, principal} from queue
// do this steps calling SC
// (contract-call? .degens mint-uri 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "uriNiceDegen")
// ::set_tx_sender STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract add-disassemble-work-in-queue u1)
// ::set_tx_sender ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract disassemble-finalize u1 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "DarkPurple" "BentleyBlack" "ClassyCream" "Miami_Syringe_Cigar")
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.body-kits get-token-uri u1)
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.body-kits get-owner u1)

import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import { network, contracts, wallets, operationType, nodeUrl } from './consts.js';
import { readOnlySCJsonResponse, callSCFunction, chainGetTxIdStatus, sleep, getTokenUri } from './helper_sc.js';
import dotenv from 'dotenv';
import { pinataToHTTPUrl } from './converters.js';
import { fetchJsonFromUrl, getAttributesMapTraitValue } from './helper_json.js';
import {
  dbGetTxId,
  dbIncremendCurrentId,
  dbIncremendId,
  dbInsertNFTINdex,
  dbReadId,
  dbUpdateLastDone,
  dbUpdateTxId,
} from './helper_db.js';
import {
  getNrOperationsAvailable,
  getWalletStoredNonce,
  globalNonce,
  setNrOperationsAvailable,
  setWalletStoredNonce,
} from './variables.js';
import {
  background_img_marketplace_hash,
  background_img_utility_hash,
  background_json_url_hash,
} from './hash-maps-components/backgorund-map.js';
import { car_img_marketplace_hash, car_img_utility_hash, car_json_url_hash } from './hash-maps-components/car-map.js';
import {
  head_img_marketplace_hash,
  head_img_utility_hash,
  head_json_url_hash,
} from './hash-maps-components/head-map.js';
import {
  rims_img_marketplace_hash,
  rims_img_utility_hash,
  rims_json_url_hash,
} from './hash-maps-components/rims-map.js';

dotenv.config();

let networkN =
  network === 'mainnet'
    ? new StacksMainnet({ url: nodeUrl[network] })
    : network === 'testnet'
    ? new StacksTestnet({ url: nodeUrl[network] })
    : new StacksMocknet();

const listOfTuplesResponseToList = (tupleResponse) => {
  let idLists = [];
  const tupleList = tupleResponse.value.value;
  // console.log(tupleList);
  tupleList.forEach((x) => {
    idLists.push({ id: x.value['token-id'].value, address: x.value.member.value });
  });
  return idLists;
};

const getValuesFromQueueDisassemble = async () => {
  // return a list having {address, id}
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin[network],
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'get-disassemble-work-queue',
    []
  );
  // console.log(values.value.value);
  //return [];
  return listOfTuplesResponseToList(values);
};

const disassembleServerFlow = async (operationLimit) => {
  // for every work queue element
  let valuesToDisassemble = await getValuesFromQueueDisassemble();
  console.log('valuesToDisassemble: ', valuesToDisassemble);

  // maximum 25 transactions done in a block by the same account
  let upperLimit = valuesToDisassemble.length < operationLimit ? valuesToDisassemble.length : operationLimit;

  let lastTxId = null;
  for (let i = 0; i < upperLimit; i++) {
    // (await getValuesFromQueue()).forEach(async (x) => {

    const tuple = valuesToDisassemble[i];
    // get the token uri
    console.log('tuple', tuple);
    const urlNFT = await getTokenUri(
      network,
      wallets.user[network],
      contracts[network].degens.split('.')[0],
      contracts[network].degens.split('.')[1],
      'get-token-uri',
      [tuple.id]
    );

    console.log('urlNFT', urlNFT);
    // -> get the json
    const jsonFetched = await fetchJsonFromUrl(pinataToHTTPUrl(urlNFT));

    // -> get the attributes
    const attributes = getAttributesMapTraitValue(jsonFetched);
    attributes.Type == 'Alien' ? (attributes.City = 'NYC') : (attributes.City = 'Miami');

    // -> mint them
    // (disassemble-finalize (token-id uint) (member principal) (background-name (string-ascii 30)) (body-name (string-ascii 30)) (rim-name (string-ascii 30)) (head-name (string-ascii 30)))
    lastTxId = await callSCFunction(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'disassemble-finalize',
      [
        tuple.id,
        tuple.address,
        attributes.Background,
        attributes.Car,
        attributes.Rims,
        `${attributes.City}_${attributes.Head}_${attributes.Face}`,
      ],
      getWalletStoredNonce(wallets.admin.name)
    );
    setNrOperationsAvailable(getNrOperationsAvailable() - 1);
    setWalletStoredNonce(wallets.admin.name, getWalletStoredNonce(wallets.admin.name) + 1);
    const backgroundId = await dbReadId('background');
    const carId = await dbReadId('car');
    const headId = await dbReadId('head');
    const rimsId = await dbReadId('rims');
    await dbInsertNFTINdex(
      'background',
      backgroundId,
      attributes.Background,
      background_json_url_hash[attributes.Background], // TODO: check if works as expected
      background_img_marketplace_hash[attributes.Background],
      background_img_utility_hash[attributes.Background]
    );
    await dbInsertNFTINdex(
      'car',
      carId,
      attributes.Car,
      car_json_url_hash[attributes.Car], // TODO:  check if works as expected
      car_img_marketplace_hash[attributes.Car],
      car_img_utility_hash[attributes.Car]
    );
    await dbInsertNFTINdex(
      'head',
      headId,
      `${attributes.City}_${attributes.Head}_${attributes.Face}`,
      head_json_url_hash[attributes.Head], // TODO: check if works as expected
      head_img_marketplace_hash[attributes.Head],
      head_img_utility_hash[attributes.Head]
    );
    await dbInsertNFTINdex(
      'rims',
      rimsId,
      attributes.Rims,
      rims_json_url_hash[attributes.Rims], // TODO: check if works as expected
      rims_img_marketplace_hash[attributes.Rims],
      rims_img_utility_hash[attributes.Rims]
    );

    await dbIncremendId('background', backgroundId);
    await dbIncremendId('car', carId);
    await dbIncremendId('head', headId);
    await dbIncremendId('rims', rimsId);

    console.log('lastTxId', lastTxId);

    await dbUpdateTxId(operationType.disassemble, lastTxId);
    // await dbIncremendId('degen', degenDbId);

    // console.log('lastTxId', lastTxId);
    // await dbUpdateTxId(operationType.assemble, lastTxId);
  }
};

export const checkToStartFlowDisassemble = async () => {
  const txId = await dbGetTxId(operationType.disassemble); //readFromDB
  // fetchJSONResponse(txId)
  // general call
  const status = await chainGetTxIdStatus(txId);
  const nrOperationsAvailable = getNrOperationsAvailable();

  console.log('operationLimit', nrOperationsAvailable);

  if ((status === 'success' || status === undefined) && nrOperationsAvailable > 0) {
    console.log('--------------flow can start-----------');
    await disassembleServerFlow(nrOperationsAvailable);
    console.log('--------------db update-----------');
    await dbUpdateLastDone('disassemble');
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

// await disassembleServerFlow();
// await checkToStartFlowDisassemble();
