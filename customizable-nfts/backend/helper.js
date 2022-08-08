import { standardPrincipalCV, cvToHex } from '@stacks/transactions';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import { network, coreApiUrl, urlApis } from './consts.js';
let networkN =
  network === 'mainnet' ? new StacksMocknet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

export const intToHexString = (number) => {
  return number.toString(16).padStart(8 * 2, '0');
};

// todo: invalid json response body at http://localhost:3999/v2/contracts/call-read/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM/degens/get-token-uri reason: Unexpected end of JSON input | invalid address
export async function readOnlyFromSC(userAddress, contractAddress, contractName, functionName, idArg) {
  // https://stacks-node-api.mainnet.stacks.co/v2/contracts/call-read/SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ/nyc-degens/get-owner
  // https://stacks-node-api.mainnet.stacks.co/v2/contracts/call-read/{contract_address}/{contract_name}/{function_name}

  let address = userAddress;
  let id = '010000000000000000' + intToHexString(idArg); //idArg.toString(16);
  console.log('id', id);
  try {
    console.log(address);
    address = cvToHex(standardPrincipalCV(address));
    console.log(address);
    const url = `${coreApiUrl[network]}${urlApis.readOnly(contractAddress, contractName, functionName)}`;
    console.log('url', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: userAddress, // todo: check this
        network: networkN,
        arguments: [id],
      }),
    });
    const data = await res;
    console.log(await data.json());
  } catch (error) {
    console.log(error.message, '| invalid address');
  }
}

// "@stacks/transactions": "^3.3.0",
// "axios": "^0.27.2",
// "bn.js": "^5.2.1",

// readOnlyFromSC(
//   'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
//   'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
//   'degens',
//   'get-token-uri',
//   1
// );

// mainnet
// readOnlyFromSC(
//   'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ',
//   'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ',
//   'nyc-degens',
//   'get-token-uri',
//   1
// );


// helper functions
export const maxStacksTxFee = 750000;

export const getFeev2 = async (estimated_len, transaction_payload) => {
  try {
    let reqobj = {
      estimated_len,
      transaction_payload,
    };
    const url = `${coreApiUrl[network]}/v2/fees/transaction`;
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
  const url = `${coreApiUrl[network]}/extended/v1/address/${queryAddress}/nonces?unanchored=true`;
  const accountUrl = `${coreApiUrl[network]}/v2/accounts/${queryAddress}`;
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

