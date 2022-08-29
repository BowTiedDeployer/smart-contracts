export const metadataOldDegensSrc = {
  miami: (degenId) =>
    `https://stxnft.mypinata.cloud/ipfs/QmQcZyB1GEsZgYQXr82CHN2BeqEY53bmMPB89g6ryKPWJU/${degenId}.json`,
  nyc: (degenId) => `https://stxnft.mypinata.cloud/ipfs/QmayEqWwWc87a5ig4ujkRdcyTe6uw2cXEJz177iMHQY4SP/${degenId}.json`,
};

export const network = 'mocknet'; //"testnet", "mainnet";

const coreApiUrl = {
  mainnet: 'https://stacks-node-api.mainnet.stacks.co',
  testnet: 'https://stacks-node-api.testnet.stacks.co',
  mocknet: 'http://localhost:3999',
};

export const urlApis = {
  readOnly: (network, contractAddress, contractName, functionName) =>
    `${coreApiUrl[network]}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
  transaction: (network, txId) => `${coreApiUrl[network]}/extended/v1/tx/${txId}`,
  feeCalc: (network) => `${coreApiUrl[network]}/v2/fees/transaction`,
  accountNonce: (network, address) => `${coreApiUrl[network]}/extended/v1/address/${address}/nonces?unanchored=true`,
  accountDetails: (network, address) => `${coreApiUrl[network]}/v2/accounts/${address}`,
};

export const contracts = {
  mainnet: {},
  network: {},
  mocknet: {
    backgrounds: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.backgrounds',
    cars: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.cars',
    heads: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.heads',
    rims: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rims',
    degens: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.degens',
    customizable: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract',
    miami:'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.miami-degens',
    nyc:'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nyc-degens'
  },
};

export const wallets = {
  admin: {
    mainnet: {},
    network: {},
    mocknet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  },
  user: {
    mainnet: {},
    network: {},
    mocknet: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
  },
};
