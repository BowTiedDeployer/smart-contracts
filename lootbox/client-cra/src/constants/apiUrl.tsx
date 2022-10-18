import { Network } from './network';

export const coreApiUrl = {
  mainnet: `https://boldest-responsive-snow.stacks-mainnet.discover.quiknode.pro/24b4ec434a998836866ea4fc4a980e7856dae35e`,
  testnet: `https://ancient-dawn-shadow.stacks-testnet.discover.quiknode.pro/207b1d96de37979493f2e1a9148caa69705473fd`,
  mocknet: `http://localhost:3999`,
};
export const coreExplorerUrl = {
  mainnet: `https://explorer.stacks.co`,
  testnet: `https://explorer.stacks.co`,
  mocknet: `localhost:8000`,
};
export const apiMapping = {
  balance: (network: Network, address: string) => `${coreApiUrl[network]}/extended/v1/address/${address}/balances`,
  nftsOwned: (network: Network, address: string) =>
    `${coreApiUrl[network]}/extended/v1/tokens/nft/holdings?principal=${address}&&`,
  holdings: (network: Network, address: string, assetIdentifiers: string, offset: number) =>
    `${coreApiUrl[network]}/extended/v1/tokens/nft/holdings?principal=${address}&&asset_identifiers=${assetIdentifiers}&&offset=${offset}`,
  readOnly: (network: Network, contractAddress: string, contractName: string, functionName: string) =>
    `${coreApiUrl[network]}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
  explorerTxId: (network: Network, txId: string) => `${coreExplorerUrl[network]}/txid/${txId}?chain=${network}`,
  apiTxId: (network: Network, txId: string) => `${coreApiUrl[network]}/extended/v1/tx/${txId}`,
};
