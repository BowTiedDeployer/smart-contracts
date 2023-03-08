const {
  cvToHex,
  cvToJSON,
  hexToCV,
  standardPrincipalCV,
  stringAsciiCV,
  uintCV,
  listCV,
} = require('@stacks/transactions');

const network = 'mainnet';
const coreApiUrl = {
  mainnet: 'https://stacks-node-api.mainnet.stacks.co',
  testnet: 'https://stacks-node-api.testnet.stacks.co',
  mocknet: 'http://localhost:3999',
};

const contractBitcoinDegens = {
  mainnet: {
    contractAddress: 'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ',
    contractName: 'bitcoin-degens',
    functionName: 'get-nft-name',
    functionBatchName: 'get-batch-nft-name',
    userAddress: '',
  },
  testnet: {
    contractAddress: 'ST1HW9QWHEQ7PZYQGGKJ8FRWBF6VAG7V885WYH3TQ',
    contractName: 'bitcoin-degens-test-price-4',
    functionName: 'get-nft-name',
    functionBatchName: 'get-batch-nft-name',
    userAddress: 'STPFGWKX2XVJF82CCR7ZR5C8PEQPVSJA410P1X0F',
  },
  mocknet: {
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'bitcoin-degens',
    functionName: 'get-nft-name',
    functionBatchName: 'get-batch-nft-name',
    userAddress: '',
  },
};

const urlApis = {
  readOnly: (network, contractAddress, contractName, functionName) =>
    `${coreApiUrl[network]}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
};

const convertIntToArgReadOnly = (number) => {
  return cvToHex(uintCV(number));
};

const convertStringToArgReadOnly = (str) => {
  return cvToHex(stringAsciiCV(str));
};

const convertPrincipalToArgReadOnly = (principal) => {
  return cvToHex(standardPrincipalCV(principal));
};

const convertIntListForBlockchainCall = (intList) => {
  let uintList = [];
  intList.forEach((x) => {
    uintList.push(uintCV(x));
  });
  return uintList;
};

const convertUintListToHex = (uintList) => {
  return cvToHex(listCV(uintList));
};

const isPrincipal = (str) => {
  let secondChar = 'P';
  str = str.toString();
  if (network !== 'mainnet') secondChar = 'T';
  if (str.charAt(0) === 'S' && str.charAt(1) === secondChar && str.length >= 39 && str.length <= 41) {
    return true;
  }
  return false;
};

const convertArgsReadOnly = (args) => {
  let convertedArgs = [];
  args.forEach((x) => {
    if (!isNaN(x)) {
      // number
      convertedArgs.push(convertIntToArgReadOnly(x));
    } else if (isPrincipal(x)) {
      convertedArgs.push(convertPrincipalToArgReadOnly(x));
    } else convertedArgs.push(convertStringToArgReadOnly(x));
  });
  return convertedArgs;
};

async function readOnlySCJsonResponse(networkInstance, userAddress, contractAddress, contractName, functionName, args) {
  const convertedArgs =
    // convertArgsReadOnly(
    args;
  // );
  try {
    const url = urlApis.readOnly(network, contractAddress, contractName, functionName);
    const res = await fetch(url, {
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

const getAttributesMapTraitValue = (json) => {
  let attr = {};
  for (const attribute of json.attributes) {
    attr[attribute.trait_type] = attribute.value;
  }
  return attr;
};

const createJsonAttributes = (attributes) => {
  let attributesList = [
    { trait_type: 'Background', value: attributes.Background },
    { trait_type: 'Car', value: attributes.Car },
    { trait_type: 'Rims', value: attributes.Rims },
    { trait_type: 'Type', value: attributes.Type },
    { trait_type: 'Head', value: attributes.Head },
    { trait_type: 'Face', value: attributes.Face },
  ];

  let jsonAttributes = '';
  for (const attribute of attributesList) {
    jsonAttributes += `
    {
      "trait_type": "${attribute.trait_type}",
      "value": "${attribute.value}"
    },`;
  }

  // removes last trailling comma for complience with JSON standard
  return jsonAttributes.slice(0, -1);
};

const jsonContentCreate = (degen) => {
  const name = degen.name;
  const image = degen.image;
  const imageInGame = degen.properties.image_game;
  const attributes = getAttributesMapTraitValue(degen);
  const jsonAttributes = createJsonAttributes(attributes);

  let properties = '';
  if (imageInGame != '') properties += `"image_game": "${imageInGame}",`;

  let metadata = `{
  "sip": 16,
  "name": "${name}",
  "image": "${image}",
  "attributes": [${jsonAttributes}
  ],
  "properties": {
    ${properties}
    "collection": "BitcoinDegens"
  }
}
`;
  return metadata;
};

const appendToCsv = (id) => {};

module.exports = {
  network,
  coreApiUrl,
  contractBitcoinDegens,
  urlApis,
  convertIntListForBlockchainCall,
  convertUintListToHex,
  readOnlySCJsonResponse,
  getAttributesMapTraitValue,
  jsonContentCreate,
  appendToCsv,
};
