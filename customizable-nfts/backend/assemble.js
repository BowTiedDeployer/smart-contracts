// Assemble:

import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network/dist';
import { contracts, network, wallets } from './consts';
import { jsonResponseToTokenUri } from './converters';
import { readOnlySCJsonResponse } from './helper-sc.js';

// - needs nft id fetched from nfts owned combined with the nft metadata - gets it from the queue

// get value from queue

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

const getValuesFromQueueAssemble = async () => {
  return [
    {
      idBackground: 1,
      idCar: 1,
      idHead: 1,
      idRims: 1,
      address: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    },
  ];

  // return a list having {address, id}
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'get-assemble-work-queue',
    []
  );
  return values;
};

// take jsons ( background, rims, car, head - type: alien/ skull, face: absa, head: dads)

readOnlySCJsonResponse(
  networkN,
  wallets.admin[network],
  contracts[network].background.split('.')[0],
  contracts[network].background.split('.')[1],
  'get-token-uri',
  []
);
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
