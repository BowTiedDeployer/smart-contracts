// take {id, principal} from queue
// do this steps calling SC
// (contract-call? .degens mint-uri 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "uriNiceDegen")
// ::set_tx_sender STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract add-disassemble-work-in-queue u1)
// ::set_tx_sender ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract disassemble-finalize u1 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "DarkPurple" "BentleyBlack" "ClassyCream" "Miami_Syringe_Cigar")
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.body-kits get-token-uri u1)
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.body-kits get-owner u1)
import { standardPrincipalCV, cvToHex, hexToCV, cvToJSON } from '@stacks/transactions';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import { network, coreApiUrl, urlApis } from './consts.js';
import { intToHexString } from './helper.js';
import { getAttributesMapTraitValue } from './merge_helper_functions.js';

let networkN =
  network === 'mainnet' ? new StacksMocknet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

// for the given id return the read only json url

const getTokenUriNFT = async (userAddress, contractAddress, contractName, functionName, idArg) => {
  let address = userAddress;
  let id = '010000000000000000' + intToHexString(idArg);
  try {
    address = cvToHex(standardPrincipalCV(address));
    const url = `${coreApiUrl[network]}${urlApis.readOnly(contractAddress, contractName, functionName)}`;
    let tokenUriNFT = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: userAddress, // todo: check this
        network: networkN,
        arguments: [id],
      }),
    })
      .then((res) => res.json())
      .then((res2) => cvToJSON(hexToCV(res2.result)))
      .then((res3) => res3.value.value.value);
    return tokenUriNFT;
  } catch (error) {
    console.log(error.message, '| invalid address');
  }
};

// feth json from url

const fetchJsonUrl = async (url) => {
  // todo: see if possible without async promise
  return fetch(url).then((res) => res.json());
};

const urlNFT = await getTokenUriNFT(
  'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
  'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  'degens',
  'get-token-uri',
  1
);

console.log(urlNFT);

const jsonFetched = await fetchJsonUrl(urlNFT);
console.log(jsonFetched);

// fetch url from this - get components from attributes
console.log(getAttributesMapTraitValue(jsonFetched));

// calls SC function to mint-name

export async function chainMintNameDisassemble(address, url, nonce) {
  try {
    await mintNameUrl(address, url, nonce);
  } catch (error) {
    console.log(error);
  }
}

async function mintNameUrl(address, url, nonce) {
  try {
    // principalCV
    // stringCV
    //nonce 
    let txOptions = { // todo: finish mintNameUrl call

    // publish-result-many (run-result (list 50 { lobby-id: uint, run-id: uint, address: principal, score: uint, rank: uint, rank-factor: uint, rewards: uint, rac: uint}))
    let tupleArray = [];
    for (let index = 0; index < resultsFromDB.length; index++) {
      const obj = resultsFromDB[index];
      console.log(obj);

      const tupCV = tupleCV({
        'lobby-id': uintCV(obj['lobby-id']),
        // 'run-id': uintCV(obj['run-id']),
        address: standardPrincipalCV(obj.address),
        score: uintCV(obj.score),
        rank: uintCV(obj.rank),
        'sum-rank-factor': uintCV(0),
        'rank-factor': uintCV(obj['rank-factor']),
        rewards: uintCV(obj.rewards),
        rac: uintCV(obj.rac),
        nft: stringAsciiCV(obj.nft),
      });
      tupleArray.push(tupCV);
    }
    console.log('publishResults tupleArray ', tupleArray);
    const l = listCV(tupleArray);
    const functionArgs = [l];

    const latestNonce = await getAccountNonce(wallets.owner.wallet);

    let txOptions = {
      contractAddress: contractAddress.split('.')[0],
      contractName: contractAddress.split('.')[1],
      functionName: 'publish-result-many',
      functionArgs: functionArgs,
      senderKey: wallets.owner.private_key,
      network: network,
      // postConditions,
      postConditionMode: PostConditionMode.Allow,
      fee: new BigNum(100000),
      nonce: new BigNum(latestNonce),
    };
    console.log(wallets.owner);
    // calculate fee
    let transaction = await makeContractCall(txOptions);
    const normalizedFee = await getNormalizedFee(transaction);

    // set fee
    txOptions.fee = new BigNum(normalizedFee);
    transaction = await makeContractCall(txOptions);

    const tx = await broadcastTransaction(transaction, network);
    console.log('publishResults broadcasted tx: ', tx.txid);
  } catch (error) {
    console.log('publishResults error: ', error);
  }