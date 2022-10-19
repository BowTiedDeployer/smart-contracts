import React, { useEffect, useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksMainnet, StacksTestnet, StacksMocknet } from '@stacks/network';
import { AnchorMode, PostConditionMode, stringUtf8CV } from '@stacks/transactions';
import { userSession } from './ConnectWallet.tsx';

const ContractCallVote = () => {
  const activeNetwork =
    network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function vote(pick) {
    doContractCall({
      network: activeNetwork,
      anchorMode: AnchorMode.Any,
      contractAddress: 'ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK',
      contractName: 'example-fruit-vote-contract',
      functionName: 'vote',
      functionArgs: [stringUtf8CV(pick)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log('onFinish:', data);
        window.open(`https://explorer.stacks.co/txid/${data.txId}?chain=testnet`, '_blank').focus();
      },
      onCancel: () => {
        console.log('onCancel:', 'Transaction was canceled');
      },
    });
  }

  if (!mounted || !userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div>
      <h3>Vote via Smart Contract</h3>
      <button className="Vote" onClick={() => vote('🍊')}>
        Vote for 🍊
      </button>
      <button className="Vote" onClick={() => vote('🍎')}>
        Vote for 🍎
      </button>
    </div>
  );
};

export default ContractCallVote;