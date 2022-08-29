// Assemble:

import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import { jsonResponseToTokenUri } from './converters.js';
import { readOnlySCJsonResponse } from './helper_sc.js';

// - needs nft id fetched from nfts owned combined with the nft metadata - gets it from the queue


let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

// const getValuesFromQueueAssemble = async () => {
//   return [
//     {
//       idBackground: 1,
//       idCar: 1,
//       idHead: 1,
//       idRims: 1,
//       address: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
//     },
//   ];

//   // return a list having {address, id}
//   const values = await readOnlySCJsonResponse(
//     networkN,
//     wallets.admin,
//     contracts[network].degens.split('.')[0],
//     contracts[network].degens.split('.')[1],
//     'get-assemble-work-queue',
//     []
//   );
//   return values;
// };

const getValuesFromQueueAssemble = async() => {
  // return a list having {}
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin[network],
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'get-assemble-work-queue',
    []
  );
  console.log(values);
  // return listOfTuplesResponseToList(values);
}

// readOnlySCJsonResponse(
//   networkN,
//   wallets.admin[network],
//   contracts[network].background.split('.')[0],
//   contracts[network].background.split('.')[1],
//   'get-token-uri',
//   []
// );

const assembleServerFlow = async () => {
  // get values from queue
  let valueToAssemble = await getValuesFromQueueAssemble();

  // take jsons ( background, rims, car, head - type: alien/ skull, face: absa, head: dads)

  // const urlBackground = jsonResponseToTokenUri(await reat);

  // get the attribute value from each json

  // background, rims & car direct

  // head gets 3 attributes

  // create json with those attributes

  // create image from json

  // upload image and get hash

  // update json with img + id

  // upload json to pinata

  // call assemble_finalize with (value.member, json url)

  // increment id

};

await assembleServerFlow();