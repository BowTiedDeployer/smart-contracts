import React, { useState, useEffect } from 'react';
import { AppConfig, showConnect, UserSession } from '@stacks/connect';
import { MainMenu, authenticate } from './MainMenu';

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted /*&& userSession.isUserSignedIn()*/) {
    return (
      <div>
        <MainMenu />
      </div>
    );
  }

  return (
    <header className="App-header">
      <h1>Claim your brand new Bitcoin Degen!</h1>
      <button className="Connect" onClick={authenticate}>
        Connect Wallet
      </button>
    </header>
  );
};

export default ConnectWallet;
