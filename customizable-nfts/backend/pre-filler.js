import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { componentType, contracts, network, wallets } from './consts.js';
import { stringToMap } from './converters.js';
import {
  callSCFunctionWithNonce,
  callSCFunctionWithNonceWallet,
  checkNonceUpdate,
  getAccountNonce,
  getMempoolTransactionCount,
  sleep,
  waitTillMempoolClears,
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
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.admin[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  // console.log(`Mempool TX Number: ${await getMempoolTransactionCount(wallets.admin[network])}`);
  await getMempoolTransactionCount(wallets.admin[network]).then((x) => console.log(`Mempool TX Number: ${x}`));
  await checkNonceUpdate()
    .then(() => mintBackground(componentNames.Background, walletAddress))
    .then(() => {
      sleep(1000);
      // waitTillMempoolClears();
    })
    .then(() => checkNonceUpdate())
    .then(() => {
      sleep(1000);
      // waitTillMempoolClears();
      // getMempoolTransactionCount(wallets.admin[network]).then((x) => console.log(`Mempool TX Number: ${x}`));
    })
    .then(() => mintCar(componentNames.Car, walletAddress))
    .then(() => checkNonceUpdate())
    .then(() => {
      sleep(1000);
      // waitTillMempoolClears();
      // getMempoolTransactionCount(wallets.admin[network]).then((x) => console.log(`Mempool TX Number: ${x}`));
    })
    .then(() => mintRims(componentNames.Rims, walletAddress))
    .then(() => checkNonceUpdate())
    .then(() => {
      sleep(1000);
      // waitTillMempoolClears();
      // getMempoolTransactionCount(wallets.admin[network]).then((x) => console.log(`Mempool TX Number: ${x}`));
    })
    .then(() => mintHead(componentNames.Head, walletAddress));
};

export const mintNComponentSets = async (componentNames, n, walletAddress) => {
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
    await mintComponentSet(componentNames, walletAddress);
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
    .then(() => sleep(2000))
    .then(() => addNAssembleToQueue(start, n, walletAddress));

};

const prefillNDisassemble = async (degenUrls, start, n, walletAddress) => {
  await mintNDegens(degenUrls, n, walletAddress)
    .then(() => sleep(2000))
    .then(() => addNDisassembleToQueue(start, n, walletAddress));
};

const prefillNSwap = async (degenUrls, componentNames, n, walletAddress) => {
  await mintNDegens(degenUrls, n, walletAddress);

  let componentId = 1;
  for (let i = 0; i < n; i++) {
    await checkNonceUpdate();
    if (i % 4 === 0) {
      await mintBackground(componentNames.Background, walletAddress)
        .then(() => sleep(2000))
        .then(() => addSwapToQueue(i, componentId, 'background-type'));
    } else if (i % 4 === 1) {
      await mintCar(componentNames.Car, walletAddress)
        .then(() => sleep(2000))
        .then(() => addSwapToQueue(i, componentId, 'car-type'));
    } else if (i % 4 === 2) {
      await mintRims(componentNames.Rims, walletAddress)
        .then(() => sleep(2000))
        .then(() => addSwapToQueue(i, componentId, 'rim-type'));
    } else {
      await mintHead(componentNames.Head, walletAddress)
        .then(() => sleep(2000))
        .then(() => addSwapToQueue(i, componentId, 'head-type'));
      // .then(() => (componentId += 1));
      componentId += 1;
    }
  }
};

const prefillNMerge = async (type, start, n, walletAddress) => {
  if (type === 'miami') {
    await mintNMiami(n, walletAddress)
      .then(() => sleep(2000))
      .then(() => addNMergeToQueue(start, n, 'miami', walletAddress));
  } else if (type === 'nyc') {
    await mintNNYC(n, walletAddress)
      .then(() => sleep(2000))
      .then(() => addNMergeToQueue(start, n, 'nyc', walletAddress));
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
    'ipfs://bafkreicdvhveureq6el4nlckmtiicbqliis2okrmqsxiixk5tuu2qwvowu',
    'ipfs://bafkreidsdf4ecaoyx6kmukoown3ki5dr5smyjyb4bbfuu5hgxplnvz6uvu',
    'ipfs://bafkreigy75l6wwn76almtkrznnskzgrpkmde7wrjsjfvr566gpnezq2vmu',
    'ipfs://bafkreie5ztt34skvfvmkaalkzzdj6fq6247obkbtuywo63ch3vlipqdee4',
    'ipfs://bafkreifo3cbn7qnrneuxcoqxb2i7tskz5hg6fhdrmzmoigsoc5c67tlsou',
  ];

  let degenUrlsSwap = [
    'ipfs://bafkreiffq5gzls75gvoflxv5jawzig6nnasganyrdkvypfdj6maazv3ioa',
    'ipfs://bafkreiagqvmso2xtgvnxy6hiius3bq7lq7kkraua43w2s6ijd4rb64b3di',
    'ipfs://bafkreia3yegwahw4w27cindmbz3wp5vbexdjyouttwjp5wiy75stqe67c4',
    'ipfs://bafkreic7uucxypcfsdatbojzn3yd6aoeywfws6yh7cxwcqvhqpalq3ggzi',
    'ipfs://bafkreifovceyfttkdsn4rv3uf4oc6gzgkuh3tw3uhcnihysz2rogcktscu',
  ];

  const walletUser = 'user';
  const wallet2 = 'wallet2';
  const wallet3 = 'wallet3';

  const n = 5;

  // max 25 tx per block, else server call throws error

  // await prefillNSwap(degenUrlsSwap, componentSet2, n, walletUser); // %4 == 0
  await prefillNAssemble(componentSet1, 1, n, walletUser) // /4 + 1
    .then(() => sleep(3000))
    .then(() => prefillNAssemble(componentSet2, n + 1, n, wallet2))
    .then(() => sleep(3000))
    .then(() => prefillNAssemble(componentSet3, 2 * n + 1, n, wallet3));

  // await prefillNAssemble(componentSet1, 3 * n + 1, n, walletUser)
  //   .then(() => sleep(3000))
  //   .then(() => prefillNAssemble(componentSet2, 4 * n + 1, n, wallet2))
  //   .then(() => sleep(3000))
  //   .then(() => prefillNAssemble(componentSet3, 5 * n + 1, n, wallet3));

  // await mintNComponentSets(componentSet1, 4, walletUser);

  // prefillNMerge('miami', 1, 6, walletUser);
  // prefillNMerge('nyc', 1, 6, walletUser);
};

await runPrefillers();

const walletUser = 'user';
const wallet2 = 'wallet2';
const wallet3 = 'wallet3';
// await sleep(6000);

// await addNAssembleToQueue(31, 5, walletUser);
// await sleep(2000);
// await addNAssembleToQueue(36, 5, wallet2);
// await sleep(2000);
// await addNAssembleToQueue(41, 5, wallet3);
