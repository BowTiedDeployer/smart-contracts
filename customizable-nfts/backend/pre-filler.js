import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import { callSCFunctionWithNonce, callSCFunctionWithNonceUser, readOnlySCJsonResponse } from './helper-sc.js';

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

export const disassembleToQueue = async () => {
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

await mintBackground();
await new Promise((r) => setTimeout(r, 2000));
await mintBackground();
await new Promise((r) => setTimeout(r, 2000));
await mintDegen();

await new Promise((r) => setTimeout(r, 2000));

callSCFunctionWithNonceUser(
  networkN,
  contracts[network].customizable.split('.')[0],
  contracts[network].customizable.split('.')[1],
  'add-disassemble-work-in-queue',
  [2]
);

// for merge
// callSCFunctionWithNone( mint miami / nyc )
// callSCFunctionWithNonceUser( add-merge-work-in-queue )
