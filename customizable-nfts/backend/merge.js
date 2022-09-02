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
  checkNonceUpdate,
} from './helper_sc.js';
import { composeJSON, fetchJsonFromUrl, getAttributesMapTraitValue } from './helper_json.js';
import dotenv from 'dotenv';
import {
  jsonResponseToTokenUri,
  stringToMap,
  intToHexString,
  replaceTokenCurrentId,
  pinataToHTTPUrl,
  jsonResponseToTokenName,
} from './converters.js';
import { oldToNewComponentNames } from './mapOldNewComponentNames.js';
import { imgContentCreate } from './helper_files.js';
import { uploadFlowImg, uploadFlowJson } from './uploads.js';
import { dbIncremendId, dbReadCurrentId } from './helper_db.js';
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
  //return [];
  return listOfTuplesResponseToList(values);
};

// const urlNFT = await getTokenUriNFT(
const urlNFT = jsonResponseToTokenUri(
  await readOnlySCJsonResponse(
    network,
    wallets.user[network],
    contracts[network].miami.split('.')[0],
    contracts[network].miami.split('.')[1],
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

    // await new Promise((r) => setTimeout(r, 2000));
    let availableNonce = await getAccountNonce(wallets.admin.wallet);
    let lastUsedNonce = availableNonce - 1;
    checkNonceUpdate(1, availableNonce, lastUsedNonce);

    // get the token uri
    console.log('x', x);
    let contractType = '';
    if (x.degenType == 'miami') contractType = 'miami';
    else contractType = 'nyc';
    const urlNFT = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network][contractType].split('.')[0],
        contracts[network][contractType].split('.')[1],
        'get-token-uri',
        [x.degenId]
      )
    );
    console.log('y', x);
    //console.log('urlNFT', pinataToHTTPUrl(replaceTokenCurrentId(urlNFT, x.degenId)));
    // -> get the json
    const jsonFetched = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlNFT, x.degenId)));
    //console.log(jsonFetched)
    // -> get the attributes
    const attributes = getAttributesMapTraitValue(jsonFetched);
    console.log('attributes', attributes);
    console.log(contractType);
    const backgroundNewName = oldToNewComponentNames[contractType].background[attributes.Background];
    console.log(backgroundNewName);
    const carNewName =
      contractType == 'miami'
        ? oldToNewComponentNames[contractType].car[attributes.Car]
        : oldToNewComponentNames[contractType].car[attributes.Colors];
    console.log(carNewName);
    const headPartialNewName = oldToNewComponentNames[contractType].head[attributes.Head];
    console.log(headPartialNewName);
    const facePartialNewName = oldToNewComponentNames[contractType].face[attributes.Face];
    console.log(facePartialNewName);
    const rimsNewName = oldToNewComponentNames[contractType].rims[attributes.Rims];
    let headNewName = '';
    let typeNewName = '';
    if (x.degenType == 'miami') {
      typeNewName = 'Skull';
      headNewName = `Miami_${headPartialNewName}_${facePartialNewName}`;
    } else if (x.degenType == 'nyc') {
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
    console.log('urlBg', pinataToHTTPUrl(replaceTokenCurrentId(urlBackgroundJSON)));
    const backgroundJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlBackgroundJSON)));
    console.log(backgroundJSONResponse);
    const carJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlCarJSON)));
    console.log('carIMG', carJSONResponse.image);
    const rimsJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlRimsJSON)));
    console.log('rimsIMG', rimsJSONResponse.image);

    const headJSONResponse = await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlHeadJSON)));

    //const backgroundImgUrl= await fetchJsonFromUrl(pinataToHTTPUrl(replaceTokenCurrentId(urlBackgroundJSON)));
    console.log('imgHeadURL', pinataToHTTPUrl(replaceTokenCurrentId(urlHeadJSON)));

    const imgContent = await imgContentCreate(
      pinataToHTTPUrl(backgroundJSONResponse.image),
      pinataToHTTPUrl(carJSONResponse.image),
      pinataToHTTPUrl(rimsJSONResponse.image),
      pinataToHTTPUrl(headJSONResponse.image)
    );
    let currDBId = await dbReadCurrentId();
    const imgHash = await uploadFlowImg(`imgDegen#${currDBId}`, imgContent);
    dbIncremendId(currDBId);

    // todo: should pass attribute dictionary instead of list -> function jsonContentCreate
    const composedJSON = composeJSON(
      `imgDegen#${currDBId}`,
      `ipfs://${imgHash}`,
      [
        { trait_type: 'Background', value: backgroundNewName },
        { trait_type: 'Car', value: carNewName },
        { trait_type: 'Rims', value: rimsNewName },
        { trait_type: 'Type', value: typeNewName },
        { trait_type: 'Head', value: headPartialNewName },
        { trait_type: 'Face', value: facePartialNewName },
      ],
      `DegenNFT`
    );
    console.log(composedJSON);
    const jsonHash = await uploadFlowJson(`JSONDegen#${currDBId}`, composedJSON);
    // -> mint them
    //(define-public (merge-finalize (degen-id uint) (member principal) (metadata-uri-dgn (string-ascii 99)))

    // todo: should pass ipfs://jsonHash instead of jsonHash -> function hashToPinataUrl
    callSCFunctionWithNonce(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'merge-finalize',
      [x.degenId, x.address, jsonHash]
    );
  }
};

await mergeServerFlow();
