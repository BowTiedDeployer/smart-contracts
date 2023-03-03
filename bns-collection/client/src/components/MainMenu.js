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
    const STXPostConditionAmount = numberOfClaims * 1000000 * 0.000001; // 69 instead of 0.1 if one degen is 69STX;
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
        console.log('onFinish:', data);
        console.log('Explorer:', `localhost:8000/txid/${data.txId}?chain=testnet`);
      },
      onCancel: () => {
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
              <img src={window.location.origin + '/question-icon.png'}></img>
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
                    BitcoinDegen#{nextTokenId}
                    <br></br>Remaining: {1000 - (nextTokenId - 1)}/1000
                  </div>
                )}
              </figcaption>
            </figure>
          </div>
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
          {hasRespondedNFTs && NFTsOwned.length == 0 && <h1> No NFTs available </h1>}
          {hasRespondedNFTs && NFTsOwned.length > 0 && (
            <div>
              <h2>Your Bitcoin Degens:</h2>
              {NFTsOwned.map((nftId) => (
                <span id={`nft${nftId}`} key={nftId} className="characterContainer">
                  <figure>
                    <img
                      className="characterImg"
                      src={`${baseImgUrl}${nftId}.png`}
                      alt={`duck ${nftId}`}
                      width="100"
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
                </span>
              ))}
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
