import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import {
  callSCFunctionWithNonce,
  callSCFunctionWithNonceUser,
  checkNonceUpdate,
  getAccountNonce,
  sleep,
} from './helper_sc.js';

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

export const mintDegen = async (url) => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'mint-uri',
    [wallets.user[network], url]
  );
};

// for components
export const mintBackground = async (name) => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].backgrounds.split('.')[0],
    contracts[network].backgrounds.split('.')[1],
    'mint-name',
    [wallets.user[network], name]
  );
};

export const mintCar = async (name) => {
  console.log('car', name);
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].cars.split('.')[0],
    contracts[network].cars.split('.')[1],
    'mint-name',
    [wallets.user[network], name]
  );
};

export const mintHead = async (name) => {
  console.log('head', name);
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].heads.split('.')[0],
    contracts[network].heads.split('.')[1],
    'mint-name',
    [wallets.user[network], name]
  );
};

export const mintRims = async (name) => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].rims.split('.')[0],
    contracts[network].rims.split('.')[1],
    'mint-name',
    [wallets.user[network], name]
  );
};

//for queues
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

// (background-id uint) (car-id uint) (rim-id uint) (head-id uint))
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

// (degen-id uint) (component-id uint) (component-type (string-ascii 30)
export const addSwapToQueue = async (degenId, componentId, componentType) => {
  // call add-work-assemble
  await callSCFunctionWithNonceUser(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-swap-work-in-queue',
    [degenId, componentId, componentType]
  );
};

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

  const degenUrl = 'ipfs://bafkreid6tlh7unqztsbizijke3fu25aap2xg3ox5twzvndxaod2e5xon2m';
  for (let i = 0; i < n; i++) {
    await checkNonceUpdate();
    await mintDegen(degenUrl);
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

  const backgroundName = 'Sunset';
  const carName = 'BentleyGrey';
  const rimsName = 'SportyPearlescent';
  const headName = 'Miami_Party_Sunglasses';

  await checkNonceUpdate();
  await mintBackground(backgroundName);
  await checkNonceUpdate();
  await mintCar(carName);
  await checkNonceUpdate();
  await mintRims(rimsName);
  await checkNonceUpdate();
  await mintHead(headName);
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
// there is a limit of 5 disassembles from same user

// await mintNDegens(1);
// await addNDisassembleToQueue(2, 0);

// await mintComponentSet();
// await mintNComponentSets(2);
// await addNAssembleToQueue(1, 1);

// await mintComponentSet();

// await mintDegen('ipfs://bafkreidezqputo6mzxgiqivj52vctrugiflckkwfoyj6cdjhiege2s7jma');
// await mintCar('LamboBlue');
await mintRims('ClassyDark');
// await mintComponentSet();
// await addSwapToQueue(1, 2, 'car-type');
