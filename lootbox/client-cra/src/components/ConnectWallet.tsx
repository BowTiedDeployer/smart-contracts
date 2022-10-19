import React, { useEffect, useState } from 'react';
import { AppConfig, showConnect, UserSession } from '@stacks/connect';
import { MainMenu } from './MainMenu';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: 'Stacks Lootbox System',
      icon: window.location.origin + '/logo.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut('/');
}

export const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <div>
        <MainMenu />
        <button className="ContractCall" onClick={disconnect}>
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <button className="ContractCall" onClick={authenticate}>
      Connect Wallet
    </button>
  );
};
