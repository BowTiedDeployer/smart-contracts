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
  testnet: {},
  mocknet: {
    backgrounds: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.backgrounds',
    cars: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.cars',
    heads: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.heads',
    rims: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rims',
    degens: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.degens',
    customizable: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract',
    miami: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.miami-degens',
    nyc: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nyc-degens',
  },
};

export const wallets = {
  admin: {
    mainnet: {},
    testnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    mocknet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  },
  user: {
    mainnet: {},
    testnet: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    mocknet: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
  },
  wallet2: {
    mainnet: {},
    testnet: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    mocknet: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
  },
  wallet3: {
    mainnet: {},
    testnet: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC',
    mocknet: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC',
  },
  wallet4: {
    mainnet: {},
    testnet: 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND',
    mocknet: 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND',
  },
  wallet5: {
    mainnet: {},
    testnet: 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB',
    mocknet: 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB',
  },
  wallet6: {
    mainnet: {},
    testnet: 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0',
    mocknet: 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0',
  },
};

export const operationType = {
  merge: 'merge',
  assemble: 'assemble',
  disassemble: 'disassemble',
  swap: 'swap',
};

export const componentType = {
  background: {
    contract: contracts[network].backgrounds,
    type: 'background',
  },
  car: {
    contract: contracts[network].cars,
    type: 'car',
  },
  head: {
    contract: contracts[network].heads,
    type: 'head',
  },
  rims: {
    contract: contracts[network].rims,
    type: 'rims',
  },
};
