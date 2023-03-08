export const network = 'mainnet';
// || mainnet || mocknet

export const contractAddress = {
  mainnet: `SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ`,
  testnet: `ST1HW9QWHEQ7PZYQGGKJ8FRWBF6VAG7V885WYH3TQ`,
  mocknet: ``,
};

export const apiBNS = (userAddress) => {
  return `https://api.bns.xyz/bns/addresses/stacks/${userAddress}`;
};

export const contractName = `bitcoin-degens`;

export const assetIdentifierBitcoinDegens = (network) =>
  `asset_identifiers=${contractAddress[network]}.bitcoin-degens::bitcoin-degen`;

export const baseImgUrl = `https://stacksdegens.com/bitcoin-degens/images/`;

export const apiMapping = {
  mainnet: {
    readOnly: (contractAddress, contractName, functionName) =>
      `https://stacks-node-api.mainnet.stacks.co/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
  },
  testnet: {
    readOnly: (contractAddress, contractName, functionName) =>
      `https://stacks-node-api.testnet.stacks.co/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
  },
  mocknet: {
    readOnly: '',
  },
};

export const explorerMapping = {
  mainnet: (txId) => `https://explorer.stacks.co/txid/${txId}?chain=mainnet`,
  testnet: (txId) => `https://explorer.stacks.co/txid/${txId}?chain=testnet`,
  mocknet: (txId) => `not used right now`,
};
