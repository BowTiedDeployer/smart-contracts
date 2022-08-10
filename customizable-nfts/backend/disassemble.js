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
import { network, adminWallet, contracts } from './consts.js';
import {
  getAccountNonce,
  getNormalizedFee,
  readOnlySCJsonResponse,
  callSCFunction,
  callSCFunctionWithNonce,
} from './helper.js';
import { getAttributesMapTraitValue } from './merge_helper_functions.js';

import dotenv from 'dotenv';
import { jsonResponseToTokenUri, stringToMap, intToHexString } from './converters.js';
dotenv.config();

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

const fetchJsonUrl = async (url) => {
  // todo: see if possible without async promise
  return fetch(url).then((res) => res.json());
};

// const urlNFT = await getTokenUriNFT(
const urlNFT = jsonResponseToTokenUri(
  await readOnlySCJsonResponse(
    network,
    'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    'degens',
    'get-token-uri',
    [1]
  )
);

console.log(urlNFT);

const jsonFetched = await fetchJsonUrl(urlNFT);
console.log(jsonFetched);

// fetch url from this - get components from attributes
console.log(getAttributesMapTraitValue(jsonFetched));

// calls SC function to mint-name

// TODO: check and update to make it work - function not submitting SC call to blockchain
export async function chainMintDisassemble(address, url, networkInstance) {
  try {
    const latestNonce = await getAccountNonce(adminWallet[network]);
    console.log(adminWallet[network]);
    console.log(latestNonce);
    await callSCFunction(
      networkInstance,
      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      'degens',
      'mint-uri',
      ['ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5', 'ipfs://will-be-here.json'],
      latestNonce
    );

    // await mintNameUrl(address, url, latestNonce);
  } catch (error) {
    console.log(error);
  }
}

console.log(stringToMap(process.env.ADMIN_SECRET_KEY)[network]);
chainMintDisassemble('ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5', 'adasd', networkN);

// callSCFunctionWithNonce(networkN, 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 'degens', 'mint-uri', [
//   'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
//   'ipfs://will-be-here.json',
// ]);
