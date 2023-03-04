export const network = 'testnet';
// || mainnet || mocknet

export const contractAddress = {
  mainnet: ``,
  testnet: `ST1HW9QWHEQ7PZYQGGKJ8FRWBF6VAG7V885WYH3TQ`,
  mocknet: ``,
};

export const apiBNS = (userAddress) => {
  return `https://api.bns.xyz/bns/addresses/stacks/${userAddress}`;
};

export const contractName = `bitcoin-degens-test-price-4`;

export const assetIdentifierBitcoinDegens = (network) =>
  `asset_identifiers=${contractAddress[network]}.bitcoin-degens-test-price-4::bitcoin-degen`;

export const baseImgUrl = `https://stacksdegens.com/bitcoin-degens/images/`;

export const apiMapping = {
  mainnet: (userAddress) => ({
    nftsOwned: `https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${userAddress}&&`,
    readOnly: (contractAddress, contractName, functionName) =>
      `https://stacks-node-api.mainnet.stacks.co/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
  }),
  testnet: (userAddress) => ({
    nftsOwned: `https://stacks-node-api.testnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${userAddress}&&`,
    readOnly: (contractAddress, contractName, functionName) =>
      `https://stacks-node-api.testnet.stacks.co/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
  }),
  mocknet: (userAddress) => ({
    nftsOwned: ``,
    readOnly: '',
  }),
};
