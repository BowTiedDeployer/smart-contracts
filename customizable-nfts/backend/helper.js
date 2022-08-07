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
