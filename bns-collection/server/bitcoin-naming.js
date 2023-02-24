import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import {
  network,
  contractBitcoinDegens,
  coreApiUrl,
  readOnlySCJsonResponse,
  jsonContentCreate,
  convertUintListToHex,
  convertIntListForBlockchainCall,
} from './consts.js';
import fs from 'fs';
import csvWriter from 'csv-write-stream';
import cron from 'node-cron';
let networkN =
  network === 'mainnet'
    ? new StacksMainnet({ url: coreApiUrl[network] })
    : network === 'testnet'
    ? new StacksTestnet({ url: coreApiUrl[network] })
    : new StacksMocknet();

// check which names are different
// using function read-only for a specific id
// called for every single id

// save logs with id nft and new name
const appendToCsv = (id, degenName) => {
  var writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream('./log.csv', { flags: 'a' }));
  writer.write({ header1: id, header2: degenName });
  writer.end();
};

// define function specific for getting the nft name of a bitcoin degen
// console.log(await getNFTNameBitcoinDegens(10));
const getNFTNameBitcoinDegens = async (id) => {
  return readOnlySCJsonResponse(
    networkN,
    contractBitcoinDegens[network].contractAddress,
    contractBitcoinDegens[network].contractAddress,
    contractBitcoinDegens[network].contractName,
    contractBitcoinDegens[network].functionName,
    [id]
  ).then((x) => (x.value != null ? x.value.value : null));
};

const getNFTNameListBitcoinDegens = async (idList) => {
  let convertedIdList = convertUintListToHex(convertIntListForBlockchainCall(idList));

  //format idList to be called
  return await readOnlySCJsonResponse(
    networkN,
    contractBitcoinDegens[network].contractAddress,
    contractBitcoinDegens[network].contractAddress,
    contractBitcoinDegens[network].contractName,
    contractBitcoinDegens[network].functionBatchName,
    [convertedIdList]
  );
};

// find all the names of bitcoin degens
const findAllNames = async () => {
  let idList = [];
  let blockchainDegenNameMap = {};
  let blockchainDegenNameMapRaw;
  let mapId = 0;
  for (let j = 0; j < 1; j++) {
    // how many batch get name calls are done
    for (let i = 1; i <= 4; i++) {
      // how many ids are in a batch call
      idList.push(i);
    }
    blockchainDegenNameMapRaw = await getNFTNameListBitcoinDegens(idList);

    blockchainDegenNameMapRaw.value.forEach((listItem) => {
      mapId++;
      blockchainDegenNameMap[mapId] = blockchainDegenNameMapRaw.value[mapId - 1].value.value;
    });

    for (let i = 1; i <= 4; i++) {
      let curr_id = j * 4 + i;
      // read json
      let degenJson = JSON.parse(fs.readFileSync(`../files_stored/jsons/${curr_id}.json`));
      if (degenJson.name != blockchainDegenNameMap[curr_id]) {
        // replace json.name = getNFTNameBitcoinDegens
        degenJson.name = blockchainDegenNameMap[curr_id];
        const jsonContent = jsonContentCreate(degenJson);
        // reWrite json
        fs.writeFileSync(`../files_stored/jsons/${curr_id}.json`, jsonContent);

        // keep a log with the updates jsons
        appendToCsv(i, degenJson.name);
      }
    }
  }
};

// cron-job every 5 minutes
//cron.schedule('*/2 * * * *', () => {
findAllNames();
//});
