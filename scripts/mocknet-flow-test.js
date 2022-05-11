// will test the mocknet calling the contract functions in different blocks
// write code to do so by calling them with time difference 30 secs - 1 min

// install stx cli run "npm install @stacks/cli -g"
// generate a testnet account: stx make_keychain -t
// fund the testnet account from faucet: stx faucet ST2E4BNXY56QFKDR1RZAKV1A1VRQHT05CZ9WQNZ2

// install requirements for this script: npm i @stacks/transactions @stacks/network bn.js axios
import {
  stringAsciiCV,
  uintCV,
  tupleCV,
  listCV,
  contractPrincipalCV,
  AnchorMode,
  FungibleConditionCode,
  standardPrincipalCV,
  PostConditionMode,
  broadcastTransaction,
  makeContractCall,
  makeContractSTXPostCondition,
  estimateContractFunctionCall,
  callReadOnlyFunction,
  addressToString,
  addressFromVersionHash,
  serializeCV,
  cvToJSON,
  hexToCV,
} from '@stacks/transactions';
import { serializePayload } from '@stacks/transactions/dist/payload.js';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import BigNum from 'bn.js';
import axios from 'axios';

// set network/coreApiUrl depending on which network the script is run
let network = new StacksMocknet();
let coreApiUrl = 'http://localhost:3999'; //'https://stacks-node-api.testnet.stacks.co';
// let network = new StacksMainnet();
// let coreApiUrl = 'https://stacks-node-api.mainnet.stacks.co';

// const contractAddress = 'ST2507VNQZC9VBXM7X7KB4SF4QJDJRSWHG6ERHWB7.trustless-rewards';
const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.trustless-rewards';
const ownerAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const ownerPrivateKey = '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601';
const maxStacksTxFee = 750000;

async function createLobby(description, price, factor, commission) {
  try {
    // (create-lobby (description (string-ascii 99)) (price uint) (factor uint) (commission uint))
    const functionArgs = [
      stringAsciiCV(description),
      uintCV(price), // in millistx
      uintCV(factor),
      uintCV(commission),
    ];

    const latestNonce = await getAccountNonce(ownerAddress);

    let txOptions = {
      contractAddress: contractAddress.split('.')[0],
      contractName: contractAddress.split('.')[1],
      functionName: 'create-tournament',
      functionArgs: functionArgs,
      senderKey: ownerPrivateKey,
      // validateWithAbi: true,
      network: network,
      // postConditions,
      postConditionMode: PostConditionMode.Allow,
      // anchorMode: AnchorMode.Any,
      fee: new BigNum(100000),
      nonce: new BigNum(latestNonce),
    };

    // calculate fee
    let transaction = await makeContractCall(txOptions);
    const normalizedFee = await getNormalizedFee(transaction);

    // set fee
    txOptions.fee = new BigNum(normalizedFee);
    transaction = await makeContractCall(txOptions);
    // console.log('createLobby tx: ', transaction);

    const tx = await broadcastTransaction(transaction, network);
    console.log('createLobby broadcasted tx: ', tx);
  } catch (error) {
    console.log('createLobby error: ', error);
  }
}
createLobby('test lobby description', 1000000, 3, 10);

async function joinLobby(id) {
  try {
    // (join (id uint))
    const functionArgs = [uintCV(id)];

    const latestNonce = await getAccountNonce(ownerAddress);

    let txOptions = {
      contractAddress: contractAddress.split('.')[0],
      contractName: contractAddress.split('.')[1],
      functionName: 'join',
      functionArgs: functionArgs,
      senderKey: ownerPrivateKey,
      network: network,
      // postConditions,
      postConditionMode: PostConditionMode.Allow,
      fee: new BigNum(100000),
      nonce: new BigNum(latestNonce),
    };

    // calculate fee
    let transaction = await makeContractCall(txOptions);
    const normalizedFee = await getNormalizedFee(transaction);

    // set fee
    txOptions.fee = new BigNum(normalizedFee);
    transaction = await makeContractCall(txOptions);

    const tx = await broadcastTransaction(transaction, network);
    console.log('joinLobby broadcasted tx: ', tx);
  } catch (error) {
    console.log('joinLobby error: ', error);
  }
}
// joinLobby(1);

async function publishResults(resultsFromDB) {
  try {
    // publish-result-many (run-result (list 50 { lobby-id: uint, run-id: uint, address: principal, score: uint, rank: uint, rank-factor: uint, rewards: uint, rac: uint}))
    let tupleArray = [];
    for (let index = 0; index < resultsFromDB.length; index++) {
      const obj = resultsFromDB[index];

      const tupCV = tupleCV({
        'lobby-id': uintCV(obj['lobby-id']),
        // 'run-id': uintCV(obj['run-id']),
        address: standardPrincipalCV(obj.address),
        score: uintCV(obj.score),
        rank: uintCV(obj.rank),
        'rank-factor': uintCV(obj['rank-factor']),
        rewards: uintCV(obj.rewards),
        rac: uintCV(obj.rac),
        nft: stringAsciiCV(obj.nft),
      });
      tupleArray.push(tupCV);
    }
    // console.log('publishResults tupleArray ', tupleArray);
    const l = listCV(tupleArray);
    const functionArgs = [l];

    const latestNonce = await getAccountNonce(ownerAddress);

    let txOptions = {
      contractAddress: contractAddress.split('.')[0],
      contractName: contractAddress.split('.')[1],
      functionName: 'publish-result-many',
      functionArgs: functionArgs,
      senderKey: ownerPrivateKey,
      network: network,
      // postConditions,
      postConditionMode: PostConditionMode.Allow,
      fee: new BigNum(100000),
      nonce: new BigNum(latestNonce),
    };

    // calculate fee
    let transaction = await makeContractCall(txOptions);
    const normalizedFee = await getNormalizedFee(transaction);

    // set fee
    txOptions.fee = new BigNum(normalizedFee);
    transaction = await makeContractCall(txOptions);

    const tx = await broadcastTransaction(transaction, network);
    console.log('publishResults broadcasted tx: ', tx);
  } catch (error) {
    console.log('publishResults error: ', error);
  }
}
// sample
const resultsFromDB = [
  {
    'lobby-id': 1,
    'run-id': 1,
    address: 'ST2507VNQZC9VBXM7X7KB4SF4QJDJRSWHG6ERHWB7',
    score: 10,
    rank: 2,
    'rank-factor': 3048625,
    rewards: 2000000,
    rac: 1800000,
  },
  {
    'lobby-id': 1,
    'run-id': 2,
    address: 'ST2E4BNXY56QFKDR1RZAKV1A1VRQHT05CZ9WQNZ2',
    score: 15,
    rank: 1,
    'rank-factor': 3068625,
    rewards: 3000000,
    rac: 2700000,
  },
  {
    'lobby-id': 1,
    'run-id': 3,
    address: 'ST27SD3H5TTZXPBFXHN1ZNMFJ3HNE2070QX7ZN4FF',
    score: 5,
    rank: 3,
    'rank-factor': 2068625,
    rewards: 1000000,
    rac: 800000,
  },
];
// publishResults(resultsFromDB);

async function finishResults(resultsFromDB) {
  try {
    // finish-result-many (run-result (list 50 { lobby-id: uint, run-id: uint, address: principal, score: uint, rank: uint, rank-factor: uint, rewards: uint, rac: uint}))
    let tupleArray = [];
    for (let index = 0; index < resultsFromDB.length; index++) {
      const obj = resultsFromDB[index];

      const tupCV = tupleCV({
        'lobby-id': uintCV(obj['lobby-id']),
        'run-id': uintCV(obj['run-id']),
        address: standardPrincipalCV(obj.address),
        score: uintCV(obj.score),
        rank: uintCV(obj.rank),
        'rank-factor': uintCV(obj['rank-factor']),
        rewards: uintCV(obj.rewards),
        rac: uintCV(obj.rac),
      });
      tupleArray.push(tupCV);
    }
    console.log('publishResults tupleArray ', tupleArray);
    const l = listCV(tupleArray);
    const functionArgs = [l];

    const latestNonce = await getAccountNonce(ownerAddress);

    let txOptions = {
      contractAddress: contractAddress.split('.')[0],
      contractName: contractAddress.split('.')[1],
      functionName: 'finish-result-many',
      functionArgs: functionArgs,
      senderKey: ownerPrivateKey,
      network: network,
      // postConditions,
      postConditionMode: PostConditionMode.Allow,
      fee: new BigNum(100000),
      nonce: new BigNum(latestNonce),
    };

    // calculate fee
    let transaction = await makeContractCall(txOptions);
    const normalizedFee = await getNormalizedFee(transaction);

    // set fee
    txOptions.fee = new BigNum(normalizedFee);
    transaction = await makeContractCall(txOptions);

    const tx = await broadcastTransaction(transaction, network);
    console.log('finishResults broadcasted tx: ', tx);
  } catch (error) {
    console.log('finishResults error: ', error);
  }
}
// sample
const finishResultsFromDB = [
  {
    'lobby-id': 1,
    'run-id': 1,
    address: 'ST2507VNQZC9VBXM7X7KB4SF4QJDJRSWHG6ERHWB7',
    score: 10,
    rank: 2,
    'rank-factor': 3048625,
    rewards: 600000,
    rac: 500000,
  },
  // {
  //   'lobby-id': 1,
  //   'run-id': 2,
  //   address: 'ST2E4BNXY56QFKDR1RZAKV1A1VRQHT05CZ9WQNZ2',
  //   score: 15,
  //   rank: 1,
  //   'rank-factor': 3068625,
  //   rewards: 400000,
  //   rac: 300000,
  // },
  // {
  //   'lobby-id': 1,
  //   'run-id': 3,
  //   address: 'ST27SD3H5TTZXPBFXHN1ZNMFJ3HNE2070QX7ZN4FF',
  //   score: 5,
  //   rank: 3,
  //   'rank-factor': 2068625,
  //   rewards: 200000,
  //   rac: 100000,
  // }
];
// finishResults(finishResultsFromDB);

// helper functions
export const getFeev2 = async (estimated_len, transaction_payload) => {
  try {
    let reqobj = {
      estimated_len,
      transaction_payload,
    };
    const url = `${coreApiUrl}/v2/fees/transaction`;
    const response = await axios.post(url, reqobj);
    return response.data.estimations[0].fee;
  } catch (err) {
    console.log('getFeev2 err ', err.message);
    return 500000;
  }
};

export const getNormalizedFee = async (transaction) => {
  const serializedTx = transaction.serialize();
  const serializedPayload = serializePayload(transaction.payload);
  const v2fee = await getFeev2(serializedTx.byteLength, serializedPayload.toString('hex'));
  const normalizedFee = Math.min(maxStacksTxFee, Number(v2fee));
  console.log('normalizedFee ', normalizedFee);
  return normalizedFee;
};

async function getAccountNonce(queryAddress) {
  const url = `${coreApiUrl}/extended/v1/address/${queryAddress}/nonces?unanchored=true`;
  const accountUrl = `${coreApiUrl}/v2/accounts/${queryAddress}`;
  try {
    const response = await axios.get(url);
    const accresponse = await axios.get(accountUrl);
    const accountNonce = accresponse.data.nonce;
    let stacksNonce = response.data.possible_next_nonce;
    if (accountNonce > stacksNonce) stacksNonce = accountNonce;
    console.log('init stacksNonce ', queryAddress, stacksNonce, response.data);
    if (response.data.detected_missing_nonces.length > 0) {
      // set nonce to min of missing nonces
      const min = Math.min(...response.data.detected_missing_nonces);
      console.log(`found missing nonces setting to min `, min);
      stacksNonce = min;
    }
    return stacksNonce;
  } catch (e) {
    console.log(`getAccountNonce error: `, e);
    return 0;
  }
}

function getLookupKey(id) {
  const a = tupleCV({ id: uintCV(id) });
  const mapLookupKey = serializeCV(a).toString('hex');
  console.log('getLookupKey for id: ', id, mapLookupKey);
  return mapLookupKey;
  // use this key to query API to get data as below
  // curl -X POST -H 'Content-Type: application/json' -i 'https://stacks-node-api.testnet.stacks.co/v2/map_entry/STH6BVHNC1K5Z8E9G2881849262TQJYHF13TVZHB/trustless-rewards/tournaments' --data '"0x0c000000010269640100000000000000000000000000000002"'
  // convert the output to json
  // cvToJSON(hexToCV(tx.tx_result.hex));
}
// getLookupKey();
function getLookupKey2(id, address) {
  const a = tupleCV({ 'lobby-id': uintCV(id), address: standardPrincipalCV(address) });
  const mapLookupKey = serializeCV(a).toString('hex');
  console.log('getLookupKey for id: ', id, mapLookupKey);
  return mapLookupKey;
  // use this key to query API to get data as below
  // curl -X POST -H 'Content-Type: application/json' -i 'https://stacks-node-api.testnet.stacks.co/v2/map_entry/STH6BVHNC1K5Z8E9G2881849262TQJYHF13TVZHB/trustless-rewards/tournaments' --data '"0x0c000000010269640100000000000000000000000000000002"'
  // convert the output to json
  // cvToJSON(hexToCV(tx.tx_result.hex));
}

async function getMap(id) {
  const mapLookupKey = `"0x${getLookupKey(id)}"`;
  console.log('getting map with mapLookupKey: ', mapLookupKey);
  // STH6BVHNC1K5Z8E9G2881849262TQJYHF13TVZHB.trustless-rewards
  const url =
    'https://stacks-node-api.testnet.stacks.co/v2/map_entry/STH6BVHNC1K5Z8E9G2881849262TQJYHF13TVZHB/trustless-rewards/tournaments';
  // const config = {
  //   // method: "post",
  //   // url: 'https://stacks-node-api.testnet.stacks.co/v2/map_entry/STH6BVHNC1K5Z8E9G2881849262TQJYHF13TVZHB/trustless-rewards/tournaments',
  //   headers : {
  //       "Content-Type":"application/json",
  //   },
  //   data : 0x0c000000010269640100000000000000000000000000000002
  // }
  try {
    // const response = await axios.post(url, '0x0c000000010269640100000000000000000000000000000002')
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: '"0x0c000000010269640100000000000000000000000000000002"',
    });
    const content = await rawResponse.json();
    // console.log(content);

    const json = cvToJSON(hexToCV(content.data));
    console.log('map json: ', JSON.stringify(json));
  } catch (error) {
    console.log('error ', error.message);
  }
}

async function getMapEntry(id, address, mapName) {
  const mapLookupKey = address ? `"0x${getLookupKey2(id, address)}"` : `"0x${getLookupKey(id)}"`;
  console.log('getting map with mapLookupKey: ', mapLookupKey);
  // STH6BVHNC1K5Z8E9G2881849262TQJYHF13TVZHB.trustless-rewards
  const url =
    'https://stacks-node-api.testnet.stacks.co/v2/map_entry/STH6BVHNC1K5Z8E9G2881849262TQJYHF13TVZHB/trustless-rewards/' +
    mapName;
  try {
    // const response = await axios.post(url, '0x0c000000010269640100000000000000000000000000000002')
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // body: '"0x0c000000010269640100000000000000000000000000000002"'
      body: mapLookupKey,
    });
    // console.log(rawResponse);
    const content = await rawResponse.json();
    // console.log(content);

    const json = cvToJSON(hexToCV(content.data));
    console.log('map json: ', JSON.stringify(json));
  } catch (error) {
    console.log('error ', error.message);
  }
}

// getMap(2)

// new methods - both work! tested!
// getMapEntry(1, '', 'tournaments')
// getMapEntry(1, 'ST1JDHJPND8P6WCXXHXW01Q68G5RX3842XVY2GB3B', 'scoreboard')
