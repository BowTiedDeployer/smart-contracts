import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { network, wallets } from './consts.js';
import { sleep, getAccountNonce } from './helper_sc.js';
import {
  addAssembleToQueue,
  addDisassembleToQueue,
  mintBackground,
  mintCar,
  mintDegen,
  mintHead,
  mintRims,
} from './pre-filler.js';

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

export const mintNDegens = async (n) => {
  let availableNonce = await getAccountNonce(wallets.admin[network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.admin[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = 0; i < n; i++) {
    await checkNonceUpdate();
    await mintDegen();
  }
};

export const mintComponentSet = async () => {
  let availableNonce = await getAccountNonce(wallets.admin[network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.admin[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  await checkNonceUpdate();
  await mintBackground();
  await checkNonceUpdate();
  await mintCar();
  await checkNonceUpdate();
  await mintRims();
  await checkNonceUpdate();
  await mintHead();
};

export const mintNComponentSets = async (n) => {
  let availableNonce = await getAccountNonce(wallets.admin[network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.admin[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = 0; i < n; i++) {
    await checkNonceUpdate();
    await mintComponentSet();
  }
};

// assemble n component sets starting from component-id start to component-id start+n-1
export const addNAssembleToQueue = async (start, n) => {
  let availableNonce = await getAccountNonce(wallets.user[network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.user[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = start; i < start + n; i++) {
    await checkNonceUpdate();
    await addAssembleToQueue(i, i, i, i);
  }
};

// disassemble n degens starting from degen-id start to degen-id start+n-1
export const addNDisassembleToQueue = async (start, n) => {
  let availableNonce = await getAccountNonce(wallets.user[network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.user[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = start; i < start + n; i++) {
    await checkNonceUpdate();
    await addDisassembleToQueue(i);
  }
};

// has to be less than 25 transactions by same account into a block

// await mintNComponentSets(4);
await addNAssembleToQueue(1, 5);

// there is a limit of 5 disassembles from same user
// await mintNDegens(5);
// await addNDisassembleToQueue(21, 5);
