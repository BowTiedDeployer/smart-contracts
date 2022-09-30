export let globalNonce = {
  admin: 9,
  user: 0,
  wallet2: 0,
  wallet3: 0,
  wallet4: 0,
  wallet5: 0,
  wallet6: 0,
  wallet7: 0,
  wallet8: 0,
  wallet9: 0,
  wallet10: 0,
  wallet11: 0,
  wallet12: 0,
  wallet13: 0,
  wallet14: 0,
  wallet15: 0,
  wallet16: 0,
  wallet17: 0,
  wallet18: 0,
  wallet19: 0,
  wallet20: 0,
};

export let nrOperationsAvailable = 24;

export const getNrOperationsAvailable = () => nrOperationsAvailable;

export const setNrOperationsAvailable = (nr) => (nrOperationsAvailable = nr);

export const getWalletStoredNonce = (walletAddress) => {
  return globalNonce[walletAddress];
};

export const setWalletStoredNonce = (walletAddress, nonce) => {
  globalNonce[walletAddress] = nonce;
};
