import { cvToHex, cvToJSON, hexToCV, standardPrincipalCV, stringAsciiCV, uintCV } from '@stacks/transactions';

export const network = 'testnet';
export const coreApiUrl = {
  mainnet: 'https://muddy-clean-choice.stacks-mainnet.discover.quiknode.pro/9fbe48eca6f617ed40f285ea0b7587d2542bfb4f',
  testnet: 'https://stacks-node-api.testnet.stacks.co',
  // testnet: 'https://sparkling-aged-putty.stacks-testnet.discover.quiknode.pro/105f77e9d2aab693b59849c69305640a65ffd2fa',
  // testnet-notworking: 'https://damp-serene-dew.stacks-testnet.discover.quiknode.pro/d310070672d029b398e6314a17e73be0a6bf2595',
  mocknet: 'http://localhost:3999',
};

export const contractBitcoinDegens = {
  mainnet: {
    contractAddress: '', //TODO: complete
    contractName: 'bitcoin-degens',
    functionName: 'get-nft-name',
  },
  testnet: {
    contractAddress: 'ST26FG29A6Q187QW0QGTCKYDAYVGY1GN21XJCVABG',
    contractName: 'dolphin-apple-juice',
    functionName: 'get-nft-name',
  },
  mocknet: {
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'bitcoin-degens',
    functionName: 'get-nft-name',
  },
};

export const urlApis = {
  readOnly: (network, contractAddress, contractName, functionName) =>
    `${coreApiUrl[network]}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
};

const convertIntToArgReadOnly = (number) => {
  return cvToHex(uintCV(number));
};

const convertStringToArgReadOnly = (str) => {
  return cvToHex(stringCV(str, 'ascii'));
};

const convertPrincipalToArgReadOnly = (principal) => {
  return cvToHex(principalCV(principal));
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

export async function readOnlySCJsonResponse(
  networkInstance,
  userAddress,
  contractAddress,
  contractName,
  functionName,
  args
) {
  const convertedArgs = convertArgsReadOnly(args);
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

export const getAttributesMapTraitValue = (json) => {
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

export const jsonContentCreate = (degen) => {
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

export const appendToCsv = (id) => {};
