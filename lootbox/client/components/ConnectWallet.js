import React, { useEffect, useState } from 'react';
import { AppConfig, showConnect, UserSession } from '@stacks/connect';
import MainMenu from './MainMenu.tsx';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: 'Stacks Next.js Starter',
      icon: window.location.origin + '/logo512.png',
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

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <div>
        <MainMenu></MainMenu>
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <button className="Connect" onClick={authenticate}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
