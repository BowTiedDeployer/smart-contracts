import {
  broadcastTransaction,
  cvToJSON,
  hexToCV,
  makeContractCall,
  PostConditionMode,
  standardPrincipalCV,
  stringAsciiCV,
  uintCV,
} from '@stacks/transactions';
import { contracts, network, urlApis } from './consts.js';

import dotenv from 'dotenv';
dotenv.config();

// format: "{'keyA':'valueA', 'keyB':'valueB', keyC':'valueC'}",
export const stringToMap = (text) => {
  text = text.slice(1, -1);
  let mapConverted = {};
  text.split(',').forEach((keyValue) => {
    const splitted = keyValue.split(':');
    mapConverted[splitted[0].split("'")[1]] = splitted[1];
  });
  return mapConverted;
};

export const intToHexString = (number) => {
  return number.toString(16).padStart(8 * 2, '0');
};

const convertIntToArgReadOnly = (number) => {
  return '010000000000000000' + intToHexString(number);
};

const convertStringToArgReadOnly = (str) => {
  // TODO: convvert string to arg CV style
  return str;
};

const convertPrincipalToArgReadOnly = (principal) => {
  // TODO: convvert string to arg CV style
  return isPrincipal(principal);
};

const isPrincipal = (str) => {
  let secondChar = 'P';
  if (network !== 'mainnet') secondChar = 'T';
  if (str.charAt(0) === 'S' && str.charAt(1) === secondChar && str.length >= 39 && str.length <= 41) {
    return true;
  }
  return false;
};

export const convertArgsReadOnly = (args) => {
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

export const jsonResponseToTokenUri = (json) => {
  return json.value.value.value;
};

export const convertArgsSCCall = (args) => {
  let convArgs = [];
  args.forEach((arg) => {
    if (!isNaN(arg)) {
      // number
      convArgs.push(uintCV(arg));
      console.log('is number: ' + arg);
    } else if (isPrincipal(arg)) {
      console.log('is principal ' + arg);
      convArgs.push(standardPrincipalCV(arg));
    } else {
      console.log('is string ' + arg);
      convArgs.push(stringAsciiCV(arg));
    }
  });
  return convArgs;
};

export const replaceTokenCurrentId = (pinataUrl,currentId)=>{
  let returnedUrl=pinataUrl.replace('$TOKEN_ID',currentId);
  return returnedUrl;
}

export const pinataToHTTPUrl = (pinataUrl) => {
    let httpUrl = 'https://stxnft.mypinata.cloud/' + pinataUrl.slice(0, 4) + pinataUrl.slice(6);
    return httpUrl;
};
