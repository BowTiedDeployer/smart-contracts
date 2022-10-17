// import { contractsNFT } from './contract.js';
//import { Network } from './network';

import { network } from './network';

// type ApiMapping = Record<
//   Network,
//   (accountAddress) => {
//     balance;
//     nftsOwned;
//     readonly;
//   }
// >;
//type INetwork = `mainnet` | `testnet` | `mocknet`;
//export type ApiType = 'balance' | 'nftsOwned';
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
export const apiMapping /*: ApiMapping*/ = {
  balance: (network, address) => `${coreApiUrl[network]}/extended/v1/address/${address}/balances`,
  nftsOwned: (network, address) => `${coreApiUrl[network]}/extended/v1/tokens/nft/holdings?principal=${address}&&`,
  holdings: (network, address, assetIdentifiers, offset) =>
    `${coreApiUrl[network]}/extended/v1/tokens/nft/holdings?principal=${address}&&asset_identifiers=${assetIdentifiers}&&offset=${offset}`,
  readOnly: (network, contractAddress, contractName, functionName) =>
    `${coreApiUrl[network]}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
  explorerTxId: (network, txId) => `${coreExplorerUrl[network]}/txid/${txId}?chain=${network}`,
  apiTxId: (network, txId) => `${coreApiUrl[network]}/extended/v1/tx/${txId}`,
};
