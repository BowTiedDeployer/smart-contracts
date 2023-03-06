import React, { useEffect, useState } from 'react';
import { apiBNS, apiMapping, baseImgUrl, contractAddress, contractName, network } from '../constants/consts';
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
  makeStandardSTXPostCondition,
} from '@stacks/transactions';
import { AppConfig, UserSession, showConnect, useConnect } from '@stacks/connect-react';
import QuestionIcon from '../images/question-icon.png';
import Popup from './Popup';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: 'Mint Bitcoin Degen!',
      icon: 'https://stacksdegens.com/assets/images/collections/bitcoin-degens/2.jpeg',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

export const MainMenu = () => {
  const { doContractCall } = useConnect();
  const [hasRespondedNFTs, setHasRespondedNFTs] = useState(false);
  const [hasRespondedBNS, setHasRespondedBNS] = useState(false);
  const [hasRespondedNextTokenId, setHasRespondedNextTokenId] = useState(false);
  const [nextTokenId, setNextTokenId] = useState(1);
  const [volumeSold, setVolumeSold] = useState('');
  const [menuPage, setMenuPage] = useState('MainMenu');
  const [mapBNSNames, setMapBNSNames] = useState([]);
  const [userBnsDomain, setUserBnsDomain] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);
  const [cancelledState, setCancelledState] = useState(false);
  const [lastTxID, setLastTxID] = useState('');

  function disconnect() {
    userSession.signUserOut('/');
  }

  let userAddress = '';

  if (userSession.isUserSignedIn())
    network == 'mainnet'
      ? (userAddress = userSession.loadUserData().profile.stxAddress['mainnet'])
      : network == 'testnet'
      ? (userAddress = userSession.loadUserData().profile.stxAddress['testnet'])
      : (userAddress = userSession.loadUserData().profile.stxAddress['mocknet']);

  const fetchBnsDomain = async () => {
    let bnsResponse = await fetch(apiBNS(userAddress)).then((res) => res.json());
    if ((await bnsResponse.names[0]) !== undefined) setUserBnsDomain(await bnsResponse.names[0]);
    else {
      setUserBnsDomain(``);
    } // id of the next NFT
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
      const url = apiMapping[network].readOnly(contractAddress[network], contractName, 'get-last-token-id');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: contractAddress[network],
          network: network,
          arguments: [],
        }),
      })
        .then((res) => res.json())
        .then((res2) => cvToJSON(hexToCV(res2.result)));

      return parseInt(await res.value.value);
    } catch (error) {
      console.log(`ERROR Read Only: ${error.message}`);
    }
  };

  const fetchLastNDegensMinted = async (N) => {
    let mapBNSNamesLocal = [];
    const lastValueSearched = nextTokenId - 1 - N <= 1 ? 1 : nextTokenId - 1 - N;
    if (nextTokenId - 1 > 0)
      for (let i = nextTokenId - 1; i >= lastValueSearched; i--) {
        let jsonDegen = await fetch(`https://stacksdegens.com/bitcoin-degens/jsons/${i}.json`).then((res) =>
          res.json()
        );
        mapBNSNamesLocal.push({ id: i, name: await jsonDegen.name });
      }
    setMapBNSNames(mapBNSNamesLocal);
    setHasRespondedNFTs(true);
  };

  const getNextTokenId = async () => {
    let lastTokenId = await fetchLastTokenId();
    if (lastTokenId !== undefined) setNextTokenId(lastTokenId + 1);
    setHasRespondedNextTokenId(true);
    if (lastTokenId !== undefined)
      setVolumeSold(
        lastTokenId * 69 < 1000
          ? `${lastTokenId * 69}`
          : lastTokenId * 69 < 1000000
          ? `${(lastTokenId * 69) / 1000}K`
          : `${(lastTokenId * 69) / 1000000}M`
      );
    await fetchLastNDegensMinted(11);
  };

  const getVolumeSold = (lastTokenId) => {
    setVolumeSold(
      lastTokenId * 69 < 1000
        ? `${lastTokenId * 69}`
        : lastTokenId * 69 < 1000000
        ? `${(lastTokenId * 69) / 1000}K`
        : `${(lastTokenId * 69) / 1000000}M`
    );
  };

  const wrapper = async () => {
    await getNextTokenId().then(async () => {
      getVolumeSold(nextTokenId - 1);
      await fetchLastNDegensMinted(24);
    });
    if (userSession.isUserSignedIn()) await fetchBnsDomain();
  };

  useEffect(() => {
    wrapper();
  }, [hasRespondedNextTokenId]);

  function handleClaim(numberOfClaims) {
    if ([1, 5, 10].indexOf(numberOfClaims) == -1) return;
    const STXPostConditionAddress = userAddress;
    const STXPostConditionCode = FungibleConditionCode.Equal;
    const STXPostConditionAmount = numberOfClaims * 1000000 * 69; // 69 instead of 0.1 if one degen is 69STX;
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
          <div className="header-header">
            <div className="header-nav">
              <div>
                <a className="menu-item" href="https://stacksdegens.com/">
                  Home
                </a>
              </div>
              <div>
                <a className="menu-item" href="https://stacksdegens.com/game-lobby/">
                  Game
                </a>
              </div>
              <div>
                {userSession.isUserSignedIn() && (
                  <button className="btn-connect-wallet" onClick={disconnect}>
                    Disconnect wallet
                  </button>
                )}
                {!userSession.isUserSignedIn() && (
                  <button className="btn-connect-wallet" onClick={authenticate}>
                    Connect wallet
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <figure>
              <img className="img-character" src={QuestionIcon}></img>
              <figcaption>
                {!userSession.isUserSignedIn() ? (
                  'Connect wallet to see your BNS domain!'
                ) : !hasRespondedBNS || !hasRespondedNextTokenId ? (
                  'Loading BNS domain...'
                ) : userBnsDomain !== '' ? (
                  <div>{userBnsDomain}</div>
                ) : (
                  <div>{nextTokenId == 1001 ? 'Fully Minted' : 'BitcoinDegen#' + nextTokenId}</div>
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
          {userSession.isUserSignedIn() && (
            <div className="mint-btn-holder">
              <button className="btn-mint" onClick={() => handleClaim(1)}>
                Mint
              </button>
              <button className="btn-mint" onClick={() => handleClaim(5)}>
                Mint 5
              </button>
              <button className="btn-mint" onClick={() => handleClaim(10)}>
                Mint 10
              </button>
            </div>
          )}
          {!userSession.isUserSignedIn() && (
            <div className="mint-btn-holder">
              <button className="btn-mint" onClick={() => authenticate()}>
                Mint
              </button>
              <button className="btn-mint" onClick={() => authenticate()}>
                Mint 5
              </button>
              <button className="btn-mint" onClick={() => authenticate()}>
                Mint 10
              </button>
            </div>
          )}
          <div className="mint-info">
            <div className="mint-info-container">
              1000
              <div className="mint-info-title">TOTAL</div>
            </div>
            <div className="mint-info-container">
              {1000 - (nextTokenId - 1)}
              <div className="mint-info-title">REMAINING</div>
            </div>
            <div className="mint-info-container">
              <svg width="15px" height="18px" viewBox="0 0 15 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-889.000000, -497.000000)" stroke="#707071">
                    <g transform="translate(528.000000, 492.000000)">
                      <g transform="translate(361.000000, 6.000000)">
                        <g>
                          <line x1="3.84615385" y1="6.58823529" x2="13.0769231" y2="6.58823529"></line>
                          <line
                            x1="-9.60769925e-17"
                            y1="6.17647059"
                            x2="6.15384615"
                            y2="6.17647059"
                            strokeWidth="2"
                          ></line>
                          <line
                            x1="1.53846154"
                            y1="6.17647059"
                            x2="6.15384615"
                            y2="6.17647059"
                            strokeWidth="2"
                            strokeLinecap="round"
                          ></line>
                          <line
                            x1="8.46153846"
                            y1="6.17647059"
                            x2="13.0769231"
                            y2="6.17647059"
                            strokeWidth="2"
                            strokeLinecap="round"
                          ></line>
                          <line x1="8.46153846" y1="6.17647059" x2="14.6153846" y2="6.17647059" strokeWidth="2"></line>
                          <line
                            x1="2.30769231"
                            y1="0.411764706"
                            x2="6.15384615"
                            y2="6.17647059"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          ></line>
                          <line
                            x1="8.46153846"
                            y1="0.411764706"
                            x2="12.3076923"
                            y2="6.17647059"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            transform="translate(10.384615, 3.294118) scale(-1, 1) translate(-10.384615, -3.294118) "
                          ></line>
                        </g>
                        <g transform="translate(7.500000, 12.500000) scale(1, -1) translate(-7.500000, -12.500000) translate(0.000000, 9.000000)">
                          <line x1="3.84615385" y1="6.58823529" x2="13.0769231" y2="6.58823529"></line>
                          <line
                            x1="-9.60769925e-17"
                            y1="6.17647059"
                            x2="6.15384615"
                            y2="6.17647059"
                            strokeWidth="2"
                          ></line>
                          <line
                            x1="1.53846154"
                            y1="6.17647059"
                            x2="6.15384615"
                            y2="6.17647059"
                            strokeWidth="2"
                            strokeLinecap="round"
                          ></line>
                          <line
                            x1="8.46153846"
                            y1="6.17647059"
                            x2="13.0769231"
                            y2="6.17647059"
                            strokeWidth="2"
                            strokeLinecap="round"
                          ></line>
                          <line x1="8.46153846" y1="6.17647059" x2="14.6153846" y2="6.17647059" strokeWidth="2"></line>
                          <line
                            x1="2.30769231"
                            y1="0.411764706"
                            x2="6.15384615"
                            y2="6.17647059"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          ></line>
                          <line
                            x1="8.46153846"
                            y1="0.411764706"
                            x2="12.3076923"
                            y2="6.17647059"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            transform="translate(10.384615, 3.294118) scale(-1, 1) translate(-10.384615, -3.294118) "
                          ></line>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              69
              <div className="mint-info-title">MINT PRICE</div>
            </div>
            <div className="mint-info-container">
              {volumeSold}
              <div className="mint-info-title">VOLUME SOLD</div>
            </div>
          </div>

          {!hasRespondedNFTs && <h1> Loading Bitcoin Degens minted </h1>}
          {hasRespondedNFTs && mapBNSNames.length == 0 && <h4> No Bitcoin Degens minted yet... </h4>}
          {hasRespondedNFTs && mapBNSNames.length > 0 && (
            <div>
              <div className="nftsContainer">
                {mapBNSNames.map((degen) => (
                  <div id={`nft${degen.id}`} key={degen.name} className="nft-card">
                    <div className="nft-card-inner">
                      <div className="nft-card-front">
                        <div className="nft-card-content">
                          <div className="renderer">
                            <img
                              className="renderer-image"
                              src={`${baseImgUrl}${degen.id}.png`}
                              alt={`BitcoinDegen ${degen.id}`}
                            ></img>
                          </div>
                          <div className="select"></div>
                          <div className="details">
                            <div className="details-nft-info">
                              <div className="details-top-level">{`BitcoinDegen#${degen.id}`}</div>
                              <div className="details-name">{degen.name}</div>
                            </div>
                          </div>
                          <div className="actions">
                            <div className="actions-sold-badge">SOLD</div>
                            <div className="actions-price-container">
                              <div className="actions-price">
                                <div className="actions-sold-for">Sold for</div>
                                <div className="actions-price-symbol">
                                  <svg
                                    width="15px"
                                    height="18px"
                                    viewBox="0 0 15 18"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                      <g transform="translate(-889.000000, -497.000000)" stroke="#707071">
                                        <g transform="translate(528.000000, 492.000000)">
                                          <g transform="translate(361.000000, 6.000000)">
                                            <g>
                                              <line
                                                x1="3.84615385"
                                                y1="6.58823529"
                                                x2="13.0769231"
                                                y2="6.58823529"
                                              ></line>
                                              <line
                                                x1="-9.60769925e-17"
                                                y1="6.17647059"
                                                x2="6.15384615"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                              ></line>
                                              <line
                                                x1="1.53846154"
                                                y1="6.17647059"
                                                x2="6.15384615"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                              ></line>
                                              <line
                                                x1="8.46153846"
                                                y1="6.17647059"
                                                x2="13.0769231"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                              ></line>
                                              <line
                                                x1="8.46153846"
                                                y1="6.17647059"
                                                x2="14.6153846"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                              ></line>
                                              <line
                                                x1="2.30769231"
                                                y1="0.411764706"
                                                x2="6.15384615"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                              ></line>
                                              <line
                                                x1="8.46153846"
                                                y1="0.411764706"
                                                x2="12.3076923"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                                transform="translate(10.384615, 3.294118) scale(-1, 1) translate(-10.384615, -3.294118) "
                                              ></line>
                                            </g>
                                            <g transform="translate(7.500000, 12.500000) scale(1, -1) translate(-7.500000, -12.500000) translate(0.000000, 9.000000)">
                                              <line
                                                x1="3.84615385"
                                                y1="6.58823529"
                                                x2="13.0769231"
                                                y2="6.58823529"
                                              ></line>
                                              <line
                                                x1="-9.60769925e-17"
                                                y1="6.17647059"
                                                x2="6.15384615"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                              ></line>
                                              <line
                                                x1="1.53846154"
                                                y1="6.17647059"
                                                x2="6.15384615"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                              ></line>
                                              <line
                                                x1="8.46153846"
                                                y1="6.17647059"
                                                x2="13.0769231"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                              ></line>
                                              <line
                                                x1="8.46153846"
                                                y1="6.17647059"
                                                x2="14.6153846"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                              ></line>
                                              <line
                                                x1="2.30769231"
                                                y1="0.411764706"
                                                x2="6.15384615"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                              ></line>
                                              <line
                                                x1="8.46153846"
                                                y1="0.411764706"
                                                x2="12.3076923"
                                                y2="6.17647059"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                                transform="translate(10.384615, 3.294118) scale(-1, 1) translate(-10.384615, -3.294118) "
                                              ></line>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                </div>
                                <div>69</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>
      </div>
    ),
  };

  return menuPageMapping[menuPage];
};
