const { StacksMainnet, StacksMocknet, StacksTestnet } = require('@stacks/network');
const {
  network,
  contractBitcoinDegens,
  coreApiUrl,
  readOnlySCJsonResponse,
  jsonContentCreate,
  convertUintListToHex,
  convertIntListForBlockchainCall,
} = require('./consts.js');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const cron = require('node-cron');
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
  for (let j = 0; j < 40; j++) {
    // how many batch get name calls are done
    idList = [];
    for (let i = 1; i <= 25; i++) {
      // how many ids are in a batch call
      idList.push(j * 25 + i);
    }
    console.log(idList);
    blockchainDegenNameMapRaw = await getNFTNameListBitcoinDegens(idList);
    console.log(await blockchainDegenNameMapRaw);
    let mapId = 0;
    idList.forEach((i) => {
      console.log('i', i);
      blockchainDegenNameMap[i] = blockchainDegenNameMapRaw.value[mapId].value.value;
      mapId++;
    });

    for (let i = 1; i <= 25; i++) {
      let curr_id = j * 25 + i;
      // read json
      let degenJson = JSON.parse(fs.readFileSync(`../files_stored/jsons/${curr_id}.json`));
      if (degenJson.name != blockchainDegenNameMap[curr_id]) {
        // replace json.name = getNFTNameBitcoinDegens
        degenJson.name = blockchainDegenNameMap[curr_id];
        const jsonContent = jsonContentCreate(degenJson);
        // reWrite json
        fs.writeFileSync(`../files_stored/jsons/${curr_id}.json`, jsonContent);

        // keep a log with the updates jsons
        appendToCsv(i + j * 25, degenJson.name);
      }
    }
  }
  console.log(blockchainDegenNameMap);
};

// cron-job every 5 minutes
//cron.schedule('*/2 * * * *', () => {
findAllNames();
//});
