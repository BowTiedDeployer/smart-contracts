import { apiMapping } from './apiUrl.tsx';
import { contractsNFT } from './contract.tsx';
import { network } from './network.tsx';

export const getIDsNFTsOwned = (NFTPartsJson) => {
  let ids = [];
  if (NFTPartsJson.results)
    NFTPartsJson.results.forEach((x) => {
      if (x.value.repr.substring(1).toString() != '') ids.push(x.value.repr.substring(1).toString());
    });
  return ids;
};

export const fetchAllNftsOwned = async (accountAddress, nftPart) => {
  const limit = 50;
  let offsetNftParts = 0;
  console.log(network);
  let urlNftParts = apiMapping.holdings(network, accountAddress, contractsNFT[network][nftPart], offsetNftParts);
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
