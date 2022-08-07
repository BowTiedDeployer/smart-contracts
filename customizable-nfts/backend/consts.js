export const metadataOldDegensSrc = {
  miami: (degenId) =>
    `https://stxnft.mypinata.cloud/ipfs/QmQcZyB1GEsZgYQXr82CHN2BeqEY53bmMPB89g6ryKPWJU/${degenId}.json`,
  nyc: (degenId) => `https://stxnft.mypinata.cloud/ipfs/QmayEqWwWc87a5ig4ujkRdcyTe6uw2cXEJz177iMHQY4SP/${degenId}.json`,
};

export const network = 'mainnet'; //"testnet", "mainnet";

export const coreApiUrl = {
  mainnet: 'https://stacks-node-api.mainnet.stacks.co/',
  testnet: 'https://stacks-node-api.testnet.stacks.co/',
  mocknet: 'http://localhost:3999/',
};

export const urlApis = {
  readOnly: (contractAddress, contractName, functionName) =>
    `v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
};

export const contracts = {
  mainnet: {},
  network: {},
  mocknet: {},
};

const components = {
  background: {
    LostOrange: 'dsadsa',
    PurpleS: 'das',
  },
};

// console.log(components.background.LostOrange);
