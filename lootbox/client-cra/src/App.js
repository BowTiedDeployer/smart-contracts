import logo from './logo.png';
import './App.css';
import { ConnectWallet } from './components/ConnectWallet';
import React from 'react';
import './styles/globals.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h2>Lootbox System Testnet</h2>

        <ConnectWallet />

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
