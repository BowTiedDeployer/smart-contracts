import { useCallback, useEffect, useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import styles from '../styles/Home.module.css';

import {
  AnchorMode,
  standardPrincipalCV,
  callReadOnlyFunction,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  uintCV,
  cvToJSON,
  NonFungibleConditionCode,
  PostConditionType,
  PostConditionMode,
} from '@stacks/transactions';
//import useInterval from 'use-interval';
import React from 'react';
import { userSession } from './ConnectWallet.tsx';
import { fetchAllNftsOwned } from '../constants/nftpartsFetching.tsx';
import { network } from '../constants/network.tsx';
import { pinataToHTTPUrl } from '../constants/convert.tsx';
import { contractsNFT } from '../constants/contract.tsx';
import { apiMapping } from '../constants/apiUrl.tsx';

const MainMenu = () => {
  const activeNetwork =
    network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();
  const { doContractCall } = useConnect();
  const [selectedLootbox, setSelectedLootbox] = useState('');
  const [canOpenLootbox, setCanOpenLootbox] = useState(false);
  const [hasRespondedBackground, setHasRespondedBackground] = useState(false);
  const [hasRespondedLootbox, setHasRespondedLootbox] = useState(false);
  const [nftsOwnedBackground, setNftsOwnedBackground] = useState([]);
  const [lootboxesOwned, setLootboxesOwned] = useState([]);
  const userAddress = userSession.loadUserData().profile.stxAddress[network];

  //TODO: Fix that.
  // const postConditionAddress = userSession.loadUserData().profile.stxAddress[network];
  // const nonFungibleConditionCode = NonFungibleConditionCode.Sends;
  // const postConditionType = PostConditionType.NonFungible;
  // const postConditionAmount = 1;

  const fetchNftsOwnedBackground = useCallback(async () => {
    let localNftsOwnedUrls: Array<Record<string, string>> = [];
    let localNftsOwnedBackground: string[] = await fetchAllNftsOwned(userAddress, 'background_item');
    console.log('localNftsOwnedBackground', localNftsOwnedBackground);
    for (let nft of localNftsOwnedBackground) {
      const options = {
        contractAddress: 'ST15DF8K1Z4XQ952AC2GFY106XRTNJSWE9SP6VZYA',
        contractName: 'background-item',
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
  }, []);
  const fetchLootboxesOwned = useCallback(async () => {
    let localLootboxesOwned: string[] = await fetchAllNftsOwned(userAddress, 'lootbox_background');
    setHasRespondedLootbox(true);
    if (localLootboxesOwned) setLootboxesOwned(localLootboxesOwned);
    else setLootboxesOwned([]);
  }, []);

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
        name: 'Open Lootbox',
        network: new StacksTestnet(),
        anchorMode: AnchorMode.Any,
        contractAddress: contractsNFT[network].lootbox_background.split('.')[0],
        contractName: contractsNFT[network].lootbox_background.split('.')[1].split('::')[0],
        functionName: 'open-lootbox',
        functionArgs: [uintCV(parseInt(id))],
        postConditionMode: PostConditionMode.Allow,
        //postConditions: [makeStandardSTXPostCondition(postConditionAddress, postConditionCode, postConditionAmount)],
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
      contractAddress: 'ST15DF8K1Z4XQ952AC2GFY106XRTNJSWE9SP6VZYA',
      contractName: 'lootbox-background',
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
    setInterval(() => {
      console.log('this will run every 10s');
    }, 30000);
    //interval;
    //return clearInterval(interval);
  }, [userSession.isUserSignedIn()]);

  if (!userSession.isUserSignedIn()) {
    return null;
  }
  return (
    <div>
      {!hasRespondedBackground && !hasRespondedLootbox && <h1>Loading NFTs...</h1>}
      {hasRespondedBackground && nftsOwnedBackground.length == 0 && <h1>No background NFTs available</h1>}
      {hasRespondedBackground && nftsOwnedBackground.length > 0 && (
        <div>
          <h1>Backgrounds Owned</h1>
          <br></br>
          {nftsOwnedBackground.map((nft) => (
            <span class="card" key={nft.id}>
              <img src={pinataToHTTPUrl(nft.imgSrc)} width="60px"></img>
            </span>
          ))}
        </div>
      )}
      {hasRespondedLootbox && lootboxesOwned.length == 0 && <h1>No lootbox NFTs available</h1>}
      {hasRespondedLootbox && lootboxesOwned.length > 0 && (
        <div>
          <h1>Lootboxes</h1>
          <br></br>
          {lootboxesOwned.map((nftLootbox) => (
            // <div width="100%">
            <span>
              <span id={`nftLootbox${nftLootbox}`} key={nftLootbox} class="lootboxContainer">
                <img
                  class="lootboxImg"
                  src={`https://stxnft.mypinata.cloud/ipfs/QmciPXBGPDYF57QAHtoRs99ocMqEzJVvsjjmSjGCEV4qp7/${nftLootbox}.png`}
                  width="60px"
                  onClick={() => handleClickLootbox(nftLootbox)}
                ></img>
                {`Lootbox#${nftLootbox}`}
              </span>
              {/* <span>{`Lootbox#${nftLootbox}`}</span> */}
            </span>
          ))}
          <br></br>
          <button disabled={!canOpenLootbox} onClick={() => handleOpenLootbox(selectedLootbox)}>
            Open Lootbox
          </button>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
