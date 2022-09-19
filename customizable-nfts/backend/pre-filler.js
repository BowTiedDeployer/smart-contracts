import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import {
  callSCFunctionWithNonce,
  callSCFunctionWithNonceWallet,
  checkNonceUpdate,
  getAccountNonce,
  sleep,
} from './helper_sc.js';

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

export const mintDegen = async (url, walletAddress) => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'mint-uri',
    [wallets[walletAddress][network], url]
  );
};

export const mintMiami = async (walletAddress) => {
  await callSCFunctionWithNonceWallet(
    networkN,
    contracts[network].miami.split('.')[0],
    contracts[network].miami.split('.')[1],
    'claim',
    [],
    walletAddress
  );
};

export const mintNYC = async (walletAddress) => {
  await callSCFunctionWithNonceWallet(
    networkN,
    contracts[network].nyc.split('.')[0],
    contracts[network].nyc.split('.')[1],
    'claim',
    [],
    walletAddress
  );
};

// for components
export const mintBackground = async (name, walletAddress) => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].backgrounds.split('.')[0],
    contracts[network].backgrounds.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name]
  );
};

export const mintCar = async (name, walletAddress) => {
  console.log('car', name);
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].cars.split('.')[0],
    contracts[network].cars.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name]
  );
};

export const mintHead = async (name, walletAddress) => {
  console.log('head', name);
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].heads.split('.')[0],
    contracts[network].heads.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name]
  );
};

export const mintRims = async (name, walletAddress) => {
  await callSCFunctionWithNonce(
    networkN,
    contracts[network].rims.split('.')[0],
    contracts[network].rims.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name]
  );
};

//for queues
export const addDisassembleToQueue = async (degenId, walletAddress) => {
  // call add-work-disassemble
  // manual value
  await callSCFunctionWithNonceWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-disassemble-work-in-queue',
    [degenId],
    walletAddress
  );
};

// (background-id uint) (car-id uint) (rim-id uint) (head-id uint))
export const addAssembleToQueue = async (backgroundId, carId, rimId, headId, walletAddress) => {
  // call add-work-assemble
  await callSCFunctionWithNonceWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-assemble-work-in-queue',
    [backgroundId, carId, rimId, headId],
    walletAddress
  );
};

// (degen-id uint) (component-id uint) (component-type (string-ascii 30)
export const addSwapToQueue = async (degenId, componentId, componentType, walletAddress) => {
  // call add-work-assemble
  await callSCFunctionWithNonceWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-swap-work-in-queue',
    [degenId, componentId, componentType],
    walletAddress
  );
};

export const addMergeToQueue = async (id, type, walletAddress) => {
  // call add-work-merge
  // manual value
  await callSCFunctionWithNonceWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-merge-work-in-queue',
    [id, type],
    walletAddress
  );
};

// NOT applicable IRL - for multiple mints
export const mintNDegens = async (n, walletAddress) => {
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
    await mintDegen(degenUrl, walletAddress);
  }
};

export const mintNMiami = async (n, walletAddress) => {
  let availableNonce = await getAccountNonce(wallets[walletAddress][network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets[walletAddress][network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = 0; i < n; i++) {
    await checkNonceUpdate();
    await mintMiami(walletAddress);
  }
};

export const mintNNYC = async (n, walletAddress) => {
  let availableNonce = await getAccountNonce(wallets[walletAddress][network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets[walletAddress][network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = 0; i < n; i++) {
    await checkNonceUpdate();
    await mintNYC(walletAddress);
  }
};

export const mintComponentSet = async (walletAddress) => {
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
  await mintBackground(backgroundName, walletAddress);
  await checkNonceUpdate();
  await mintCar(carName, walletAddress);
  await checkNonceUpdate();
  await mintRims(rimsName, walletAddress);
  await checkNonceUpdate();
  await mintHead(headName, walletAddress);
};

export const mintNComponentSets = async (n, walletAddress) => {
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
    await mintComponentSet(walletAddress);
  }
};

// assemble n component sets starting from component-id start to component-id start+n-1
export const addNAssembleToQueue = async (start, n, walletAddress) => {
  let availableNonce = await getAccountNonce(wallets[walletAddress][network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets[walletAddress][network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = start; i < start + n; i++) {
    await checkNonceUpdate();
    await addAssembleToQueue(i, i, i, i, walletAddress);
  }
};

// disassemble n degens starting from degen-id start to degen-id start+n-1
export const addNDisassembleToQueue = async (start, n, walletAddress) => {
  let availableNonce = await getAccountNonce(wallets[walletAddress][network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets[walletAddress][network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = start; i < start + n; i++) {
    await checkNonceUpdate();
    await addDisassembleToQueue(i, walletAddress);
  }
};

export const addNMergeToQueue = async (start, n, type, walletAddress) => {
  let availableNonce = await getAccountNonce(wallets[walletAddress][network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets[walletAddress][network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = start; i < start + n; i++) {
    await checkNonceUpdate();
    await addMergeToQueue(i, type, walletAddress);
  }
};

// START PREFILLS CALLS

// has to be less than 25 transactions by same account into a block
// there is a limit of 5 disassembles from same user

// await mintNDegens(1);
// await addNDisassembleToQueue(2, 0);

// await mintComponentSet();
await mintNComponentSets(5, wallets.wallet2);
await addNAssembleToQueue(1, 5, wallets.wallet2);

// await mintComponentSet();

// await mintDegen('ipfs://bafkreidezqputo6mzxgiqivj52vctrugiflckkwfoyj6cdjhiege2s7jma');
// await mintCar('LamboBlue');
// await mintRims('ClassyDark');
// await mintComponentSet();
// await addSwapToQueue(7, 3, 'background-type');
// await mintNYC();
// await new Promise((r) => setTimeout(r, 2000));
// await mintMiami();
// await new Promise((r) => setTimeout(r, 2000));
// await addMergeToQueue(1, 'nyc');
// await new Promise((r) => setTimeout(r, 2000));
// await addMergeToQueue(1, 'miami');
// await addSwapToQueue(1, 2, 'car-type');

// for calls with wallet - use as walletAddress parameter - 'user', 'wallet2', 'wallet3' etc.
