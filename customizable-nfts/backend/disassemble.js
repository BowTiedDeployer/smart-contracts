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
import { network, contracts, wallets, operationType } from './consts.js';
import {
  getAccountNonce,
  readOnlySCJsonResponse,
  callSCFunctionWithNonce,
  chainGetTxIdStatus,
  sleep,
  getTokenUri,
} from './helper_sc.js';
import dotenv from 'dotenv';
import { pinataToHTTPUrl } from './converters.js';
import { fetchJsonFromUrl, getAttributesMapTraitValue } from './helper_json.js';
import { dbGetTxId, dbUpdateTxId } from './helper_db.js';

dotenv.config();

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

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

const checkToStartFlow = async () => {
  const txId = await dbGetTxId(operationType.disassemble); //readFromDB
  // fetchJSONResponse(txId)
  // general call
  const status = await chainGetTxIdStatus(txId);

  if (status === 'success') {
    await disassembleServerFlow();
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

const disassembleServerFlow = async () => {
  // for every work queue element
  let valueToDisassemble = await getValuesFromQueueDisassemble();
  console.log(valueToDisassemble);
  // maximum 25 transactions done in a block by the same account
  let upperLimit = valueToDisassemble.length > 25 ? 25 : valueToDisassemble.length;
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
    // (await getValuesFromQueue()).forEach(async (x) => {
    // verify available nonce
    await checkNonceUpdate();

    const x = valueToDisassemble[i];
    // get the token uri
    console.log('x', x);
    const urlNFT = await getTokenUri(
      network,
      wallets.user[network],
      contracts[network].degens.split('.')[0],
      contracts[network].degens.split('.')[1],
      'get-token-uri',
      [x.id]
    );

    console.log('urlNFT', urlNFT);
    // -> get the json
    const jsonFetched = await fetchJsonFromUrl(pinataToHTTPUrl(urlNFT));

    // -> get the attributes
    const attributes = getAttributesMapTraitValue(jsonFetched);
    attributes.Type == 'Alien' ? (attributes.City = 'NYC') : (attributes.City = 'Miami');

    // -> mint them
    // (disassemble-finalize (token-id uint) (member principal) (background-name (string-ascii 30)) (body-name (string-ascii 30)) (rim-name (string-ascii 30)) (head-name (string-ascii 30)))
    lastTxId = await callSCFunctionWithNonce(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'disassemble-finalize',
      [
        x.id,
        x.address,
        attributes.Background,
        attributes.Car,
        attributes.Rims,
        `${attributes.City}_${attributes.Head}_${attributes.Face}`,
      ]
    );
  }
  console.log('lastTxId', lastTxId);

  dbUpdateTxId(operationType.disassemble, lastTxId);
};

// await disassembleServerFlow();
await checkToStartFlow();
