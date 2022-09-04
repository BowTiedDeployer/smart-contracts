import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import {
  callSCFunctionWithNonce,
  callSCFunctionWithNonceUser,
  checkNonceUpdate,
  getAccountNonce,
  readOnlySCJsonResponse,
  sleep,
} from './helper_sc.js';

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

// // mint 2 degens
export const mintDegen = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'mint-uri',
    [wallets.user[network], 'ipfs://bafkreid6tlh7unqztsbizijke3fu25aap2xg3ox5twzvndxaod2e5xon2m']
  );
};

const notWorkingMintNDegens = async (n) => {
  let i = 0;
  let availableNonce = await getAccountNonce(wallets.admin[network]);
  let lastUsedNonce = availableNonce - 1;
  while (i < n) {
    const response = await checkNonceUpdate(1, availableNonce, lastUsedNonce);
    availableNonce = response.availableNonce;
    lastUsedNonce = response.lastUsedNonce;
    console.log('availableNonce, lastUsedNonce', availableNonce, lastUsedNonce);
    await mintDegen();
    i++;
    console.log('------------------------', i);
  }
};

export const addDisassembleToQueue = async (degenId) => {
  // call add-work-disassemble
  // manual value
  await callSCFunctionWithNonceUser(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-disassemble-work-in-queue',
    [degenId]
  );
};

// for components
export const mintBackground = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].backgrounds.split('.')[0],
    contracts[network].backgrounds.split('.')[1],
    'mint-name',
    [wallets.user[network], 'Sunset']
  );
};

export const mintCar = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].cars.split('.')[0],
    contracts[network].cars.split('.')[1],
    'mint-name',
    [wallets.user[network], 'BentleyGrey']
  );
};

export const mintHead = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].heads.split('.')[0],
    contracts[network].heads.split('.')[1],
    'mint-name',
    [wallets.user[network], 'Miami_Party_Sunglasses']
  );
};

export const mintRims = async () => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].rims.split('.')[0],
    contracts[network].rims.split('.')[1],
    'mint-name',
    [wallets.user[network], 'SportyPearlescent']
  );
};

//(background-id uint) (car-id uint) (rim-id uint) (head-id uint))
export const addAssembleToQueue = async (backgroundId, carId, rimId, headId) => {
  // call add-work-assemble
  await callSCFunctionWithNonceUser(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-assemble-work-in-queue',
    [backgroundId, carId, rimId, headId]
  );
};

// await mintBackground();
// await new Promise((r) => setTimeout(r, 2000));
// await mintCar();
// await new Promise((r) => setTimeout(r, 2000));
// await mintHead();
// await new Promise((r) => setTimeout(r, 2000));
// await mintRims();
// await new Promise((r) => setTimeout(r, 2000));

// await addAssembleToQueue();

// await mintDegen();
// await new Promise((r) => setTimeout(r, 2000));

// await addDisassembleToQueue();
