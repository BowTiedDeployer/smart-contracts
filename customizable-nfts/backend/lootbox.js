import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { nodeUrl, network } from './consts.js';
import { callSCFunctionWallet } from './helper_sc.js';

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
    'ST1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDEBN8YF5',
    'lootbox-background',
    'open-lootbox',
    [id],
    walletAddress,
    nonce
  );
};

// openLootbox(2, 'deployer_wallet_second', 1);
if (network != 'testnet') {
  console.log('Select Network Testnet');
} else await openLootbox(1, 'deployer_wallet_second', 81);
