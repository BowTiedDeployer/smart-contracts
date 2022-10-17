import { intToHexString } from './convert.tsx';
import { apiMapping } from './apiUrl.tsx';
import { network } from './network.tsx';
import { cvToHex, cvToJSON, hexToCV, stringAsciiCV } from '@stacks/transactions';
import { stringCV } from '@stacks/transactions/dist/clarity/types/stringCV';

export const fetchReadOnlyNFTPartsTokenUri = async (
  userAddress,
  contractAddress,
  contractName,
  functionName,
  NFTPartId,
  NFTPart
) => {
  let id = parseInt(NFTPartId);
  console.log('id', id);
  id = intToHexString(id);
  console.log('intToHexString(id)', intToHexString(id));
  try {
    const url = apiMapping.readOnly(network, contractAddress, contractName, functionName);
    console.log(url);
    const tokenUriNFT = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: userAddress,
        network: network,
        arguments: [id],
      }),
    })
      .then((res) => res.json())
      .then((res2) => cvToJSON(hexToCV(res2.result)))
      .then((res3) => {
        if (functionName == 'is-openable') return res3.value.value;
        return res3.value.value.value;
      });
    return tokenUriNFT;
  } catch (error) {
    console.log(`ERROR Read Only: ${error}`);
  }
};

export const fetchReadOnlyNFTPartsNameUrl = async (
  userAddress,
  contractAddress,
  contractName,
  functionName,
  nftPartName,
  nftPart
) => {
  let nftPartNameArg = cvToHex(stringCV(nftPartName, 'ascii'));
  try {
    const url = apiMapping.readOnly(network, contractAddress, contractName, functionName);

    const tokenUriNFT = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: userAddress, // todo: check this
        network: network,
        arguments: [nftPartNameArg],
      }),
    })
      .then((res) => res.json())
      .then((res2) => cvToJSON(hexToCV(res2.result)))
      .then((res3) => res3.value.value.value);
    console.log('nameUrlNFT', tokenUriNFT);
    return tokenUriNFT;
  } catch (error) {
    console.log(`ERROR Read Only: ${error}`);
  }
};
