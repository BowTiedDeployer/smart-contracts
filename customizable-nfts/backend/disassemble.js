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
} from './helper_sc.js';

import dotenv from 'dotenv';
import { jsonResponseToTokenUri, stringToMap, intToHexString } from './converters.js';
import { getAttributesMapTraitValue } from './helper_json.js';

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
  // console.log(values);
  return listOfTuplesResponseToList(values);
};

const fetchJsonUrl = async (url) => {
  // todo: see if possible without async promise
  return fetch(url).then((res) => res.json());
};

// const urlNFT = await getTokenUriNFT(
const urlNFT = jsonResponseToTokenUri(
  await readOnlySCJsonResponse(
    network,
    wallets.user[network],
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'get-token-uri',
    [1]
  )
);

// add in list values with pre-filler.js so this can be done
const disassembleServerFlow = async () => {
  // for every work queue element
  let valueToDisassemble = await getValuesFromQueueDisassemble();
  for await (const x of valueToDisassemble) {
    // (await getValuesFromQueue()).forEach(async (x) => {
    await new Promise((r) => setTimeout(r, 2000));
    // get the token uri
    console.log('x', x);
    const urlNFT = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].degens.split('.')[0],
        contracts[network].degens.split('.')[1],
        'get-token-uri',
        [x.id]
      )
    );
    console.log('y', x);
    console.log('urlNFT', urlNFT);
    // -> get the json
    const jsonFetched = await fetchJsonUrl(urlNFT);

    // -> get the attributes
    const attributes = getAttributesMapTraitValue(jsonFetched);
    attributes.Type == 'Alien' ? (attributes.City = 'NYC') : (attributes.City = 'Miami');

    // -> mint them
    // (disassemble-finalize (token-id uint) (member principal) (background-name (string-ascii 30)) (body-name (string-ascii 30)) (rim-name (string-ascii 30)) (head-name (string-ascii 30)))

    callSCFunctionWithNonce(
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
};

await disassembleServerFlow();
