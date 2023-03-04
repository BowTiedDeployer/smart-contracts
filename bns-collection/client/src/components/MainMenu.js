import React, { useEffect, useState, useCallback } from 'react';
import { userSession } from './ConnectWallet';
import {
  apiBNS,
  apiMapping,
  assetIdentifierBitcoinDegens,
  baseImgUrl,
  contractAddress,
  contractName,
  network,
} from '../constants/consts';
import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import {
  AnchorMode,
  FungibleConditionCode,
  NonFungibleConditionCode,
  PostConditionMode,
  bufferCVFromString,
  createAssetInfo,
  cvToJSON,
  hexToCV,
  makeContractNonFungiblePostCondition,
  makeStandardSTXPostCondition,
} from '@stacks/transactions';
import { useConnect } from '@stacks/connect-react';
import QuestionIcon from '../images/question-icon.png';
import Popup from './Popup';

export const MainMenu = () => {
  const { doContractCall } = useConnect();
  const [NFTsOwned, setNFTsOwned] = useState([]);
  const [hasRespondedNFTs, setHasRespondedNFTs] = useState(false);
  const [hasRespondedBNS, setHasRespondedBNS] = useState(false);
  const [hasRespondednextTokenId, setHasRespondedNextTokenId] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState('');
  const [nextTokenId, setNextTokenId] = useState(1);
  const [menuPage, setMenuPage] = useState('MainMenu');
  const [userBnsDomain, setUserBnsDomain] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);
  const [cancelledState, setCancelledState] = useState(false);
  const [lastTxID, setLastTxID] = useState('');

  function disconnect() {
    userSession.signUserOut('/');
  }
  let userAddress = '';
  network == 'mainnet'
    ? (userAddress = userSession.loadUserData().profile.stxAddress['mainnet'])
    : network == 'testnet'
    ? (userAddress = userSession.loadUserData().profile.stxAddress['testnet'])
    : (userAddress = userSession.loadUserData().profile.stxAddress['mocknet']);

  const fetchBnsDomain = async () => {
    let bnsResponse = await fetch(apiBNS(userAddress)).then((res) => res.json());
    if (bnsResponse.names[0] !== undefined) setUserBnsDomain(bnsResponse.names[0]);
    else {
      setUserBnsDomain(``);
    } // id of the next NFT
    console.log(userBnsDomain);
    setHasRespondedBNS(true);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const fetchLastTokenId = async () => {
    try {
      const url = apiMapping[network](userAddress).readOnly(
        contractAddress[network],
        contractName,
        'get-last-token-id'
      );
      console.log(url);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userAddress,
          network: network,
          arguments: [],
        }),
      })
        .then((res) => res.json())
        .then((res2) => cvToJSON(hexToCV(res2.result)));

      return parseInt(res.value.value);
    } catch (error) {
      console.log(`ERROR Read Only: ${error.message}`);
    }
  };

  const getNextTokenId = async () => {
    if ((await fetchLastTokenId()) !== undefined) setNextTokenId((await fetchLastTokenId()) + 1);
    setHasRespondedNextTokenId(true);
  };

  const getIDsNFTsOwned = (jsonNFTHoldings) => {
    let ids = [];
    if (jsonNFTHoldings.results) {
      jsonNFTHoldings.results.map((x) => {
        const id = x.value.repr.substring(1).toString();
        if (id != '') ids.push(id);
      });
    }
    return ids;
  };

  const getNFTsOwned = async () => {
    console.log(assetIdentifierBitcoinDegens(network));
    const urlHoldings = `${apiMapping[network](userAddress).nftsOwned}${assetIdentifierBitcoinDegens(network)}`;
    const limit = 50;
    let offsetHoldings = 0;
    let jsonNFT = await fetch(urlHoldings).then((res) => {
      return res.json();
    });

    let listOfNFTs = getIDsNFTsOwned(jsonNFT);
    console.log('List of NFTs: ', listOfNFTs);
    const totalDegens = jsonNFT.total;
    offsetHoldings += limit;
    console.log(totalDegens);

    while (offsetHoldings < totalDegens) {
      const offsetUrlHoldings = `&&offset=${offsetHoldings}`;
      jsonNFT = await fetch(urlHoldings + offsetUrlHoldings).then((res) => {
        return res.json();
      });
      listOfNFTs = listOfNFTs.concat(getIDsNFTsOwned(jsonNFT));
      offsetHoldings += limit;
    }

    return listOfNFTs;
  };

  const fetchNFTsOwned = useCallback(async () => {
    const localNFTsOwned = await getNFTsOwned(userAddress);
    setHasRespondedNFTs(true);
    if (localNFTsOwned) setNFTsOwned(localNFTsOwned);
    else setNFTsOwned([]);
  }, [userAddress]);

  useEffect(() => {
    getNextTokenId();
    fetchBnsDomain();
    fetchNFTsOwned();
    setInterval(() => {}, 30000);
  }, [fetchNFTsOwned]);

  const changeSelection = (nftId, localSelectedNFT) => {
    document.getElementById(`nft${localSelectedNFT}`)?.classList.remove('card-selected');
    document.getElementById(`nft${nftId}`)?.classList.add('card-selected');
  };

  const handleClickNFT = (id) => {
    changeSelection(id, selectedNFT);
    setSelectedNFT(id);
  };

  function handleClaim(numberOfClaims) {
    if ([1, 5, 10].indexOf(numberOfClaims) == -1) return;
    const STXPostConditionAddress = userAddress;
    const STXPostConditionCode = FungibleConditionCode.Equal;
    const STXPostConditionAmount = numberOfClaims * 1000000 * 69; // 69 instead of 0.1 if one degen is 69STX;
    const nonFungiblePostConditionCode = NonFungibleConditionCode.Sends;
    const assetContractName = `${contractName}`;
    const assetName = `bitcoin-degen`;
    const tokenAssetName = bufferCVFromString(`bitcoin-degen`);
    const nonFungibleAssetInfo = createAssetInfo(contractAddress[network], assetContractName, assetName);
    var functionName = numberOfClaims == 1 ? 'claim' : numberOfClaims == 5 ? 'claim-5' : 'claim-10';
    doContractCall({
      network:
        network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: `${contractAddress[network]}`,
      contractName: contractName,
      functionName: functionName,
      functionArgs: [],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        makeStandardSTXPostCondition(STXPostConditionAddress, STXPostConditionCode, STXPostConditionAmount),
        // makeContractNonFungiblePostCondition(
        //   contractAddress[network],
        //   contractName,
        //   nonFungiblePostConditionCode,
        //   nonFungibleAssetInfo,
        //   tokenAssetName
        // ),
      ],
      onFinish: (data) => {
        setCancelledState(false);
        setSuccessfulState(true);
        setLastTxID(data.txId);
        handleOpenPopup();
        console.log('onFinish:', data);
      },
      onCancel: () => {
        setSuccessfulState(false);
        setCancelledState(true);
        handleOpenPopup();
        console.log('onCancel:', 'Transaction was canceled');
      },
    });
  }

  const menuPageMapping = {
    MainMenu: (
      <div>
        <header className="App-header">
          <h1>Claim your brand new Bitcoin Degen!</h1>
          <div>
            <figure>
              <img src={QuestionIcon}></img>
              <figcaption>
                {!hasRespondedBNS || !hasRespondednextTokenId ? (
                  'Loading BNS domain...'
                ) : userBnsDomain !== '' ? (
                  <div>
                    {userBnsDomain}
                    <br></br>Remaining: {1000 - (nextTokenId - 1)}/1000
                  </div>
                ) : (
                  <div>
                    {nextTokenId == 1001 ? 'Fully Minted' : 'BitcoinDegen#' + nextTokenId}
                    <br></br>Remaining: {1000 - (nextTokenId - 1)}/1000
                  </div>
                )}
              </figcaption>
            </figure>
          </div>
          {showPopup && successfulState && (
            <Popup
              title="Successfully minted"
              content="View your mint "
              txId={lastTxID}
              closePopup={() => handleClosePopup()}
            />
          )}
          {showPopup && cancelledState && (
            <Popup title="Cancelled mint" content="You have cancelled the mint" closePopup={() => handleClosePopup()} />
          )}
          <button className="Claim" onClick={() => handleClaim(1)}>
            Claim
          </button>
          <br></br>
          <button className="Claim" onClick={() => handleClaim(5)}>
            Claim x5
          </button>
          <br></br>
          <button className="Claim" onClick={() => handleClaim(10)}>
            Claim x10
          </button>
          <br></br>
          <h6>{`Current user address: ${userAddress}`}</h6>

          {!hasRespondedNFTs && <h1> Loading NFTs... </h1>}
          {hasRespondedNFTs && NFTsOwned.length == 0 && <h1> No Bitcoin Degens owned </h1>}
          {hasRespondedNFTs && NFTsOwned.length > 0 && (
            <div>
              <h2>Your Bitcoin Degens:</h2>
              <div className="nftsContainer">
                {NFTsOwned.map((nftId) => (
                  <div id={`nft${nftId}`} key={nftId} className="characterContainer">
                    <figure>
                      <img
                        className="characterImg"
                        src={`${baseImgUrl}${nftId}.png`}
                        alt={`BitcoinDegen ${nftId}`}
                        onClick={() => handleClickNFT(nftId)}
                      ></img>
                      <figcaption>
                        {!hasRespondedBNS
                          ? 'Loading BNS domain...'
                          : userBnsDomain !== ''
                          ? `${userBnsDomain}`
                          : `BitcoinDegen#${nftId}`}
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button className="Connect" onClick={disconnect}>
            Disconnect Wallet
          </button>
        </header>
      </div>
    ),
  };

  return menuPageMapping[menuPage];
};
