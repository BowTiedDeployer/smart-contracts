import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, nodeUrl, wallets } from './consts.js';
import {
  componentSet1,
  componentSet2,
  componentSet3,
  degenUrlsDisassemble,
  degenUrlsSwap,
} from './consts-pre-filler.js';
import { getWalletStoredNonce, globalNonce, setWalletStoredNonce } from './variables.js';
import {
  callSCFunctionWallet,
  sleep,
  callSCFunction,
  getAccountNonce,
  instantiateAllAccountsNonce,
} from './helper_sc.js';

let networkN =
  network === 'mainnet'
    ? new StacksMainnet({ url: nodeUrl[network] })
    : network === 'testnet'
    ? new StacksTestnet({ url: nodeUrl[network] })
    : new StacksMocknet();

export const popDisassembleQueue = async (walletAddress) => {
  let nonce = getWalletStoredNonce(walletAddress);
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'pop-disassemble-work-queue-public',
    [],
    walletAddress,
    nonce
  );
  setWalletStoredNonce(walletAddress, nonce + 1);
};

export const mintDegen = async (url, walletAddress) => {
  let nonce = getWalletStoredNonce(wallets.admin.name);
  await callSCFunction(
    networkN,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'mint-uri',
    [wallets[walletAddress][network], url],
    nonce
  );
  setWalletStoredNonce(wallets.admin.name, nonce + 1);
};

export const burnDegen = async (id, walletAddress) => {
  let nonce = getWalletStoredNonce(walletAddress);
  await callSCFunctionWallet(
    networkN,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'burn-token',
    [id],
    walletAddress,
    nonce
  );
  setWalletStoredNonce(walletAddress, nonce + 1);
};

export const mintMiami = async (walletAddress) => {
  let nonce = getWalletStoredNonce(walletAddress);
  await callSCFunctionWallet(
    networkN,
    contracts[network].miami.split('.')[0],
    contracts[network].miami.split('.')[1],
    'claim',
    [],
    walletAddress,
    nonce
  );
  setWalletStoredNonce(walletAddress, nonce + 1);
};

export const mintNYC = async (walletAddress) => {
  let nonce = getWalletStoredNonce(walletAddress);
  await callSCFunctionWallet(
    networkN,
    contracts[network].nyc.split('.')[0],
    contracts[network].nyc.split('.')[1],
    'claim',
    [],
    walletAddress,
    nonce
  );
  setWalletStoredNonce(walletAddress, nonce + 1);
};

// for components
export const mintBackground = async (name, walletAddress) => {
  let nonce = getWalletStoredNonce(wallets.admin.name);
  await callSCFunction(
    networkN,
    contracts[network].backgrounds.split('.')[0],
    contracts[network].backgrounds.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name],
    nonce
  );
  setWalletStoredNonce(wallets.admin.name, nonce + 1);
};

export const mintCar = async (name, walletAddress) => {
  let nonce = getWalletStoredNonce(wallets.admin.name);
  await callSCFunction(
    networkN,
    contracts[network].cars.split('.')[0],
    contracts[network].cars.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name],
    nonce
  );
  setWalletStoredNonce(wallets.admin.name, nonce + 1);
};

export const mintHead = async (name, walletAddress) => {
  let nonce = getWalletStoredNonce(wallets.admin.name);
  await callSCFunction(
    networkN,
    contracts[network].heads.split('.')[0],
    contracts[network].heads.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name],
    nonce
  );
  setWalletStoredNonce(wallets.admin.name, nonce + 1);
};

export const mintRims = async (name, walletAddress) => {
  let nonce = getWalletStoredNonce(wallets.admin.name);
  await callSCFunction(
    networkN,
    contracts[network].rims.split('.')[0],
    contracts[network].rims.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name],
    nonce
  );
  setWalletStoredNonce(wallets.admin.name, nonce + 1);
};

//for queues
export const addDisassembleToQueue = async (degenId, walletAddress) => {
  // call add-work-disassemble
  // manual value
  let nonce = getWalletStoredNonce(walletAddress);
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-disassemble-work-in-queue',
    [degenId],
    walletAddress,
    nonce
  );
  // console.log(`Disassemble ${degenId} ${walletAddress}\n`);
  setWalletStoredNonce(walletAddress, nonce + 1);
};

// (background-id uint) (car-id uint) (rim-id uint) (head-id uint))
export const addAssembleToQueue = async (backgroundId, carId, rimId, headId, walletAddress) => {
  // call add-work-assemble
  let nonce = getWalletStoredNonce(walletAddress);
  console.log('nonce: ' + nonce);
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-assemble-work-in-queue',
    [backgroundId, carId, rimId, headId],
    walletAddress,
    nonce
  );
  // console.log(`Assemble ${backgroundId} ${carId} ${rimId} ${headId} ${walletAddress}\n`);
  setWalletStoredNonce(walletAddress, nonce + 1);
};

// (degen-id uint) (component-id uint) (component-type (string-ascii 30)
export const addSwapToQueue = async (degenId, componentId, componentType, walletAddress) => {
  // call add-work-assemble
  let nonce = getWalletStoredNonce(walletAddress);
  console.log(degenId, componentId, componentType, walletAddress, nonce);
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-swap-work-in-queue',
    [degenId, componentId, componentType],
    walletAddress,
    nonce
  );
  // console.log(`Swap ${degenId} ${componentId} ${componentType} ${walletAddress}\n`);
  setWalletStoredNonce(walletAddress, nonce + 1);
};

export const addMergeToQueue = async (id, type, walletAddress) => {
  // call add-work-merge
  // manual value
  let nonce = getWalletStoredNonce(walletAddress);
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-merge-work-in-queue',
    [id, type],
    walletAddress,
    nonce
  );
  // console.log(`Swap ${id} ${type} ${walletAddress}\n`);
  setWalletStoredNonce(walletAddress, nonce + 1);
};

// NOT applicable IRL - for multiple mints
export const mintNDegens = async (degenUrls, n, walletAddress) => {
  // console.log('walletAddress', walletAddress);
  // console.log(globalNonce);
  // console.log('mint N Degens');
  // console.log('//');
  for (let i = 0; i < n; i++) {
    await mintDegen(degenUrls[i], walletAddress);
  }
};

export const mintNMiami = async (n, walletAddress) => {
  // console.log('walletAddress', walletAddress);
  // console.log(globalNonce);
  // console.log('mintMiami');
  // console.log('//');
  for (let i = 0; i < n; i++) {
    // await checkNonceUpdate();
    await mintMiami(walletAddress);
  }
};

export const mintNNYC = async (n, walletAddress) => {
  // console.log('walletAddress', walletAddress);
  // console.log('mintNYC');
  // console.log('//');
  // console.log(globalNonce);
  for (let i = 0; i < n; i++) {
    // await checkNonceUpdate();
    await mintNYC(walletAddress);
  }
};

export const mintComponentSet = async (componentNames, walletAddress) => {
  // console.log('Mint 1 Component Set');
  // console.log('//');
  await mintBackground(componentNames.Background, walletAddress);
  await mintCar(componentNames.Car, walletAddress);
  await mintRims(componentNames.Rims, walletAddress);
  await mintHead(componentNames.Head, walletAddress);
};

export const mintNComponentSets = async (componentNames, n, walletAddress) => {
  // console.log('Mint N Component Sets');
  // console.log('//');
  for (let i = 0; i < n; i++) {
    // await mintComponentSet(componentNames, walletAddress);
    await mintBackground(componentNames.Background, walletAddress);
    await mintCar(componentNames.Car, walletAddress);
    await mintRims(componentNames.Rims, walletAddress);
    await mintHead(componentNames.Head, walletAddress);
  }
};

const componentMintCall = {
  background: mintBackground,
  car: mintBackground,
  rims: mintRims,
  head: mintHead,
};

export const mintComponentsListNames = async (componentNames, walletAddress, type) => {
  // for (const component of componentNames) {
  //   await componentMintCall[type](component, walletAddress, availableNonce);
  //   availableNonce += 1;
  // }
  console.log('TYPE: ', type);
  if (type === 'background')
    for (const component of componentNames) {
      await mintBackground(component, walletAddress);
    }
  else if (type === 'car')
    for (const component of componentNames) {
      await mintCar(component, walletAddress);
    }
  else if (type === 'rims')
    for (const component of componentNames) {
      await mintRims(component, walletAddress);
    }
  else if (type === 'head')
    for (const component of componentNames) {
      await mintHead(component, walletAddress);
    }
};

// assemble n component sets starting from component-id start to component-id start+n-1
export const addNAssembleToQueue = async (start, n, walletAddress) => {
  console.log('addNAssembleToQueue');
  console.log(start, n, walletAddress);
  // console.log('//');
  for (let i = start; i < start + n; i++) {
    await addAssembleToQueue(i, i, i, i, walletAddress);
  }
};

// disassemble n degens starting from degen-id start to degen-id start+n-1
export const addNDisassembleToQueue = async (start, n, walletAddress) => {
  console.log('addNDisassembleToQueue');
  console.log('//');
  for (let i = start; i < start + n; i++) {
    await addDisassembleToQueue(i, walletAddress);
  }
};

export const addNMergeToQueue = async (start, n, type, walletAddress) => {
  console.log('addNMergeToQueue');
  console.log('//');
  for (let i = start; i < start + n; i++) {
    // await checkNonceUpdate();
    await addMergeToQueue(i, type, walletAddress);
  }
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
  await mintNComponentSets(componentNames, n, walletAddress);
  await sleepPickedTime();

  // console.log('Going to sleep');
  // await sleep(1000);
  //  new Promise((r) => setTimeout(r, 2000));
  // console.log('Going to asemble');

  await addNAssembleToQueue(start, n, walletAddress);
};

const prefillNDisassemble = async (degenUrls, start, n, walletAddress) => {
  await mintNDegens(degenUrls, n, walletAddress);
  await sleepPickedTime();
  await addNDisassembleToQueue(start, n, walletAddress);
};

const sleepPickedTime = async () => {
  await sleep(3000);
};
const prefillNSwap = async (degenUrls, componentNames, n, walletAddress, startDegenId, startComponentsId) => {
  await mintNDegens(degenUrls, n, walletAddress);
  // await sleep(2000);
  await sleepPickedTime();
  // console.log('MINTED DEGENS');
  await mintNComponentSets(componentNames, n / 4, walletAddress);
  await sleepPickedTime();
  // await sleep(2000);
  // console.log('MINTED COMPONENTS');
  let componentId = startComponentsId;
  let degenId = startDegenId;
  for (let i = 1; i <= n / 4; i++) {
    // await checkNonceUpdate();
    await addSwapToQueue(degenId, componentId, 'background-type', walletAddress);
    degenId += 1;
    // await checkNonceUpdate();
    await addSwapToQueue(degenId, componentId, 'car-type', walletAddress);
    degenId += 1;
    // await checkNonceUpdate();
    await addSwapToQueue(degenId, componentId, 'rim-type', walletAddress);
    degenId += 1;
    // await checkNonceUpdate();
    await addSwapToQueue(degenId, componentId, 'head-type', walletAddress);
    degenId += 1;
    componentId += 1;
    // await sleep(2000);
  }
};

const prefillNMerge = async (type, start, n, walletAddress) => {
  if (type === 'miami') {
    await mintNMiami(n, walletAddress);
    await sleepPickedTime();
    await addNMergeToQueue(start, n, 'miami', walletAddress);
  } else if (type === 'nyc') {
    await mintNNYC(n, walletAddress);
    await sleepPickedTime();
    await addNMergeToQueue(start, n, 'nyc', walletAddress);
  }
};

// TODO: test this
const wrapperPrefillNAssemble = async (noPrefills, start, n, componentSets, sleepTime) => {
  if (noPrefills > 20) {
    console.log('Too many prefills wrapper assemble');
    return;
  }

  await sleep(sleepTime);
  console.log(`assemble wallet User starting ${start} and n ${n}`);
  await prefillNAssemble(componentSets[0], start, n, wallets.user.name);
  if (noPrefills == 1) {
    return;
  }
  for (let i = 1; i < noPrefills; i++) {
    await sleep(sleepTime);
    console.log(`assemble wallet ${i + 1} starting ${i * n + start} and n ${n}`);
    await prefillNAssemble(componentSets[i % 3], i * n + start, n, wallets['wallet' + (i + 1)].name);
  }
};

// TODO: test this
const wrapperPrefillNDisassemble = async (noPrefills, start, n, degenUrls, sleepTime) => {
  if (noPrefills > 20) {
    console.log('Too many prefills wrapper disassemble');
    return;
  }
  if (noPrefills == 1) {
    await sleep(sleepTime);
    console.log(`disassemble wallet User starting ${start} and n ${n}`);
    await prefillNDisassemble(degenUrls, start, n, wallets.user.name);
    return;
  }
  for (let i = 1; i < noPrefills; i++) {
    await sleep(sleepTime);
    console.log(`disassemble wallet ${i + 1} starting ${i * n + start}`);
    await prefillNDisassemble(degenUrls, i * n + start, n, wallets['wallet' + (i + 1)].name);
  }
};

// TODO: test this
// n % 4 == 0
const wrapperPrefillNSwap = async (
  noPrefills,
  startComponentsId,
  startDegenId,
  n,
  degenUrls,
  componentNames,
  sleepTime
) => {
  if (noPrefills > 20) {
    console.log('Too many prefills wrapper disassemble');
    return;
  }
  let componentIndex = startComponentsId;
  let degenIndex = startDegenId;
  if (noPrefills == 1) {
    await sleep(sleepTime);
    console.log(`swap wallet User starting degen index ${degenIndex} and component index ${componentIndex}`);
    await prefillNSwap(degenUrls, componentNames, n, wallets.user.name, degenIndex, componentIndex);
    return;
  }
  for (let i = 1; i < noPrefills; i++) {
    degenIndex += n;
    componentIndex += n / 4; // TODO: check this
    console.log(`swap wallet ${i + 1} starting degen index ${degenIndex} and component index ${componentIndex}`);
    await sleep(sleepTime);
    await prefillNSwap(degenUrls, componentNames, n, wallets['wallet' + (i + 1)].name, degenIndex, componentIndex);
  }
};

// TODO: test this
const wrapperPrefillNMerge = async (noPrefills, start, n, sleepTime) => {
  if (noPrefills > 20) {
    console.log('Too many prefills wrapper disassemble');
    return;
  }
  if (noPrefills == 1) {
    await sleep(sleepTime);
    console.log(`disassemble wallet User starting ${start}`);
    await prefillNMerge('miami', start, n, wallets.user.name);
    await prefillNMerge('nyc', start, n, wallets.user.name);
    return;
  }
  for (let i = 1; i < noPrefills; i++) {
    await sleep(sleepTime);
    console.log(`disassemble wallet ${i + 1} starting ${i * n + start}`);
    await prefillNMerge('miami', i * n + start, n, wallets['wallet' + (i + 1)].name); // TODO: check this
    await prefillNMerge('nyc', i * n + start, n, wallets['wallet' + (i + 1)].name);
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
    'ipfs://bafkreigsavqryiu3tnampbfeip6bryrqybq27uy6zxgozir635tztpb4ve',
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

  const n = 5;
  let start = 1;
  let componentIndex = 1;
  let degenIndex = 1;
  let sleepTime = 2000;

  // max 25 tx per block, else server call throws error

  // SWAP
  //
  // const swapNr = 4;
  // const noSwaps = await prefillNSwap(degenUrlsSwap, componentSet2, swapNr, wallets.user.name); // %4 == 0
  // start += swapNr / 4;

  // const nrSwapOp = 10;
  // const nSwap = 4; // nSwap % 4 === 0
  // await wrapperPrefillNSwap(nrSwapOp, componentIndex, degenIndex, nSwap, degenUrlsSwap, componentSet2, sleepTime);
  // degenIndex += nrSwapOp * nSwap;
  // componentIndex += (nrSwapOp * nSwap) / 4;

  // ASSEMBLE
  //
  // await sleep(10000);
  // await prefillNAssemble(componentSet1, start, n, wallets.user.name); // /4 + 1
  // await sleep(10000);
  // await prefillNAssemble(componentSet2, n + start, n, wallets.wallet2.name);
  // await sleep(10000);
  // await prefillNAssemble(componentSet3, 2 * n + start, n, wallets.wallet3.name);
  // await sleep(10000);
  // await prefillNAssemble(componentSet3, 3 * n + start, n, wallets.wallet4.name);
  // await sleep(10000);
  // await prefillNAssemble(componentSet3, 4 * n + start, n, wallets.wallet5.name);
  // await sleep(10000);
  // await prefillNAssemble(componentSet3, 3 * n + start, n, wallets.wallet6.name);
  // await sleep(10000);
  // await prefillNAssemble(componentSet3, 4 * n + start, n, wallets.wallet7.name);
  // await sleep(10000);
  // await prefillNAssemble(componentSet3, 3 * n + start, n, wallets.wallet8.name);
  // await sleep(10000);
  // await prefillNAssemble(componentSet3, 4 * n + start, n, wallets.wallet9.name);
  // equivalent to this
  console.log('//\n//\n// before n assemble');
  console.log('degen index', degenIndex);
  console.log('component index', componentIndex);
  const nrAssembleOp = 9;
  await wrapperPrefillNAssemble(nrAssembleOp, componentIndex, n, [componentSet1, componentSet2, componentSet3], 2000);
  componentIndex += nrAssembleOp * n;

  //
  // can have only 5 per wallet - after first, call assemble and do the next
  // await prefillNAssemble(componentSet1, 3 * n + start, n, walletUser)
  //   .then(() => sleep(3000))
  //   .then(() => prefillNAssemble(componentSet2, 4 * n + start, n, wallet2))
  //   .then(() => sleep(3000))
  //   .then(() => prefillNAssemble(componentSet3, 5 * n + start, n, wallet3));

  // await mintNComponentSets(componentSet1, 4, walletUser);

  // DISASSEMBLE
  //
  // await prefillNDisassemble(degenUrlsDisassemble, n + start, n, wallets.user.name);
  //
  //
  const nrDisassembleOp = 9;
  await wrapperPrefillNDisassemble(nrDisassembleOp, degenIndex, n, degenUrlsDisassemble, 2000);
  degenIndex += nrDisassembleOp * n;

  // MERGE
  //
  // await prefillNMerge('miami', 1, 6, wallets.user.name);
  // await prefillNMerge('nyc', 1, 6, wallets.user.name);
  const nrMergeOp = 9;
  const nMerge = 2;
  await wrapperPrefillNMerge(nrMergeOp, 1, nMerge, 2000);
  degenIndex += nrMergeOp * nMerge * 2;
};

const prefillWalletNFTs = async (walletAddress) => {
  const backgroundsMintedList = ['DarkPurple', 'Emerald', 'Goldie', 'Orange', 'Purple', 'Sunset'];
  const rimsMintedList = ['SportyGold', 'ClassyWhite', 'SportyPearlescent'];
  const carMintedList = ['LamboPearlescent', 'BentleyGold', 'BentleyWhite'];
  const headMintedList = ['Miami_Party_Bandana', 'NYC_PUBG_BigSmile', 'NYC_PUBG_Vampire', 'Miami_Syringe_Sunglasses'];

  // DOESN'T WORK ON TESTNET BECAUSE OF NONCE
  //
  await mintComponentsListNames(backgroundsMintedList, walletAddress, 'background');
  // await mintBackground('DarkPurple', walletUser);
  // await mintBackground('Emerald', walletUser);
  // await mintBackground('Goldie', walletUser);
  // await mintBackground('Orange', walletUser);
  // await mintBackground('Purple', walletUser);
  // await mintBackground('Sunset', walletUser);

  await mintComponentsListNames(carMintedList, walletAddress, 'car');
  // // await mintCar('LamboPearlescent', walletUser);
  // // await mintCar('BentleyGold', walletUser);
  // // await mintCar('BentleyWhite', walletUser);

  await mintComponentsListNames(rimsMintedList, walletAddress, 'rims');
  // // await mintRims('SportyGold', walletUser);
  // // await mintRims('ClassyWhite', walletUser);
  // // await mintRims('SportyPearlescent', walletUser);

  await mintComponentsListNames(headMintedList, walletAddress, 'head');
  // await mintHead('Miami_Party_Bandana', walletUser);

  // await mintDegen('ipfs://bafkreidsdf4ecaoyx6kmukoown3ki5dr5smyjyb4bbfuu5hgxplnvz6uvu', walletUser);
  // await sleep(3000);
  // await mintDegen('ipfs://bafkreigy75l6wwn76almtkrznnskzgrpkmde7wrjsjfvr566gpnezq2vmu', walletUser);
  // await sleep(3000);
  // await mintDegen('ipfs://bafkreie5ztt34skvfvmkaalkzzdj6fq6247obkbtuywo63ch3vlipqdee4', walletUser);
  // await sleep(3000);
  // await mintDegen('ipfs://bafkreifo3cbn7qnrneuxcoqxb2i7tskz5hg6fhdrmzmoigsoc5c67tlsou', walletUser);

  // await mintNMiami(10, walletUser);
  // await mintNNYC(10, walletUser);
};

const verifyMempool1AccUnder25 = async () => {
  const blcokchainNextNonce = await getAccountNonce(wallets[wallets.admin.name][network]);
  setWalletStoredNonce(wallets.admin.name, blcokchainNextNonce);
  await prefillWalletNFTs(wallets.wallet2.name);
};

const verifyMempool1AccOver25 = async () => {
  const blcokchainNextNonce = await getAccountNonce(wallets[wallets.admin.name][network]);
  setWalletStoredNonce(wallets.admin.name, blcokchainNextNonce);
  await prefillWalletNFTs(wallets.wallet2.name);
  await prefillWalletNFTs(wallets.wallet3.name);
};

const verifyMempoolMultipleAccsOver25 = async () => {
  await mintNMiami(10, wallets.wallet2.name);
  await mintNMiami(10, wallets.wallet3.name);
  await mintNMiami(10, wallets.wallet4.name);
};

const verifyOrderPrefill5Txs1Acc = async () => {
  const n = 5;
  let start = 1;
  let componentIndex = 1;
  let degenIndex = 1;
  let sleepTime = 2000;

  // max 25 tx per block, else server call throws error

  // SWAP
  //
  const swapNr = 4;
  await prefillNSwap(degenUrlsSwap, componentSet2, swapNr, wallets.user.name, degenIndex, componentIndex); // %4 == 0
  componentIndex += swapNr / 4;
  degenIndex += swapNr;
  console.log(`Starting Swap 2 with degenIndex: ${degenIndex} and componentIndex: ${componentIndex}`);
  await sleep(10000);
  await prefillNSwap(degenUrlsSwap, componentSet2, swapNr, wallets.wallet2.name, degenIndex, componentIndex); // %4 == 0
  componentIndex += swapNr / 4;
  degenIndex += swapNr;
  console.log(`Starting Swap 3 with degenIndex: ${degenIndex} and componentIndex: ${componentIndex}`);
  await sleep(10000);
  await prefillNSwap(degenUrlsSwap, componentSet2, swapNr, wallets.wallet3.name, degenIndex, componentIndex); // %4 == 0
  componentIndex += swapNr / 4;
  degenIndex += swapNr;
  // ASSEMBLE
  //
  // await sleep(10000);
  console.log(`Starting Assemble 1 with componentIndex: ${componentIndex}`);
  await prefillNAssemble(componentSet1, componentIndex, n, wallets.user.name); // /4 + 1
  componentIndex += n;
  console.log(`Starting Assemble 2 with componentIndex: ${componentIndex}`);
  await sleep(10000);
  await prefillNAssemble(componentSet2, componentIndex, n, wallets.wallet2.name);
  componentIndex += n;
  console.log(`Starting Assemble 3 with componentIndex: ${componentIndex}`);
  await sleep(10000);
  await prefillNAssemble(componentSet3, componentIndex, n, wallets.wallet3.name);
  componentIndex += n;
  // console.log('//\n//\n// before n assemble');

  // // DISASSEMBLE
  // //
  console.log(`Starting Disassemble 1 with degenIndex: ${degenIndex}`);
  await sleep(10000);
  await prefillNDisassemble(degenUrlsDisassemble, degenIndex, n, wallets.user.name);
  degenIndex += n;
  console.log(`Starting Disassemble 2 with degenIndex: ${degenIndex}`);
  await sleep(10000);
  await prefillNDisassemble(degenUrlsDisassemble, degenIndex, n, wallets.wallet2.name);
  degenIndex += n;
  console.log(`Starting Disassemble 3 with degenIndex: ${degenIndex}`);
  await sleep(10000);
  await prefillNDisassemble(degenUrlsDisassemble, degenIndex, n, wallets.wallet3.name);
  degenIndex += n;
  // //

  // // MERGE
  // //
  await sleep(10000);
  await prefillNMerge('miami', 1, 2, wallets.user.name);
  await prefillNMerge('nyc', 1, 2, wallets.user.name);
};
//
// await verifyOrderPrefill5Txs1Acc();

const prefillMintThingsOut = async () => {
  const n = 5;
  let start = 1;
  let componentIndex = 1;
  let degenIndex = 1;
  let sleepTime = 2000;

  instantiateAllAccountsNonce();
  // max 25 tx per block, else server call throws error

  // // SWAP
  // //
  // const swapNr = 4;
  // await mintNDegens(degenUrlsSwap, swapNr, wallets.user.name);
  // await mintNComponentSets(componentSet2, swapNr / 4, wallets.user.name);
  // componentIndex += swapNr / 4;
  // degenIndex += swapNr;
  // for (let i = 2; i <= 21; i++) {
  //   console.log(`Starting Mint for Swap ${i} with degenIndex: ${degenIndex} and componentIndex: ${componentIndex}`);
  //   await sleep(10000);
  //   await mintNDegens(degenUrlsSwap, swapNr, wallets[`wallet${i}`].name);
  //   await mintNComponentSets(componentSet2, swapNr / 4, wallets[`wallet${i}`].name);
  //   componentIndex += swapNr / 4;
  //   degenIndex += swapNr;
  // }

  // componentIndex += 20;
  // degenIndex += 80;
  // ASSEMBLE
  //
  await sleep(10000);
  console.log('\n\nASSSSEMBLEE\n\n');
  console.log(`Starting Mint for Assemble 1 with componentIndex: ${componentIndex}`);
  await mintNComponentSets(componentSet1, n, wallets.user.name);
  componentIndex += n;
  for (let i = 2; i <= 21; i++) {
    console.log(`Starting Mint for Assemble ${i} with componentIndex: ${componentIndex}`);
    await sleep(10000);
    await mintNComponentSets(componentSet1, n, wallets[`wallet${i}`].name);
    componentIndex += n;
  }
  console.log('//\n//\n// before n assemble');

  // // // // DISASSEMBLE
  // // //
  // console.log(`Starting Disassemble 1 with degenIndex: ${degenIndex}`);
  // await sleep(10000);
  // await mintNDegens(degenUrlsDisassemble, n, wallets.user.name);
  // degenIndex += n;
  // for (let i = 2; i <= 21; i++) {
  //   console.log(`Starting Disassemble ${i} with degenIndex: ${degenIndex}`);
  //   await sleep(10000);
  //   await mintNDegens(degenUrlsDisassemble, n, wallets[`wallet${i}`].name);
  //   degenIndex += n;
  // }
  // // //

  // // // MERGE
  // // //
  // await sleep(10000);
  // await mintNMiami(2, wallets.user.name);
  // await mintNNYC(2, wallets.user.name);
  // for (let i = 2; i <= 21; i++) {
  //   await sleep(1000);
  //   await mintNMiami(2, wallets[`wallet${i}`].name);
  //   await mintNNYC(2, wallets[`wallet${i}`].name);
  // }
};

// console.log('Going to sleep');
// await sleep(1000);
//  new Promise((r) => setTimeout(r, 2000));
// console.log('Going to asemble');
// prefillMintThingsOut();

const prefillAddToQueueThingsOut = async () => {
  const n = 5;
  let componentIndex = 1;
  let degenIndex = 1;
  let sleepTime = 2000;

  // max 25 tx per block, else server call throws error
  instantiateAllAccountsNonce();
  // SWAP
  //
  const swapNr = 4;
  // for (let i = 1; i <= swapNr / 4; i++) {
  //   // await checkNonceUpdate();
  //   await addSwapToQueue(degenIndex, componentIndex, 'background-type', wallets.user.name);
  //   degenIndex += 1;
  //   // await checkNonceUpdate();
  //   await addSwapToQueue(degenIndex, componentIndex, 'car-type', wallets.user.name);
  //   degenIndex += 1;
  //   // await checkNonceUpdate();
  //   await addSwapToQueue(degenIndex, componentIndex, 'rim-type', wallets.user.name);
  //   degenIndex += 1;
  //   // await checkNonceUpdate();
  //   await addSwapToQueue(degenIndex, componentIndex, 'head-type', wallets.user.name);
  //   degenIndex += 1;
  //   componentIndex += 1;
  //   await sleep(3000);
  // }
  // for (let i = 2; i <= 21; i++) {
  //   console.log(`Starting Swap ${i} with degenIndex: ${degenIndex} and componentIndex: ${componentIndex}`);
  //   for (let j = 1; j <= swapNr / 4; j++) {
  //     // await checkNonceUpdate();
  //     await addSwapToQueue(degenIndex, componentIndex, 'background-type', wallets[`wallet${i}`].name);
  //     degenIndex += 1;
  //     // await checkNonceUpdate();
  //     await addSwapToQueue(degenIndex, componentIndex, 'car-type', wallets[`wallet${i}`].name);
  //     degenIndex += 1;
  //     // await checkNonceUpdate();
  //     await addSwapToQueue(degenIndex, componentIndex, 'rim-type', wallets[`wallet${i}`].name);
  //     degenIndex += 1;
  //     // await checkNonceUpdate();
  //     await addSwapToQueue(degenIndex, componentIndex, 'head-type', wallets[`wallet${i}`].name);
  //     degenIndex += 1;
  //     componentIndex += 1;
  //     await sleep(3000);
  //   }
  // }
  // componentIndex += 80;
  // degenIndex += 20;

  // ASSEMBLE
  //
  // await sleep(10000);
  console.log('nassemble');
  await addNAssembleToQueue(componentIndex, n, wallets.admin.name);
  componentIndex += n;
  for (let i = 2; i <= 21; i++) {
    console.log(`Starting Queue for Assemble ${i} with componentIndex: ${componentIndex}`);
    await sleep(10000);
    await addNAssembleToQueue(componentIndex, n, wallets[`wallet${i}`].name);
    componentIndex += n;
  }

  // addNAssembleToQueue;
  //   // // DISASSEMBLE
  //   // //
  //   console.log(`Starting Disassemble 1 with degenIndex: ${degenIndex}`);
  //   await sleep(10000);
  //   await addNDisassembleToQueue(degenIndex, n, wallets.user.name);
  //   degenIndex += n;
  //   for (let i = 2; i <= 21; i++) {
  //     console.log(`Starting Disassemble ${i} with degenIndex: ${degenIndex}`);
  //     await sleep(10000);
  //     await addNDisassembleToQueue(degenIndex, n, wallets[`wallet${i}`].name);
  //     degenIndex += n;
  //   }
  //   // //

  //   // // MERGE
  //   // //
  //   await sleep(10000);

  //   await addNMergeToQueue(degenIndex, 2, 'miami', wallets.user.name);
  //   degenIndex += 2;
  //   await addNMergeToQueue(degenIndex, 2, 'nyc', wallets.user.name);
  //   degenIndex += 2;
  //   for (let i = 2; i <= 21; i++) {
  //     console.log(`Starting Merging ${i} with`);
  //     await sleep(10000);
  //     await addNMergeToQueue(degenIndex, 2, 'miami', wallets[`wallet${i}`].name);
  //     degenIndex += 2;
  //     await addNMergeToQueue(degenIndex, 2, 'nyc', wallets[`wallet${i}`].name);
  //     degenIndex += 2;
  //   }
};

prefillAddToQueueThingsOut();

// await prefillWalletNFTs(wallets.wallet3.name);
// await prefillWalletNFTs(wallets.wallet4.name);
// await prefillWalletNFTs(wallets.wallet5.name);

//
//
//
// await runPrefillers();
//
//
//

// // await burnDegen(id, walletUser);
// // await popDisassembleQueue(walletUser);

// // const walletAdmin = wallets.admin.name;
// // const walletUser = 'user';
// // const wallet2 = 'wallet2';
// // const wallet3 = 'wallet3';

// let degenUrlsDisassemble = [
//   'ipfs://bafkreigsavqryiu3tnampbfeip6bryrqybq27uy6zxgozir635tztpb4ve',
//   'ipfs://bafkreidsdf4ecaoyx6kmukoown3ki5dr5smyjyb4bbfuu5hgxplnvz6uvu',
//   'ipfs://bafkreigy75l6wwn76almtkrznnskzgrpkmde7wrjsjfvr566gpnezq2vmu',
//   'ipfs://bafkreie5ztt34skvfvmkaalkzzdj6fq6247obkbtuywo63ch3vlipqdee4',
//   'ipfs://bafkreifo3cbn7qnrneuxcoqxb2i7tskz5hg6fhdrmzmoigsoc5c67tlsou',
// ];

// setWalletStoredNonce(wallets.wallet2.name, await getAccountNonce(wallets[wallets.wallet2.name][network]));
// setWalletStoredNonce(wallets.wallet3.name, await getAccountNonce(wallets[wallets.wallet3.name][network]));
// setWalletStoredNonce(wallets.admin.name, await getAccountNonce(wallets[wallets.admin.name][network]));

// await mintNMiami(23, wallets.user.name);
// // await addNMergeToQueue(1, 5, 'miami', walletUser);
// // await mintNNYC(23, wallet2);
// // await addNMergeToQueue(1, 5, 'nyc', wallet2);
// // await sleep(100);

// console.log('FIRST LINE', getWalletStoredNonce(wallets.wallet2.name));

// // console.log('\n START MINT NYC');
// await mintNNYC(23, wallets.wallet2.name);
// // await addNMergeToQueue(24, 5, 'nyc', wallet3);
// // console.log('\n END MINT NYC');

// let componentSet1 = {
//   Background: 'Sunset',
//   Car: 'BentleyGrey',
//   Rims: 'SportyPearlescent',
//   Head: 'Miami_Party_Sunglasses',
// };
// // console.log('\n START MINT DEGENS');

// await mintNDegens(degenUrlsDisassemble, 5, wallets.wallet2.name);

// // console.log('\n END MINT DEGENS');

// // await mintComponentSet(componentSet1, wallet2);
// // console.log('\n START MINT COMPONENTS');

// await mintNComponentSets(componentSet1, 5, wallets.wallet3.name);

// // console.log('\n END MINT COMPONENTS');
