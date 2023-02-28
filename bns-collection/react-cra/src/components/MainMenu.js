import React, { useEffect, useState, useCallback } from 'react';
import { userSession } from './ConnectWallet';
import { PlayGame } from './PlayGame';
// import questionIcon from window.location.origin + '/question-icon.png';

export const MainMenu = () => {
  const [NFTsOwned, setNFTsOwned] = useState([]);
  const [hasRespondedNFTs, setHasRespondedNFTs] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState('');
  const [menuPage, setMenuPage] = useState('MainMenu');

  function disconnect() {
    userSession.signUserOut('/');
  }

  const userAddress = userSession.loadUserData().profile.stxAddress['testnet'];

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

  const getNFTsOwned = async (accountAddress) => {
    const urlHoldings = `https://stacks-node-api.testnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${userAddress}&&asset_identifiers=ST1HW9QWHEQ7PZYQGGKJ8FRWBF6VAG7V885WYH3TQ.bitcoin-degens-test-price::bitcoin-degen`;
    let jsonNFT = await fetch(urlHoldings).then((res) => {
      return res.json();
    });

    const listOfNFTs = getIDsNFTsOwned(jsonNFT);
    console.log('List of NFTs: ', listOfNFTs);
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

  const handlePlayGame = (id) => {
    console.log('selected NFT:', id);
    localStorage.setItem('selectedNFT', id);
    setMenuPage('Game');
  };

  const menuPageMapping = {
    MainMenu: (
      <div>
        <header className="App-header">
          <h1>Claim your brand new Bitcoin Degen!</h1>
          <div>
            <figure>
              <img src={window.location.origin + '/question-icon.png'}></img>
              <figcaption>YOURBNS.btc</figcaption>
            </figure>
          </div>
          <button className="Claim">Claim</button>
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
              <h2>Pick your NFT!</h2>
              {NFTsOwned.map((nftId) => (
                <span id={`nft${nftId}`} key={nftId} className="characterContainer">
                  <img
                    className="characterImg"
                    src={`https://stacksgamefi.mypinata.cloud/ipfs/QmS57rKdQB7ioMsg5PNUdyzzQnZpfzPZF5G63E1xkGci4w/${nftId}.png`}
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
    Game: <PlayGame menuPage={menuPage} setMenuPage={setMenuPage} />,
  };

  return menuPageMapping[menuPage];
};
