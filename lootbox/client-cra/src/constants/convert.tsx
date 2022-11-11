import { cvToHex, uintCV } from '@stacks/transactions';

export const intToHexString = (number: number) => {
  return cvToHex(uintCV(number));
};

export const pinataToHTTPUrl = (pinataUrl: string) => {
  let httpUrl = 'https://stxnft.mypinata.cloud/' + pinataUrl.slice(0, 4) + pinataUrl.slice(6);
  return httpUrl;
};
