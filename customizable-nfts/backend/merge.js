import fetch from 'node-fetch';
import { metadataOldDegensSrc } from './consts.js';
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
import { fetchJsonFromUrl, getAttributesMapTraitValue } from './helper_json.js';
import dotenv from 'dotenv';
import {
  jsonResponseToTokenUri,
  stringToMap,
  intToHexString,
  replaceTokenCurrentId,
  pinataToHTTPUrl,
} from './converters.js';
dotenv.config();
// take {id, principal} from queue
// do this steps calling SC
// (contract-call? .degens mint-uri 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "uriNiceDegen")
// ::set_tx_sender STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract add-disassemble-work-in-queue u1)
// ::set_tx_sender ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract disassemble-finalize u1 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "DarkPurple" "BentleyBlack" "ClassyCream" "Miami_Syringe_Cigar")
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.body-kits get-token-uri u1)
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.body-kits get-owner u1)

// to convert ${TokenId with current ID}

//   export const pinataToHTTPUrl = (pinataUrl) => {
//     let httpUrl = 'https://stxnft.mypinata.cloud/' + pinataUrl.slice(0, 4) + pinataUrl.slice(6);
//     return httpUrl;
// };

// const fetchNFTFromJSON = async (jsonSrc) => {
//     const res = await fetch(jsonSrc);
//     console.log(res)
//     return await res.json();
//   };

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

const listOfTuplesResponseToList = (tupleResponse) => {
  let idLists = [];
  const tupleList = tupleResponse.value.value;
  // console.log(tupleList);
  tupleList.forEach((x) => {
    idLists.push({
      degenId: x.value['degen-id'].value,
      degenType: x.value['degen-type'].value,
      address: x.value.member.value,
    });
  });
  return idLists;
};

const getValuesFromQueue = async () => {
  // return a list having {address, id}
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin[network],
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'get-merge-work-queue',
    []
  );
  console.log('values', values.value.value);
  //return [];
  return listOfTuplesResponseToList(values);
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
const mergeServerFlow = async () => {
  // for every work queue element
  let valueToDisassemble = await getValuesFromQueue();
  for await (const x of valueToDisassemble) {
    // (await getValuesFromQueue()).forEach(async (x) => {
    await new Promise((r) => setTimeout(r, 2000));
    // get the token uri
    console.log('x', x);
    const urlNFT = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].miami.split('.')[0],
        contracts[network].miami.split('.')[1],
        'get-token-uri',
        [x.degenId]
      )
    );
    console.log('y', x);
    console.log('urlNFT', pinataToHTTPUrl(replaceTokenCurrentId(urlNFT, x.degenId)));
    // -> get the json
    const jsonFetched = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlNFT, x.degenId)));

    // -> get the attributes
    const attributes = getAttributesMapTraitValue(jsonFetched);
    attributes.Type == 'Alien' ? (attributes.City = 'NYC') : (attributes.City = 'Miami');

    // -> mint them
    // (disassemble-finalize (token-id uint) (member principal) (background-name (string-ascii 30)) (body-name (string-ascii 30)) (rim-name (string-ascii 30)) (head-name (string-ascii 30)))

    callSCFunctionWithNonce(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'merge-finalize',
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

await mergeServerFlow();
