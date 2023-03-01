import React, { useEffect, useState, useCallback } from 'react';
import { userSession } from './ConnectWallet';
import { PlayGame } from './PlayGame';
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
  makeContractNonFungiblePostCondition,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
} from '@stacks/transactions';
import { useConnect } from '@stacks/connect-react';
// import questionIcon from window.location.origin + '/question-icon.png';

export const MainMenu = () => {
  const { doContractCall } = useConnect();
  const [NFTsOwned, setNFTsOwned] = useState([]);
  const [hasRespondedNFTs, setHasRespondedNFTs] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState('');
  const [menuPage, setMenuPage] = useState('MainMenu');
  const [userBnsDomain, setUserBnsDomain] = useState('YOURBNS.btc');
  // var userBnsDomain = `YOURBNS.btc`;
  function disconnect() {
    userSession.signUserOut('/');
  }
  let userAddress = '';
  network == 'mainnet'
    ? (userAddress = userSession.loadUserData().profile.stxAddress['mainnet'])
    : network == 'testnet'
    ? (userAddress = userSession.loadUserData().profile.stxAddress['testnet'])
    : (userAddress = userSession.loadUserData().profile.stxAddress['mocknet']);

  const getBnsDomain = async () => {
    let bnsResponse = await fetch(apiBNS(userAddress)).then((res) => res.json());
    if (bnsResponse.names[0] !== undefined) setUserBnsDomain(bnsResponse.names[0]);
    else setUserBnsDomain(`No BNS domain found`);
    console.log(userBnsDomain);
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
    console.log(localNFTsOwned);
    setHasRespondedNFTs(true);
    if (localNFTsOwned) setNFTsOwned(localNFTsOwned);
    else setNFTsOwned([]);
  }, [userAddress]);

  useEffect(() => {
    getBnsDomain();
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

  function handleClaim() {
    const STXPostConditionAddress = userAddress;
    const STXPostConditionCode = FungibleConditionCode.LessEqual;
    const STXPostConditionAmount = 0.1 * 1000000;
    const nonFungiblePostConditionAddress = userAddress;
    const nonFungiblePostConditionCode = NonFungibleConditionCode.Sends;
    const assetAddress = `${contractAddress[network]}`;
    const assetContractName = `${contractName}`;
    const assetName = `bitcoin-degen`;
    const tokenAssetName = bufferCVFromString(`bitcoin-degen`);
    const nonFungibleAssetInfo = createAssetInfo(contractAddress[network], assetContractName, assetName);
    doContractCall({
      network:
        network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: `${contractAddress[network]}`,
      contractName: 'bitcoin-degens-test-price',
      functionName: 'claim',
      functionArgs: [],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        makeStandardSTXPostCondition(STXPostConditionAddress, STXPostConditionCode, STXPostConditionAmount),
        makeContractNonFungiblePostCondition(
          contractAddress[network],
          contractName,
          nonFungiblePostConditionCode,
          nonFungibleAssetInfo,
          tokenAssetName
        ),
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
              <figcaption>{userBnsDomain}</figcaption>
            </figure>
          </div>
          <button className="Claim" onClick={handleClaim}>
            Claim
          </button>
          <br></br>
          <button className="Claim">Claim x5</button>
          <br></br>
          <button className="Claim">Claim x10</button>
          <br></br>
          <h6>{`Current user address: ${userAddress}`}</h6>

          {!hasRespondedNFTs && <h1> Loading NFTs... </h1>}
          {hasRespondedNFTs && NFTsOwned.length == 0 && <h1> No NFTs available </h1>}
          {hasRespondedNFTs && NFTsOwned.length > 0 && (
            <div>
              <h2>Your Bitcoin Degens:</h2>
              {NFTsOwned.map((nftId) => (
                <span id={`nft${nftId}`} key={nftId} className="characterContainer">
                  <img
                    className="characterImg"
                    src={`${baseImgUrl}${nftId}.png`}
                    alt={`duck ${nftId}`}
                    width="100"
                    onClick={() => handleClickNFT(nftId)}
                  ></img>
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
