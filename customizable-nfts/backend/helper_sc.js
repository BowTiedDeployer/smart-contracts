import {
  standardPrincipalCV,
  cvToHex,
  hexToCV,
  cvToJSON,
  PostConditionMode,
  makeContractCall,
  broadcastTransaction,
} from '@stacks/transactions';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import { network, urlApis, wallets } from './consts.js';
import { serializePayload } from '@stacks/transactions/dist/payload.js';
import BigNum from 'bn.js';
import axios from 'axios';
import { convertArgsReadOnly, convertArgsSCCall, jsonResponseToTokenUri, stringToMap } from './converters.js';

// helper functions
export const maxStacksTxFee = 750000;

export const getFeev2 = async (estimated_len, transaction_payload) => {
  try {
    let reqobj = {
      estimated_len,
      transaction_payload,
    };
    const url = urlApis.feeCalc(network);
    const response = await axios.post(url, reqobj);
    return response.data.estimations[0].fee;
  } catch (err) {
    console.log('getFeev2 err ', err.message);
    return 50000;
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

export async function getAccountNonce(queryAddress) {
  const url = urlApis.accountNonce(network, queryAddress);
  const accountUrl = urlApis.accountDetails(network, queryAddress);
  console.log(url);
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
      console.log(`found missing nonces setting to min ${min}`);
      stacksNonce = min;
    }
    return stacksNonce;
  } catch (e) {
    console.log(`getAccountNonce error: ${e}`);
    return 0;
  }
}

export async function callSCFunction(networkInstance, contractAddress, contractName, functionName, args, nonce) {
  try {
    let txOptions = {
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: functionName,
      functionArgs: convertArgsSCCall(args),
      senderKey: stringToMap(process.env.ADMIN_SECRET_KEY)[network],
      network: networkInstance,
      postConditionMode: PostConditionMode.Allow,
      fee: new BigNum(100000),
      nonce: nonce,
    };
    // calculate fee
    let transaction = await makeContractCall(txOptions);
    const normalizedFee = await getNormalizedFee(transaction);

    // set fee
    txOptions.fee = new BigNum(normalizedFee);
    transaction = await makeContractCall(txOptions);
    const tx = await broadcastTransaction(transaction, networkInstance);
    console.log(`${contractAddress}.${functionName} Admin SC public function call broadcasted tx: ${tx.txid}`);
    return tx.txid.toString();
  } catch (error) {
    console.log(`${contractAddress}.${functionName} Admin SC public function call ERROR: ${error}`);
  }
}

export function readOnlySCJsonResponse(
  networkInstance,
  userAddress,
  contractAddress,
  contractName,
  functionName,
  args
) {
  const convertedArgs = convertArgsReadOnly(args);
  // console.log(convertedArgs); // keep it before all converts are done
  try {
    const url = urlApis.readOnly(network, contractAddress, contractName, functionName);
    const res = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: userAddress,
        network: networkInstance,
        arguments: convertedArgs,
      }),
    })
      .then((res) => res.json())
      .then((res2) => cvToJSON(hexToCV(res2.result)));
    return res;
  } catch (error) {
    console.log(`ERROR Read Only: ${error.message}`);
  }
}

export async function callSCFunctionWithNonce(networkInstance, contractAddress, contractName, functionName, args) {
  try {
    const latestNonce = await getAccountNonce(wallets.admin[network]);
    return await callSCFunction(networkInstance, contractAddress, contractName, functionName, args, latestNonce);
    // await mintNameUrl(address, url, latestNonce);
  } catch (error) {
    console.log(error);
  }
}

export async function callSCFunctionWithNonceUser(networkInstance, contractAddress, contractName, functionName, args) {
  try {
    const latestNonce = await getAccountNonce(wallets.user[network]);
    await callSCFunctionUser(networkInstance, contractAddress, contractName, functionName, args, latestNonce);
    console.log('options', latestNonce, wallets.user[network], contractAddress, contractName, functionName, args);
    // await mintNameUrl(address, url, latestNonce);
  } catch (error) {
    console.log(error);
  }
}

export async function callSCFunctionUser(networkInstance, contractAddress, contractName, functionName, args, nonce) {
  try {
    let txOptions = {
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: functionName,
      functionArgs: convertArgsSCCall(args),
      senderKey: stringToMap(process.env.USER_SECRET_KEY)[network],
      network: networkInstance,
      postConditionMode: PostConditionMode.Allow,
      fee: new BigNum(100000),
      nonce: nonce,
    };
    // calculate fee
    let transaction = await makeContractCall(txOptions);
    const normalizedFee = await getNormalizedFee(transaction);

    // set fee
    txOptions.fee = new BigNum(normalizedFee);
    transaction = await makeContractCall(txOptions);
    const tx = await broadcastTransaction(transaction, networkInstance);
    console.log(`${contractAddress}.${functionName} User SC public function call broadcasted tx: ${tx.txid}`);
  } catch (error) {
    console.log(`${contractAddress}.${functionName} User SC public function call ERROR: ${error}`);
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function checkNonceUpdate(checkIt = 1, availableNonce, lastUsedNonce) {
  if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

  if (availableNonce > lastUsedNonce) return { availableNonce, lastUsedNonce };
  else {
    await sleep(checkIt * 1000);
    availableNonce = await getAccountNonce(wallets.admin.wallet);

    return await checkNonceUpdate(++checkIt, availableNonce, lastUsedNonce);
  }
}

// tx_status: "success" | "pending" | "abort_by_response"
// or "abort_by_post_conditions" - not the case
export async function chainGetTxIdStatus(txId) {
  const response = await fetch(`${urlApis.transaction(network, txId)}`);
  const contract = await response.json();
  let tx_status = contract['tx_status'];
  return tx_status;
}

export const getTokenUri = async (network, wallet, contractAddress, contractName, contractFunction, args) => {
  return await jsonResponseToTokenUri(
    await readOnlySCJsonResponse(network, wallet, contractAddress, contractName, contractFunction, args)
  );
};

export const getMempoolTransactionCount = async (address) => {
  const accountMempoolUrl = urlApis.accountMempool(network, address);
  const accountMempoolResponse = await fetch(accountMempoolUrl).then((res) => res.json());
  return accountMempoolResponse.total;
};
