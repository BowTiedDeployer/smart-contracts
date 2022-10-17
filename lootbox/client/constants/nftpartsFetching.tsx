//import { ITypeNFTPart } from '../components/garage/assemble/DegenAssembleComponent';
//import { getReadOnlyNFTPartsTokenUri } from '../game-engine/nft-parts-utils/fetchReadOnly';
import { apiMapping } from './apiUrl.tsx';
import { contractsNFT } from './contract.tsx';
import { pinataToHTTPUrl } from './convert.tsx';
import { fetchReadOnlyNFTPartsTokenUri } from './fetchReadOnly.tsx';
import { network } from './network.tsx';

// export function Get(yourUrl: any) {
//   var Httpreq = new XMLHttpRequest(); // a new request
//   Httpreq.open('GET', yourUrl, false);
//   Httpreq.send(null);
//   return Httpreq.responseText;
// }

export const getIDsNFTsOwned = (NFTPartsJson) => {
  let ids = [];
  if (NFTPartsJson.results)
    NFTPartsJson.results.forEach((x) => {
      if (x.value.repr.substring(1).toString() != '') ids.push(x.value.repr.substring(1).toString());
    });
  return ids;
};
// export const returnAllNftsOwned = (accountAddress: any, assetIdentifierCollection: any, nftPart: ITypeNFTPart) => {
//   const limit: number = 50;
//   let offsetNftParts: number = 0;

//   let urlNftParts: string = apiMapping.holdings(
//     network,
//     accountAddress,
//     contractsNFT[network][nftPart].toString(),
//     offsetNftParts
//   );
//   let nftParts = JSON.parse(Get(urlNftParts));
//   let listOfNfts: string[] = [];
//   listOfNfts = getIDsNFTsOwned(nftParts);
//   const total: number = nftParts.total;
//   offsetNftParts += limit;

//   while (offsetNftParts < total) {
//     const offsetNftPartsUrl: string = `&&offset=${offsetNftParts}`;
//     urlNftParts = urlNftParts + offsetNftPartsUrl;
//     nftParts = JSON.parse(Get(urlNftParts));
//     listOfNfts = listOfNfts.concat(getIDsNFTsOwned(nftParts));
//     offsetNftParts += limit;
//   }
//   return listOfNfts;
// };

export const fetchAllNftsOwned = async (accountAddress, nftPart) => {
  const limit = 50;
  let offsetNftParts = 0;
  console.log(network);
  let urlNftParts = apiMapping.holdings(network, accountAddress, contractsNFT[network][nftPart], offsetNftParts);
  console.log('contractsNFT', contractsNFT);
  let nftParts = await fetch(urlNftParts)
    .then((res) => res.json())
    .then((nftParts) => {
      return nftParts;
    });

  let listOfNfts: string[] = [];
  listOfNfts = getIDsNFTsOwned(await nftParts);
  const total = nftParts.total;
  console.log('total', total);
  offsetNftParts += limit;

  while (offsetNftParts < total) {
    const offsetNftPartsUrl = `&&offset=${offsetNftParts}`;
    urlNftParts = urlNftParts + offsetNftPartsUrl;
    nftParts = await fetch(urlNftParts)
      .then((res) => res.json())
      .then((nftParts) => {
        return nftParts;
      });
    listOfNfts = listOfNfts.concat(getIDsNFTsOwned(await nftParts));
    offsetNftParts += limit;
  }
  console.log(listOfNfts, listOfNfts.toString());
  return listOfNfts;
};

// export const getNftFromJSON = async (jsonSrc: string) => {
//   const response = (await fetch(jsonSrc)).toString();
//   return JSON.parse(response);
// };
// export const getForEachId = (accountAddress, nftPartsOwned, nftPart) => {
//   let localMapNftPartsOwned = {
//     background: {},
//     car: {},
//     head: {},
//     rims: {},
//     degen: {},
//     miamiDegens: {},
//     nycDegens: {},
//   };
//   for (let i = 0; i < nftPartsOwned.length; i++) {
//     const element = nftPartsOwned[i];
//     const degenImgSrc = fetchReadOnlyNFTPartsTokenUri(
//       accountAddress,
//       contractsNFT[network][nftPart].split('.')[0],
//       contractsNFT[network][nftPart].split('.')[1].split(':')[0],
//       `get-token-uri`,
//       element,
//       nftPart
//     );
//     const jsonUrl = degenImgSrc;
//     const jsonResponse = getNftFromJSON(pinataToHTTPUrl(jsonUrl));
//     const localNftPartImageURL = jsonResponse.image;
//     const localNftPartName = jsonResponse.name;
//     if (nftPart == 'background' || nftPart == 'car' || nftPart == 'head' || nftPart == 'rims') {
//       const localNftPartImageComponent = jsonResponse.properties.image_component;
//       localMapNftPartsOwned[nftPart][element] = {
//         name: localNftPartName,
//         imgSrc: localNftPartImageURL,
//         imgComponentSrc: localNftPartImageComponent,
//       };
//     } else {
//       localMapNftPartsOwned[nftPart][element] = { name: localNftPartName, imgSrc: localNftPartImageURL };
//     }
//   }
//   return localMapNftPartsOwned[nftPart];
// };
