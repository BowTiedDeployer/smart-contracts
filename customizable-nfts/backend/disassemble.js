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
} from './helper.js';
import { getAttributesMapTraitValue } from './merge_helper_functions.js';

import dotenv from 'dotenv';
import { jsonResponseToTokenUri, stringToMap, intToHexString } from './converters.js';
dotenv.config();

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

const getValuesFromQueue = async () => {
  // return a list having {address, id}
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'get-disassemble-work-queue',
    []
  );
  return values;

  return [
    {
      id: 1,
      address: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    },
    // {
    //   id: 2,
    //   address: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    // },
  ];
};

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

const jsonFetched = await fetchJsonUrl(urlNFT);

// fetch url from this - get components from attributes
console.log(getAttributesMapTraitValue(jsonFetched));

// calls SC function to mint-uri
// callSCFunctionWithNonce(networkN, 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 'degens', 'mint-uri', [
//   'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
//   'ipfs://will-be-here.json',
// ]);

const disassembleServerFlow = async () => {
  // for every work queue element
  (await getValuesFromQueue()).forEach(async (x) => {
    // get the token uri
    console.log('x', x);
    const urlNFT = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
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
    // console.log(attributes.Background);

    // -> mint them
    // (disassemble-finalize (token-id uint) (member principal) (background-name (string-ascii 30)) (body-name (string-ascii 30)) (rim-name (string-ascii 30)) (head-name (string-ascii 30)))

    callSCFunctionWithNonce(
      // TODO: add in list values so this can be done
      networkN,
      contracts[network].degens.split('.')[0],
      contracts[network].degens.split('.')[1],
      'disassemble-finalize',
      [
        x.id,
        x.address,
        attributes.Background,
        attributes.Car,
        attributes.Rims,
        `${attributes.Type}_${attributes.Head}_${attributes.Face}`,
      ]
    );
  });
};

await disassembleServerFlow();
