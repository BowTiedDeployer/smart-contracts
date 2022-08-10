import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network } from './consts.js';
import { callSCFunctionWithNonce } from './helper.js';

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

// mint 2 degens
await callSCFunctionWithNonce(
  networkN,
  contracts[network].degens.split('.')[0],
  contracts[network].degens.split('.')[1],
  'mint-uri',
  [
    'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    'https://stxnft.mypinata.cloud/ipfs/QmbX7UCSFLBvJa2yB4YxqZxhacrxiKUGbE6fHbQuYMhNhf',
  ]
);
await callSCFunctionWithNonce(
  networkN,
  contracts[network].degens.split('.')[0],
  contracts[network].degens.split('.')[1],
  'mint-uri',
  [
    'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    'https://stxnft.mypinata.cloud/ipfs/QmbX7UCSFLBvJa2yB4YxqZxhacrxiKUGbE6fHbQuYMhNhf',
  ]
);

// call add-work-disassemble
callSCFunctionWithNonce(
  networkN,
  contracts[network].customizable.split('.')[0],
  contracts[network].customizable.split('.')[1],
  'a' //todo: complete here
);
