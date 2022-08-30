import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import { callSCFunctionWithNonce, callSCFunctionWithNonceUser, readOnlySCJsonResponse } from './helper_sc.js';

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

export const mintMiami = async () => {
  await callSCFunctionWithNonceUser(
    networkN,
    contracts[network].miami.split('.')[0], //degens-->miami
    contracts[network].miami.split('.')[1],
    'claim',
    []
  );
};

export const mintNYC = async () => {
  await callSCFunctionWithNonceUser(
    networkN,
    contracts[network].nyc.split('.')[0], //degens-->nyc
    contracts[network].nyc.split('.')[1],
    'claim',
    []
  );
};

export const mergeToQueue = async (id, type) => {
  // call add-work-disassemble
  // manual value
  await callSCFunctionWithNonceUser(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-merge-work-in-queue',
    [id, type]
  );
};

await mintNYC();
await new Promise((r) => setTimeout(r, 2000));
await mintMiami();
await new Promise((r) => setTimeout(r, 2000));
await mergeToQueue(1, 'nyc');
await new Promise((r) => setTimeout(r, 2000));
await mergeToQueue(1, 'miami');
