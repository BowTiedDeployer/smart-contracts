import { standardPrincipalCV, cvToHex } from '@stacks/transactions';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import { network, coreApiUrl, urlApis } from './consts.js';

// import { hexToCV, stringAsciiCV, uintCV } from '@stacks/transactions';
let networkN =
  network === 'mainnet' ? new StacksMocknet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

// todo: invalid json response body at http://localhost:3999/v2/contracts/call-read/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM/degens/get-token-uri reason: Unexpected end of JSON input | invalid address
async function readOnlyFromSC(userAddress, contractAddress, contractName, functionName, args) {
  // https://stacks-node-api.mainnet.stacks.co/v2/contracts/call-read/SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ/nyc-degens/get-owner
  // https://stacks-node-api.mainnet.stacks.co/v2/contracts/call-read/{contract_address}/{contract_name}/{function_name}

  let address = userAddress;
  let id = '010000000000000000' + args.toString(16);
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
        sender: address, // todo: check this
        network: networkN,
        arguments: [id],
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error.message, '| invalid address');
  }
}

function convertArgumentsForSCReadOnlyCall(args) {
  return args;
}

// "@stacks/transactions": "^3.3.0",
// "axios": "^0.27.2",
// "bn.js": "^5.2.1",

readOnlyFromSC(
  'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
  'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  'degens',
  'get-token-uri',
  1
);

async function chainJoinUserLobbyConfirmed(idLobby, userAddress) {
  let id = idLobby;
  id = '010000000000000000' + intToHexString(id);
  let address = userAddress;
  try {
    address = cvToHex(standardPrincipalCV(address));
    const contractFunction = 'get-score';
    const url = `${coreApiUrl}/v2/contracts/call-read/${contractAddress.split('.')[0]}/${
      contractAddress.split('.')[1]
    }/${contractFunction}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: wallets.owner.wallet,
        network: network,
        arguments: [id, address],
      }),
    });
    const data = await res.json();
    if (data.okay !== undefined && data.okay === false) {
      return false;
    } else if (data.okay === true) {
      // console.log(clarity.hexToValue(data.result))
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message, '| invalid address');
    return false;
  }
}
