import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { nodeUrl, network } from './consts.js';
import { callSCFunction, callSCFunctionWallet } from './helper_sc.js';

let networkN =
  network === 'mainnet'
    ? new StacksMainnet({ url: nodeUrl[network] })
    : network === 'testnet'
    ? new StacksTestnet({ url: nodeUrl[network] })
    : new StacksMocknet();

// from mnemonic get private key for second account
// call open-lootbox in testnet

const openLootbox = async (id, walletAddress, nonce) => {
  console.log('id', id);
  console.log('walletAddress', walletAddress);
  await callSCFunctionWallet(
    networkN,
    'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    'lootbox-background',
    'open-lootbox',
    [id],
    walletAddress,
    nonce
  );
};

const createLootbox = async (walletAddress, nonce) => {
  console.log('walletAddress', walletAddress);
  await callSCFunction(
    networkN,
    'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    'lootbox-background',
    'create-lootbox',
    [walletAddress],
    nonce
  );
};

// openLootbox(2, 'deployer_wallet_second', 1);
if (network != 'mocknet') {
  console.log('Select Network Testnet');
} else await createLootbox('ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5', 4);
