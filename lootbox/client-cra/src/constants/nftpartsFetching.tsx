import { apiMapping } from './apiUrl';
import { ContractName, contractsNFT } from './contract';
import { network } from './network';

export const getIDsNFTsOwned = (NFTPartsJson: any) => {
  let ids: Array<string> = [];
  if (NFTPartsJson.results)
    NFTPartsJson.results.forEach((x: any) => {
      // TODO: update type
      if (x.value.repr.substring(1).toString() != '') ids.push(x.value.repr.substring(1).toString());
    });
  return ids;
};

export const fetchAllNftsOwned = async (accountAddress: string, nftPart: ContractName) => {
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
