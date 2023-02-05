import './App.css';
import { ConnectWallet, userSession } from './components/ConnectWallet';
import React from 'react';
import './styles/globals.css';
import { network } from './constants/network';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lootbox System Testnet</h1>

        <ConnectWallet />
        <br></br>
        <a className="App-link" href="https://docs.hiro.so/build-apps/overview" target="_blank">
          Build by Stacks Degens
        </a>
        <a
          className="App-link"
          href="https://gamefi-stacks.gitbook.io/gamefistacks/lootbox-on-chain-m3/general-idea"
          target="_blank"
        >
          Docs Lootbox
        </a>
      </header>
    </div>
  );
}

export default App;
