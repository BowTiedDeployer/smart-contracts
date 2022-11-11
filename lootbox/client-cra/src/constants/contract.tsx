import { Network } from './network';

export type ContractName = 'background_item' | 'lootbox_background';

export const contractsNFT: Record<Network, Record<ContractName, string>> = {
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
