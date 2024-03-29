import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Connect } from '@stacks/connect-react';

import { userSession } from './components/MainMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Connect
      authOptions={{
        appDetails: {
          name: 'Mint Bitcoin Degens',
          icon: 'https://stacksdegens.com/assets/images/collections/bitcoin-degens/2.jpeg',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      <App />
    </Connect>
  </React.StrictMode>
);
