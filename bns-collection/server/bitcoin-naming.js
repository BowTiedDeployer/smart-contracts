import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { network, contractBitcoinDegens, coreApiUrl, readOnlySCJsonResponse, jsonContentCreate } from './consts.js';
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

// find all the names of bitcoin degens
const findAllNames = async () => {
  for (let i = 1; i <= 3; i++) {
    // read json
    let degenJson = JSON.parse(fs.readFileSync(`../files_stored/jsons/${i}.json`));
    const blockchainDegenName = await getNFTNameBitcoinDegens(i);
    if (degenJson.name != blockchainDegenName) {
      // replace json.name = getNFTNameBitcoinDegens
      degenJson.name = blockchainDegenName;
      const jsonContent = jsonContentCreate(degenJson);
      // reWrite json
      fs.writeFileSync(`../files_stored/jsons/${i}.json`, jsonContent);

      // keep a log with the updates jsons
      appendToCsv(i, degenJson.name);
    }
  }
};

// cron-job every 5 minutes
//cron.schedule('*/2 * * * *', () => {
findAllNames();
//});
