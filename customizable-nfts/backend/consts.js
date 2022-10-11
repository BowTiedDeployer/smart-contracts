export const metadataOldDegensSrc = {
  miami: (degenId) =>
    `https://stxnft.mypinata.cloud/ipfs/QmQcZyB1GEsZgYQXr82CHN2BeqEY53bmMPB89g6ryKPWJU/${degenId}.json`,
  nyc: (degenId) => `https://stxnft.mypinata.cloud/ipfs/QmayEqWwWc87a5ig4ujkRdcyTe6uw2cXEJz177iMHQY4SP/${degenId}.json`,
};

export const network = 'mocknet'; //"testnet", "mainnet", "mocknet";

const coreApiUrl = {
  mainnet: 'https://stacks-node-api.mainnet.stacks.co',
  testnet: 'https://stacks-node-api.testnet.stacks.co',
  mocknet: 'http://localhost:3999',
};

export const nodeUrl = {
  mainnet: 'https://api.gamma.io',
  testnet: 'https://ancient-dawn-shadow.stacks-testnet.discover.quiknode.pro/207b1d96de37979493f2e1a9148caa69705473fd',
};

export const urlApis = {
  readOnly: (network, contractAddress, contractName, functionName) =>
    `${coreApiUrl[network]}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
  transaction: (network, txId) => `${coreApiUrl[network]}/extended/v1/tx/${txId}`,
  feeCalc: (network) => `${coreApiUrl[network]}/v2/fees/transaction`,
  accountNonce: (network, address) => `${coreApiUrl[network]}/extended/v1/address/${address}/nonces?unanchored=true`,
  accountDetails: (network, address) => `${coreApiUrl[network]}/v2/accounts/${address}`,
  accountMempool: (network, address) => `${coreApiUrl[network]}/extended/v1/address/${address}/mempool`,
  lastBlock: (network) => `${coreApiUrl[network]}/extended/v1/block?limit=1`,
};

export const contracts = {
  mainnet: {},
  testnet: {
    backgrounds: 'ST2FSGYVG0T3Z7XSSTNVY89D80V31PVFEMPZBK6N2.backgrounds',
    cars: 'ST2FSGYVG0T3Z7XSSTNVY89D80V31PVFEMPZBK6N2.cars',
    heads: 'ST2FSGYVG0T3Z7XSSTNVY89D80V31PVFEMPZBK6N2.heads',
    rims: 'ST2FSGYVG0T3Z7XSSTNVY89D80V31PVFEMPZBK6N2.rims',
    degens: 'ST2FSGYVG0T3Z7XSSTNVY89D80V31PVFEMPZBK6N2.stacks-degens',
    customizable: 'ST2FSGYVG0T3Z7XSSTNVY89D80V31PVFEMPZBK6N2.customizable-nfts',
    miami: 'ST2FSGYVG0T3Z7XSSTNVY89D80V31PVFEMPZBK6N2.miami-degens',
    nyc: 'ST2FSGYVG0T3Z7XSSTNVY89D80V31PVFEMPZBK6N2.nyc-degens',
  },
  mocknet: {
    backgrounds: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.backgrounds',
    cars: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.cars',
    heads: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.heads',
    rims: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rims',
    degens: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacks-degens',
    customizable: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.customizable-nfts',
    miami: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.miami-degens',
    nyc: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nyc-degens',
  },
};

export const wallets = {
  admin: {
    name: 'admin',
    mainnet: {},
    testnet: 'ST2FSGYVG0T3Z7XSSTNVY89D80V31PVFEMPZBK6N2',
    mocknet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  },
  user: {
    name: 'user',
    mainnet: {},
    testnet: 'ST3M4VFJQFEJDKY2CG9HKMPJJGKVWC9TSX73C040M',
    mocknet: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
  },
  wallet2: {
    name: 'wallet2',
    mainnet: {},
    testnet: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    mocknet: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
  },
  wallet3: {
    name: 'wallet3',
    mainnet: {},
    testnet: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC',
    mocknet: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC',
  },
  wallet4: {
    name: 'wallet4',
    mainnet: {},
    testnet: 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND',
    mocknet: 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND',
  },
  wallet5: {
    name: 'wallet5',
    mainnet: {},
    testnet: 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB',
    mocknet: 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB',
  },
  wallet6: {
    name: 'wallet6',
    mainnet: {},
    testnet: 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0',
    mocknet: 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0',
  },
  wallet7: {
    name: 'wallet7',
    mainnet: {},
    testnet: 'ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ',
    mocknet: 'ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ',
  },
  wallet8: {
    name: 'wallet8',
    mainnet: {},
    testnet: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP',
    mocknet: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP',
  },
  wallet9: {
    name: 'wallet9',
    mainnet: {},
    testnet: 'ST268BPGYGM8R960QC735ERJ5QCP5C31W106XXJKA',
    mocknet: 'ST268BPGYGM8R960QC735ERJ5QCP5C31W106XXJKA',
  },
  wallet10: {
    name: 'wallet10',
    mainnet: {},
    testnet: 'ST3YJFJ3Y3XS28J7PD8CBD9CWCMHHGEXXVKNBJAT1',
    mocknet: 'ST3YJFJ3Y3XS28J7PD8CBD9CWCMHHGEXXVKNBJAT1',
  },
  wallet11: {
    name: 'wallet11',
    mainnet: {},
    testnet: 'ST3MT8Q0E61GSB3HJ0GQ510VPHMMNGGKPZKJMB9PK',
    mocknet: 'ST3MT8Q0E61GSB3HJ0GQ510VPHMMNGGKPZKJMB9PK',
  },
  wallet12: {
    name: 'wallet12',
    mainnet: {},
    testnet: 'ST3XRFYD6A2A9T8QWT9NFXHP8XFCDEQ30EFZC8CMF',
    mocknet: 'ST3XRFYD6A2A9T8QWT9NFXHP8XFCDEQ30EFZC8CMF',
  },
  wallet13: {
    name: 'wallet13',
    mainnet: {},
    testnet: 'STRRXZWHE3WC9WF11WJX3XFDB19BNCRYSJH9EP5',
    mocknet: 'STRRXZWHE3WC9WF11WJX3XFDB19BNCRYSJH9EP5',
  },
  wallet14: {
    name: 'wallet14',
    mainnet: {},
    testnet: 'ST273Z5AWCAB0P11WP2QRNMR705QYP3VQ4T1JDAZP',
    mocknet: 'ST273Z5AWCAB0P11WP2QRNMR705QYP3VQ4T1JDAZP',
  },
  wallet15: {
    name: 'wallet15',
    mainnet: {},
    testnet: 'ST2D1SPJ6HZ2BKKH55Z8DQDMQ409KG6H3FVVFZNMX',
    mocknet: 'ST2D1SPJ6HZ2BKKH55Z8DQDMQ409KG6H3FVVFZNMX',
  },
  wallet16: {
    name: 'wallet16',
    mainnet: {},
    testnet: 'STZHX0QH4P4ARZCC1P8AVD8KXYH0QNE7SZNE5WAP',
    mocknet: 'STZHX0QH4P4ARZCC1P8AVD8KXYH0QNE7SZNE5WAP',
  },
  wallet17: {
    name: 'wallet17',
    mainnet: {},
    testnet: 'ST3S2ZW2CHKJPGMJN4WMAT9DH30YA2RYMPCV6KAJD',
    mocknet: 'ST3S2ZW2CHKJPGMJN4WMAT9DH30YA2RYMPCV6KAJD',
  },
  wallet18: {
    name: 'wallet18',
    mainnet: {},
    testnet: 'ST3RJKHMQ134F8XVR3X3538ATS18J1RB0C96D7FG3',
    mocknet: 'ST3RJKHMQ134F8XVR3X3538ATS18J1RB0C96D7FG3',
  },
  wallet19: {
    name: 'wallet19',
    mainnet: {},
    testnet: 'ST4JJ20RC02MESCW46CDJCQ3HBPP6D9XW0YEKADF',
    mocknet: 'ST4JJ20RC02MESCW46CDJCQ3HBPP6D9XW0YEKADF',
  },
  wallet20: {
    name: 'wallet20',
    mainnet: {},
    testnet: 'ST2RNBTWA0SX7SRRG6SFJKC2EC5NHYF80MS5JB4MG',
    mocknet: 'ST2RNBTWA0SX7SRRG6SFJKC2EC5NHYF80MS5JB4MG',
  },
  wallet21: {
    name: 'wallet21',
    mainnet: {},
    testnet: 'ST3X70HXKKCYDH9DAKJMC6WCDDYB25BVRDZ5MZGFH',
    mocknet: 'ST3X70HXKKCYDH9DAKJMC6WCDDYB25BVRDZ5MZGFH',
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
