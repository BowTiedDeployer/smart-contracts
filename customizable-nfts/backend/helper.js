import pkg from '@stacks/transactions';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';

const { standardPrincipalCV, intToHexString, cvToHex } = pkg;

let network = new StacksMainnet();

async function readOnlyFromSC(userAddress, contractAddress, contractName, functionName, args) {
  // https://stacks-node-api.mainnet.stacks.co/v2/contracts/call-read/SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ/nyc-degens/get-owner
  // https://stacks-node-api.mainnet.stacks.co/v2/contracts/call-read/{contract_address}/{contract_name}/{function_name}
  const coreApiUrl = 'https://stacks-node-api.mainnet.stacks.co';
  let address = userAddress;
  let id = '010000000000000000' + pkg.intToHexString(args)
  try {
    address = pkg.cvToHex(pkg.standardPrincipalCV(address)); 
    const url = `${coreApiUrl}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`;
    const res = await fetch( url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender:user,
        network: network,
        arguments: [id]
    }),
  });
  const data = await res.json();
  console.log(data);
  }
  catch (error) {
    console.log(error.message, '| invalid address');
  }
}

function convertArgumentsForSCReadOnlyCall(args) {
  return args;
}


// "@stacks/transactions": "^3.3.0",
// "axios": "^0.27.2",
// "bn.js": "^5.2.1",

readOnlyFromSC('SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ', 'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ', 'nyc-degens', 'get-owner', 1)

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
