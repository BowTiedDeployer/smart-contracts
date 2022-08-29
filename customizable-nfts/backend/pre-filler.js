import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import { callSCFunctionWithNonce, callSCFunctionWithNonceUser, readOnlySCJsonResponse } from './helper_sc.js';

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

// // mint 2 degens
export const mintDegen = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'mint-uri',
    [wallets.user.mocknet, 'https://stxnft.mypinata.cloud/ipfs/QmbX7UCSFLBvJa2yB4YxqZxhacrxiKUGbE6fHbQuYMhNhf']
  );
};

export const addDisassembleToQueue = async () => {
  // call add-work-disassemble
  // manual value
  await callSCFunctionWithNonceUser(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-disassemble-work-in-queue',
    [1]
  );
};

// for components
export const mintBackground = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].backgrounds.split('.')[0],
    contracts[network].backgrounds.split('.')[1],
    'mint-name',
    [wallets.user.mocknet, 'DarkPurple']
  );
};

export const mintCar = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].cars.split('.')[0],
    contracts[network].cars.split('.')[1],
    'mint-name',
    [wallets.user.mocknet, 'BentleyBlack']
  );
};

export const mintHead = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].heads.split('.')[0],
    contracts[network].heads.split('.')[1],
    'mint-name',
    [wallets.user.mocknet, 'Miami_Sword_Sunglasses']
  );
};

export const mintRims = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].rims.split('.')[0],
    contracts[network].rims.split('.')[1],
    'mint-name',
    [wallets.user.mocknet, 'ClassyDark']
  );
};

// callSCFunctionWithNonceUser(
//   networkN,
//   contracts[network].customizable.split('.')[0],
//   contracts[network].customizable.split('.')[1],
//   'add-disassemble-work-in-queue',
//   [1]
// );

const addAssembleToQueue = async () => {
  // call add-work-assemble
  // manual value
  await callSCFunctionWithNonceUser(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-assemble-work-in-queue',
    [1, 1, 1, 1]
  );
};

await mintBackground();
await new Promise((r) => setTimeout(r, 2000));
await mintCar();
await new Promise((r) => setTimeout(r, 2000));
await mintHead();
await new Promise((r) => setTimeout(r, 2000));
await mintRims();
await new Promise((r) => setTimeout(r, 2000));

await addAssembleToQueue();
