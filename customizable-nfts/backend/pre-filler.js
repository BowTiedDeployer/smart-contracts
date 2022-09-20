import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import { stringToMap } from './converters.js';
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
export const mintNDegens = async (degenUrls, n, walletAddress) => {
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
    await mintDegen(degenUrls[i], walletAddress);
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

export const mintComponentSet = async (componentNames, walletAddress) => {
  let availableNonce = await getAccountNonce(wallets.admin[network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 15) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.admin[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  await checkNonceUpdate();
  await mintBackground(componentNames.Background, walletAddress);
  await checkNonceUpdate();
  await mintCar(componentNames.Car, walletAddress);
  await checkNonceUpdate();
  await mintRims(componentNames.Rims, walletAddress);
  await checkNonceUpdate();
  await mintHead(componentNames.Head, walletAddress);
};

export const mintNComponentSets = async (componentNames, n, walletAddress) => {
  let availableNonce = await getAccountNonce(wallets.admin[network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 15) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.admin[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  for (let i = 0; i < n; i++) {
    await checkNonceUpdate();
    await mintComponentSet(componentNames, walletAddress);
  }
};

// assemble n component sets starting from component-id start to component-id start+n-1
export const addNAssembleToQueue = async (start, n, walletAddress) => {
  let availableNonce = await getAccountNonce(wallets[walletAddress][network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 15) throw new Error("Nonce didn't update on the blockchain API.");

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

  return null;
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

  return null;
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

  return null;
};

// START PREFILLS CALLS

// has to be less than 25 transactions by same account into a block
// there is a limit of 5 disassembles from same user

// await mintNDegens(1);
// await addNDisassembleToQueue(2, 0);

// await mintComponentSet();
// await mintNComponentSets(5, wallets.wallet2);
// await addNAssembleToQueue(1, 5, wallets.wallet2);

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

// const prefillNAssemble = async (componentNames, start, n, walletAddress) => {
//   await mintNComponentSets(componentNames, n, walletAddress);
//   await sleep(4000);
//   await addNAssembleToQueue(start, n, walletAddress);
// };

const prefillNAssemble = async (componentNames, start, n, walletAddress) => {
  await mintNComponentSets(componentNames, n, walletAddress)
    .then(await sleep(3000))
    .then(await addNAssembleToQueue(start, n, walletAddress));
};

const prefillNDisassemble = async (degenUrls, start, n, walletAddress) => {
  await mintNDegens(degenUrls, n, walletAddress)
    .then(await sleep(3000))
    .then(await addNDisassembleToQueue(start, n, walletAddress));
};

const prefillNSwap = async (degenUrls, componentNames, n, walletAddress) => {
  await mintNDegens(degenUrls, n, walletAddress);

  let componentId = 1;
  for (let i = 0; i < n; i++) {
    await checkNonceUpdate();
    if (i % 4 === 0) {
      await mintBackground(componentNames.Background, walletAddress);
      await sleep(2000);
      await addSwapToQueue(i, componentId, 'background-type');
    } else if (i % 4 === 1) {
      await mintCar(componentNames.Car, walletAddress);
      await sleep(2000);
      await addSwapToQueue(i, componentId, 'car-type');
    } else if (i % 4 === 2) {
      await mintRims(componentNames.Rims, walletAddress);
      await sleep(2000);
      await addSwapToQueue(i, componentId, 'rim-type');
    } else {
      await mintHead(componentNames.Head, walletAddress);
      await sleep(2000);
      await addSwapToQueue(i, componentId, 'head-type');
      componentId += 1;
    }
  }
};

const prefillNMerge = async (type, start, n, walletAddress) => {
  if (type === 'miami') {
    await mintNMiami(n, walletAddress)
      .then(await sleep(4000))
      .then(await addNMergeToQueue(start, start + n - 1, 'miami', walletAddress));
  } else if (type === 'nyc') {
    await mintNNYC(n, walletAddress)
      .then(await sleep(4000))
      .then(await addNMergeToQueue(start, start + n - 1, 'nyc', walletAddress));
  }
};

const runPrefillers = async () => {
  let componentSet1 = {
    Background: 'Sunset',
    Car: 'BentleyGrey',
    Rims: 'SportyPearlescent',
    Head: 'Miami_Party_Sunglasses',
  };

  let componentSet2 = {
    Background: 'Emerald',
    Car: 'LamboBlue',
    Rims: 'ClassyDark',
    Head: 'NYC_Antenna_Elf',
  };

  let componentSet3 = {
    Background: 'Purple',
    Car: 'BentleyGold',
    Rims: 'SportyGold',
    Head: 'Miami_Sword_Bandana',
  };

  let degenUrlsDisassemble = [
    'ipfs://bafkreibilyogaifciaegxnaqyto256cmhu3lik6pgipyw47jtcq73ktp5m',
    'ipfs://bafkreihzsxv2y2mty46so6ea2o4l54wz3jldthjmqc6m6n356jkaoz6qgi',
    'ipfs://bafkreidexn3rykez2ah7byc4jz35nhxq7rtiwibewebm7jrb24eivtel2i',
    'ipfs://bafkreicb7iccunsigfygvlbvozjtcvvmyqscfqvzxjwraj23dxulbp7igm',
    'ipfs://bafkreid6claos4jpimrje62wbb4rkb6dfkukxakom53mz4ssskvstvh4ia',
  ];

  let degenUrlsSwap = [
    'ipfs://bafkreidpztx6sjsnk3kpjkqpsgkcpaqa2doj7m7zbeftr5tpoy4lspqspy',
    'ipfs://bafkreihdpsqxsdu37fowkuhnoknejodqg2z2vs7dgnpum763xz4uyzk5mu',
    'ipfs://bafkreigkqbk55b7jznrfndqh7kl3jfiuhssgxv3pj2t7u5ypieeu6j5ghu',
    'ipfs://bafkreib6kyq4fejlcy64r2zapl4s4ktk7bfw2zlomwxehcttohg3l2fhee',
    'ipfs://bafkreibmrourvcalqtosoykdwmzjrrgfbdxmasd7bawmoc73e7pphfkuxy',
  ];

  const walletUser = 'user';
  const wallet2 = 'wallet2';
  const wallet3 = 'wallet3';

  const n = 5;

  // await prefillNSwap(degenUrlsSwap, componentSet2, n, walletAddress);
  // await prefillNAssemble(componentSet1, 1, n, walletUser);
  // await addNAssembleToQueue(28, 3, wallet3);

  // await sleep(3000);
  // await prefillNAssemble(componentSet2, 4 * n + 1, n, wallet2);
  // await sleep(3000);
  // await prefillNAssemble(componentSet3, 5 * n + 1, n, wallet3);
};

await runPrefillers();
