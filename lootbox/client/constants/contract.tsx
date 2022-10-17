// a contract for mainnet, testnet, mocknet

import { network } from './network..tsx';
import wallets from './constant-wallets.tsx';

// type ContractMapping = Record<
//   Network,
//   { [key: string]: { contract: string; owner: string; createLobby: string; joinLobby: string; urlLNSwap: string } }
// >;
//type ContractMapping = Record<Network, { [key: string]: { [key: string]: string } }>;

export const contractMapping = {
  mainnet: {
    trustless: {
      contract: 'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.trustless-rewards',
      owner: 'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ', // not used
      createLobby: 'create-lobby',
      joinLobby: 'join',
      urlLNSwap: 'https://widget.lnswap.org/widget.js',
    },
    customizable: {
      contract: '',
      owner: '',
      disassemble: '',
      swap: '',
      assemble: '',
      merge: 'add-merge-work-in-queue',
    },
  },
  testnet: {
    trustless: {
      contract: 'ST38F25DF7V9VN1TP2Y9QP7A1KB4AF7PK8CHV4QF7.trustless-rewards', // profile Tester Contract Deployer
      owner: 'ST15TYKNAVZ99YB12Y0Q7XYA9QRWE36N29NNPE5DY',
      createLobby: 'create-lobby',
      joinLobby: 'join',
      urlLNSwap: 'https://stacksdegens.com/widget.js',
    },
    customizable: {
      contract: '',
      owner: '',
      disassemble: '',
      swap: '',
      assemble: '',
      merge: 'add-merge-work-in-queue',
    },
  },
  mocknet: {
    trustless: {
      contract: wallets.depoyer.wallet + '.trustless-rewards',
      owner: wallets.depoyer.wallet,
      createLobby: 'create-lobby',
      joinLobby: 'join',
      urlLNSwap: '',
    },
    customizable: {
      contract: wallets.depoyer.wallet + '.customizable-nfts',
      owner: wallets.depoyer.wallet,
      disassemble: 'add-disassemble-work-in-queue',
      swap: 'add-swap-work-in-queue',
      assemble: 'add-assemble-work-in-queue',
      merge: 'add-merge-work-in-queue',
    },
  },
};

// type ContractsNFT = Record<
//   Network,
//   {
//     background_item: string,
//     lootbox_background: string,
//   }
// >;

export const contractsNFT = {
  mainnet: {
    background_item: '',
    lootbox_background: '',
  },
  testnet: {
    background_item: 'ST15DF8K1Z4XQ952AC2GFY106XRTNJSWE9SP6VZYA.background-item::background',
    lootbox_background: 'ST15DF8K1Z4XQ952AC2GFY106XRTNJSWE9SP6VZYA.lootbox-background::lootbox-background',
  },
  mocknet: {
    background_item: '',
    lootbox_background: '',
  },
};
