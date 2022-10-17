import { cvToHex, uintCV } from '@stacks/transactions';

export const intToHexString = (number: number) => {
  return cvToHex(uintCV(number));
};

export const pinataToHTTPUrl = (pinataUrl) => {
  console.log('pinata conversion', pinataUrl);
  let httpUrl = 'https://stxnft.mypinata.cloud/' + pinataUrl.slice(0, 4) + pinataUrl.slice(6);
  return httpUrl;
};

export const oldToNewHeadType = (type) => {
  if (type == 'Skull') return 'Miami';
  else if (type == 'Alien') return 'NYC';
  else return type;
};
