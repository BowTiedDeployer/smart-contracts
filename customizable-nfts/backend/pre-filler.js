import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import { getWalletStoredNonce, globalNonce, setWalletStoredNonce } from './variables.js';
import { callSCFunctionWallet, sleep, callSCFunction } from './helper_sc.js';

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

export const popDisassembleQueue = async (walletAddress, nonce) => {
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'pop-disassemble-work-queue-public',
    [],
    walletAddress,
    nonce
  );
};

export const mintDegen = async (url, walletAddress, nonce) => {
  await callSCFunction(
    networkN,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'mint-uri',
    [wallets[walletAddress][network], url],
    nonce
  );
};

export const burnDegen = async (id, walletAddress, nonce) => {
  await callSCFunctionWallet(
    networkN,
    contracts[network].degens.split('.')[0],
    contracts[network].degens.split('.')[1],
    'burn-token',
    [id],
    walletAddress,
    nonce
  );
};

export const mintMiami = async (walletAddress, nonce) => {
  await callSCFunctionWallet(
    networkN,
    contracts[network].miami.split('.')[0],
    contracts[network].miami.split('.')[1],
    'claim',
    [],
    walletAddress,
    nonce
  );
};

export const mintNYC = async (walletAddress, nonce) => {
  await callSCFunctionWallet(
    networkN,
    contracts[network].nyc.split('.')[0],
    contracts[network].nyc.split('.')[1],
    'claim',
    [],
    walletAddress,
    nonce
  );
};

// for components
export const mintBackground = async (name, walletAddress, nonce) => {
  await callSCFunction(
    networkN,
    contracts[network].backgrounds.split('.')[0],
    contracts[network].backgrounds.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name],
    nonce
  );
};

export const mintCar = async (name, walletAddress, nonce) => {
  console.log('car', name);
  await callSCFunction(
    networkN,
    contracts[network].cars.split('.')[0],
    contracts[network].cars.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name],
    nonce
  );
};

export const mintHead = async (name, walletAddress, nonce) => {
  console.log('head', name);
  await callSCFunction(
    networkN,
    contracts[network].heads.split('.')[0],
    contracts[network].heads.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name],
    nonce
  );
};

export const mintRims = async (name, walletAddress, nonce) => {
  await callSCFunction(
    networkN,
    contracts[network].rims.split('.')[0],
    contracts[network].rims.split('.')[1],
    'mint-name',
    [wallets[walletAddress][network], name],
    nonce
  );
};

//for queues
export const addDisassembleToQueue = async (degenId, walletAddress, nonce) => {
  // call add-work-disassemble
  // manual value
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-disassemble-work-in-queue',
    [degenId],
    walletAddress,
    nonce
  );
};

// (background-id uint) (car-id uint) (rim-id uint) (head-id uint))
export const addAssembleToQueue = async (backgroundId, carId, rimId, headId, walletAddress, nonce) => {
  // call add-work-assemble
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-assemble-work-in-queue',
    [backgroundId, carId, rimId, headId],
    walletAddress,
    nonce
  );
};

// (degen-id uint) (component-id uint) (component-type (string-ascii 30)
export const addSwapToQueue = async (degenId, componentId, componentType, walletAddress, nonce) => {
  // call add-work-assemble
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-swap-work-in-queue',
    [degenId, componentId, componentType],
    walletAddress,
    nonce
  );
};

export const addMergeToQueue = async (id, type, walletAddress, nonce) => {
  // call add-work-merge
  // manual value
  await callSCFunctionWallet(
    networkN,
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'add-merge-work-in-queue',
    [id, type],
    walletAddress,
    nonce
  );
};

// NOT applicable IRL - for multiple mints
export const mintNDegens = async (degenUrls, n, walletAddress) => {
  console.log('walletAddress', walletAddress);
  console.log(globalNonce);
  let availableNonce = getWalletStoredNonce(wallets.admin.name);
  console.log('availableNonce mintNDegens Start: ', availableNonce);
  for (let i = 0; i < n; i++) {
    await mintDegen(degenUrls[i], walletAddress, availableNonce);
    availableNonce += 1;
  }
  console.log('availableNonce mintNDegens End: ', availableNonce);
  setWalletStoredNonce(walletAddress, availableNonce);
};

export const mintNMiami = async (n, walletAddress) => {
  console.log('walletAddress', walletAddress);
  console.log(globalNonce);
  let availableNonce = getWalletStoredNonce(walletAddress);
  console.log('availableNonce mintNDegens Start: ', availableNonce);
  for (let i = 0; i < n; i++) {
    // await checkNonceUpdate();
    await mintMiami(walletAddress, availableNonce);
    availableNonce += 1;
  }
  console.log('availableNonce mintNDegens End: ', availableNonce);
  setWalletStoredNonce(walletAddress, availableNonce);
};

export const mintNNYC = async (n, walletAddress) => {
  console.log('walletAddress', walletAddress);
  console.log(globalNonce);
  let availableNonce = getWalletStoredNonce(walletAddress);
  console.log('availableNonce mintNDegens Start: ', availableNonce);
  for (let i = 0; i < n; i++) {
    // await checkNonceUpdate();
    await mintNYC(walletAddress, availableNonce);
    availableNonce += 1;
  }
  console.log('availableNonce mintNDegens End: ', availableNonce);
  setWalletStoredNonce(walletAddress, availableNonce);
};

export const mintComponentSet = async (componentNames, walletAddress) => {
  let availableNonce = getWalletStoredNonce(wallets.admin.name);
  await mintBackground(componentNames.Background, walletAddress, availableNonce);
  availableNonce += 1;
  await mintCar(componentNames.Car, walletAddress, availableNonce);
  availableNonce += 1;
  await mintRims(componentNames.Rims, walletAddress, availableNonce);
  availableNonce += 1;
  await mintHead(componentNames.Head, walletAddress, availableNonce);
  availableNonce += 1;
  setWalletStoredNonce(wallets.admin.name, availableNonce);
};

export const mintNComponentSets = async (componentNames, n, walletAddress) => {
  let availableNonce = getWalletStoredNonce(wallets.admin.name);
  console.log('AVAILABLE NONCE: ' + availableNonce);
  for (let i = 0; i < n; i++) {
    // await mintComponentSet(componentNames, walletAddress);
    await mintBackground(componentNames.Background, walletAddress, availableNonce);
    availableNonce += 1;
    await mintCar(componentNames.Car, walletAddress, availableNonce);
    availableNonce += 1;
    await mintRims(componentNames.Rims, walletAddress, availableNonce);
    availableNonce += 1;
    await mintHead(componentNames.Head, walletAddress, availableNonce);
    availableNonce += 1;
  }
  setWalletStoredNonce(wallets.admin.name, availableNonce);
};

const componentMintCall = {
  background: mintBackground,
  car: mintBackground,
  rims: mintRims,
  head: mintHead,
};

export const mintComponentsListNames = async (componentNames, walletAddress, type) => {
  let availableNonce = getWalletStoredNonce(wallets.admin.name);
  // for (const component of componentNames) {
  //   await componentMintCall[type](component, walletAddress, availableNonce);
  //   availableNonce += 1;
  // }
  console.log('TYPE: ', type);
  if (type === 'background')
    for (const component of componentNames) {
      await mintBackground(component, walletAddress, availableNonce);
      availableNonce += 1;
    }
  else if (type === 'car')
    for (const component of componentNames) {
      await mintCar(component, walletAddress, availableNonce);
      availableNonce += 1;
    }
  else if (type === 'rims')
    for (const component of componentNames) {
      await mintRims(component, walletAddress, availableNonce);
      availableNonce += 1;
    }
  else if (type === 'head')
    for (const component of componentNames) {
      await mintHead(component, walletAddress, availableNonce);
      availableNonce += 1;
    }
  setWalletStoredNonce(wallets.admin.name, availableNonce);
};

// assemble n component sets starting from component-id start to component-id start+n-1
export const addNAssembleToQueue = async (start, n, walletAddress) => {
  let availableNonce = getWalletStoredNonce(walletAddress);
  for (let i = start; i < start + n; i++) {
    await addAssembleToQueue(i, i, i, i, walletAddress, availableNonce);
    availableNonce += 1;
  }
  setWalletStoredNonce(walletAddress, availableNonce);
};

// disassemble n degens starting from degen-id start to degen-id start+n-1
export const addNDisassembleToQueue = async (start, n, walletAddress) => {
  let availableNonce = getWalletStoredNonce(walletAddress);
  for (let i = start; i < start + n; i++) {
    await addDisassembleToQueue(i, walletAddress, availableNonce);
    availableNonce += 1;
  }
  setWalletStoredNonce(walletAddress, availableNonce);
};

export const addNMergeToQueue = async (start, n, type, walletAddress) => {
  let availableNonce = getWalletStoredNonce(walletAddress);
  for (let i = start; i < start + n; i++) {
    // await checkNonceUpdate();
    await addMergeToQueue(i, type, walletAddress, availableNonce);
  }
  setWalletStoredNonce(walletAddress, availableNonce);
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

  console.log('Going to sleep');

  await sleep(1000);
  //  new Promise((r) => setTimeout(r, 2000));

  console.log('Going to asemble');
  await addNAssembleToQueue(start, n, walletAddress);
};

const prefillNDisassemble = async (degenUrls, start, n, walletAddress) => {
  await mintNDegens(degenUrls, n, walletAddress);
  await addNDisassembleToQueue(start, n, walletAddress);
};

const prefillNSwap = async (degenUrls, componentNames, n, walletAddress) => {
  await mintNDegens(degenUrls, n, walletAddress);
  await mintNComponentSets(componentNames, n / 4, walletAddress);

  let availableNonce = getWalletStoredNonce(walletAddress);
  if (availableNonce < 1) availableNonce = 1;
  let componentId = 1;
  let degenId = 1;
  for (let i = 1; i <= n / 4; i++) {
    // await checkNonceUpdate();
    await addSwapToQueue(degenId, componentId, 'background-type', walletAddress, availableNonce);
    degenId += 1;
    availableNonce += 1;
    // await checkNonceUpdate();
    await addSwapToQueue(degenId, componentId, 'car-type', walletAddress, availableNonce);
    degenId += 1;
    availableNonce += 1;
    // await checkNonceUpdate();
    await addSwapToQueue(degenId, componentId, 'rim-type', walletAddress, availableNonce);
    degenId += 1;
    availableNonce += 1;
    // await checkNonceUpdate();
    await addSwapToQueue(degenId, componentId, 'head-type', walletAddress, availableNonce);
    degenId += 1;
    availableNonce += 1;
    componentId += 1;
  }
};

const prefillNMerge = async (type, start, n, walletAddress) => {
  if (type === 'miami') {
    await mintNMiami(n, walletAddress);
    await addNMergeToQueue(start, n, 'miami', walletAddress);
  } else if (type === 'nyc') {
    await mintNNYC(n, walletAddress);
    await addNMergeToQueue(start, n, 'nyc', walletAddress);
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

  // max 25 tx per block, else server call throws error

  // SWAP
  //
  const swapNr = 4;
  await prefillNSwap(degenUrlsSwap, componentSet2, swapNr, wallets.user.name); // %4 == 0
  start += swapNr / 4;

  // ASSEMBLE
  //
  await sleep(20000);
  await prefillNAssemble(componentSet1, start, n, wallets.user.name); // /4 + 1
  await sleep(20000);
  await prefillNAssemble(componentSet2, n + start, n, wallets.wallet2.name);
  await sleep(20000);
  await prefillNAssemble(componentSet3, 2 * n + start, n, wallets.wallet3.name);
  await sleep(20000);
  await prefillNAssemble(componentSet3, 3 * n + start, n, wallets.wallet4.name);
  await sleep(20000);
  await prefillNAssemble(componentSet3, 4 * n + start, n, wallets.wallet5.name);
  await sleep(20000);
  await prefillNAssemble(componentSet3, 3 * n + start, n, wallets.wallet6.name);
  await sleep(20000);
  await prefillNAssemble(componentSet3, 4 * n + start, n, wallets.wallet7.name);
  await sleep(20000);
  await prefillNAssemble(componentSet3, 3 * n + start, n, wallets.wallet8.name);
  await sleep(20000);
  await prefillNAssemble(componentSet3, 4 * n + start, n, wallets.wallet9.name);
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
  await prefillNDisassemble(degenUrlsDisassemble, n + start, n, wallets.user.name);

  // MERGE
  //
  // prefillNMerge('miami', 1, 6, walletUser);
  // prefillNMerge('nyc', 1, 6, walletUser);
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

// await prefillWalletNFTs(wallets.user.name);

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

await mintNMiami(23, wallets.user.name);
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
