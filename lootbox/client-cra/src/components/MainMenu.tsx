import { useCallback, useEffect, useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';

import {
  AnchorMode,
  callReadOnlyFunction,
  uintCV,
  cvToJSON,
  PostConditionMode,
  NonFungibleConditionCode,
  createAssetInfo,
  makeStandardNonFungiblePostCondition,
  bufferCVFromString,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  makeContractSTXPostCondition,
} from '@stacks/transactions';
import React from 'react';
import { userSession } from './ConnectWallet';
import { fetchAllNftsOwned } from '../constants/nftpartsFetching';
import { network } from '../constants/network';
import { pinataToHTTPUrl } from '../constants/convert';
import { contractsNFT } from '../constants/contract';
import { apiMapping } from '../constants/apiUrl';

type InfoNFTFields = 'id' | 'imgSrc';
type InfoNFT = Record<InfoNFTFields, string>;

// With a standard principal
const createPostConfitionLootbox = (userAddress: string, id: string) => {
  const postConditionAddress = userAddress;
  const postConditionCode = NonFungibleConditionCode.Sends;
  const assetAddress = contractsNFT[network].lootbox_background.split('.')[0];
  const assetContractName = contractsNFT[network].lootbox_background.split('.')[1].split('::')[0];
  const assetName = contractsNFT[network].lootbox_background.split('.')[1].split('::')[1];
  const tokenAssetName = uintCV(id);
  const nonFungibleAssetInfo = createAssetInfo(assetAddress, assetContractName, assetName);

  return makeStandardNonFungiblePostCondition(
    postConditionAddress,
    postConditionCode,
    nonFungibleAssetInfo,
    tokenAssetName
  );
};

const createPostConditionSTXTransfer = (userAddress: string) => {
  // With a standard principal
  const postConditionAddress = userAddress;
  const postConditionCode = FungibleConditionCode.Equal;
  const postConditionAmount = 0;

  return makeStandardSTXPostCondition(postConditionAddress, postConditionCode, postConditionAmount);
};

export const MainMenu = () => {
  const { doContractCall } = useConnect();
  const [selectedLootbox, setSelectedLootbox] = useState('');
  const [canOpenLootbox, setCanOpenLootbox] = useState(false);
  const [hasRespondedBackground, setHasRespondedBackground] = useState(false);
  const [hasRespondedLootbox, setHasRespondedLootbox] = useState(false);
  const [nftsOwnedBackground, setNftsOwnedBackground]: any[] = useState([]); // TODO: update this type
  const [lootboxesOwned, setLootboxesOwned]: any[] = useState([]); // TODO: update this type// TODO: update this type
  const userAddress = userSession.loadUserData().profile.stxAddress[network];
  const activeNetwork =
    network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

  const fetchNftsOwnedBackground = useCallback(async () => {
    let localNftsOwnedUrls: Array<Record<string, string>> = [];
    let localNftsOwnedBackground: string[] = await fetchAllNftsOwned(userAddress, 'background_item');
    console.log('localNftsOwnedBackground', localNftsOwnedBackground);
    for (let nft of localNftsOwnedBackground) {
      const options = {
        contractAddress: contractsNFT[network].background_item.split('.')[0],
        contractName: contractsNFT[network].background_item.split('.')[1].split('::')[0],
        functionName: 'get-token-uri',
        network: activeNetwork,
        functionArgs: [uintCV(nft)],
        senderAddress: userAddress,
      };
      let jsonTokenUriResponse = await callReadOnlyFunction(options);
      let jsonUrl: string = '';

      if (jsonTokenUriResponse) jsonUrl = cvToJSON(jsonTokenUriResponse).value.value.value;

      let jsonRequestResponse: any = await fetch(pinataToHTTPUrl(jsonUrl)).then((res) => res.json());
      let imgSrc: string = await jsonRequestResponse.image;
      localNftsOwnedUrls.push({ imgSrc: imgSrc, id: nft });
    }
    setHasRespondedBackground(true);
    if (localNftsOwnedUrls) {
      console.log('here are the background-items', localNftsOwnedUrls);
      setNftsOwnedBackground(localNftsOwnedUrls);
      return localNftsOwnedBackground;
    } else {
      setNftsOwnedBackground([]);
      return [];
    }
  }, [userAddress]);

  const fetchLootboxesOwned = useCallback(async () => {
    let localLootboxesOwned: string[] = await fetchAllNftsOwned(userAddress, 'lootbox_background');
    setHasRespondedLootbox(true);
    if (localLootboxesOwned) setLootboxesOwned(localLootboxesOwned);
    else setLootboxesOwned([]);
  }, [userAddress]);

  const changeSelection = (nft: string, localGarageSelectedNFT: string) => {
    document.getElementById(`nftLootbox${localGarageSelectedNFT}`)?.classList.remove('card-selected');
    document.getElementById(`nftLootbox${nft}`)?.classList.add('card-selected');
  };

  function handleClickLootbox(id: string) {
    changeSelection(id, selectedLootbox);
    console.log('clicked lootbox with id:', id);
    setSelectedLootbox(id);
    checkCanOpenLootbox(id);
  }

  function handleOpenLootbox(id: string) {
    console.log('selectedLootbox', id);

    if (canOpenLootbox)
      doContractCall({
        network: activeNetwork,
        anchorMode: AnchorMode.Any,
        contractAddress: contractsNFT[network].lootbox_background.split('.')[0],
        contractName: contractsNFT[network].lootbox_background.split('.')[1].split('::')[0],
        functionName: 'open-lootbox',
        functionArgs: [uintCV(parseInt(id))],
        postConditionMode: PostConditionMode.Deny,
        postConditions: [createPostConfitionLootbox(userAddress, id), createPostConditionSTXTransfer(userAddress)],
        onFinish: (data) => {
          console.log('onFinish:', data);
          console.log('Explorer:', apiMapping.explorerTxId(network, data.txId));
          console.log('ApiTxId:', apiMapping.apiTxId(network, data.txId));
        },
        onCancel: () => {
          console.log('onCancel:', 'Transaction was canceled');
        },
      });
  }

  const checkCanOpenLootbox = async (id: string) => {
    const options = {
      contractAddress: contractsNFT[network].lootbox_background.split('.')[0],
      contractName: contractsNFT[network].lootbox_background.split('.')[1].split('::')[0],
      functionName: 'is-openable',
      network: new StacksTestnet(),
      functionArgs: [uintCV(id)],
      senderAddress: userAddress,
    };
    let response = await callReadOnlyFunction(options);

    console.log('is openable:', cvToJSON(response).value.value);
    if (cvToJSON(response).value.value == true) setCanOpenLootbox(true);
  };

  useEffect(() => {
    fetchNftsOwnedBackground();
    fetchLootboxesOwned();
    setInterval(() => {}, 30000);
  }, [userSession.isUserSignedIn(), fetchLootboxesOwned, fetchNftsOwnedBackground]);

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div>
      <h6>{`Current user address: ${userSession.loadUserData().profile.stxAddress[network]}`}</h6>
      {!hasRespondedBackground && !hasRespondedLootbox && <h1>Loading NFTs...</h1>}
      {hasRespondedBackground && nftsOwnedBackground.length == 0 && <h1>No background NFTs available</h1>}
      {hasRespondedBackground && nftsOwnedBackground.length > 0 && (
        <div>
          <h2>Backgrounds Owned</h2>
          {nftsOwnedBackground.map((nft: InfoNFT) => (
            <span className="nftContainer" key={nft.id}>
              <img className="nftImg" src={pinataToHTTPUrl(nft.imgSrc)} width="90px" alt={`background ${nft.id}`}></img>
            </span>
          ))}
        </div>
      )}
      {hasRespondedLootbox && lootboxesOwned.length == 0 && <h1>No lootbox NFTs available</h1>}
      {hasRespondedLootbox && lootboxesOwned.length > 0 && (
        <div>
          <h2>Lootboxes</h2>
          {lootboxesOwned.map((nftLootbox: string) => (
            <span id={`nftLootbox${nftLootbox}`} key={nftLootbox} className="lootboxContainer">
              <img
                className="lootboxImg"
                src={`https://stxnft.mypinata.cloud/ipfs/QmciPXBGPDYF57QAHtoRs99ocMqEzJVvsjjmSjGCEV4qp7/${nftLootbox}.png`}
                onClick={() => handleClickLootbox(nftLootbox)}
                alt={`lootbox ${nftLootbox}`}
              ></img>
              {`Lootbox#${nftLootbox}`}
            </span>
          ))}
          <br></br>
          <button
            className="ContractCall"
            disabled={!canOpenLootbox}
            onClick={() => handleOpenLootbox(selectedLootbox)}
          >
            Open Lootbox
          </button>
        </div>
      )}
    </div>
  );
};
