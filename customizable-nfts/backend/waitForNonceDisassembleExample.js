import { contracts, network, wallets } from './consts';
import { callSCFunctionWithNonce, getAccountNonce, readOnlySCJsonResponse, sleep } from './helper-sc';
import { chunk } from 'lodash-es';
import { jsonResponseToTokenUri } from './converters';
import { fetchJsonFromUrl, getAttributesMapTraitValue } from './helper-json';

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

// TODO:Deployer - how does it take into consideration the last value that was called
// ( ex. already called disassemble for 5 values and 2 more appear in the queue)

// keep: last minted id from the last block & how many had been done ( like an offset )
// if some are to be done, directly do from the 6th till the last ( 7th )
// if more appear in same block, when calling next time start with the 8th element

export async function chainUpdateDisassemble(valueToDisassemble) {
  let availableNonce = await getAccountNonce(wallets.admin.wallet);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.admin.wallet);

      return await checkNonceUpdate(++checkIt);
    }
  }

  try {
    for await (const x of valueToDisassemble) {
      checkNonceUpdate();

      const urlNFT = await jsonResponseToTokenUri(
        await readOnlySCJsonResponse(
          network,
          wallets.user[network],
          contracts[network].degens.split('.')[0],
          contracts[network].degens.split('.')[1],
          'get-token-uri',
          [x.id]
        )
      );

      // -> get the json
      const jsonFetched = await fetchJsonFromUrl(urlNFT);

      // -> get the attributes
      const attributes = getAttributesMapTraitValue(jsonFetched);
      attributes.Type == 'Alien' ? (attributes.City = 'NYC') : (attributes.City = 'Miami');

      // -> mint them
      // (disassemble-finalize (token-id uint) (member principal) (background-name (string-ascii 30)) (body-name (string-ascii 30)) (rim-name (string-ascii 30)) (head-name (string-ascii 30)))

      callSCFunctionWithNonce(
        networkN,
        contracts[network].customizable.split('.')[0],
        contracts[network].customizable.split('.')[1],
        'disassemble-finalize',
        [
          x.id,
          x.address,
          attributes.Background,
          attributes.Car,
          attributes.Rims,
          `${attributes.City}_${attributes.Head}_${attributes.Face}`,
        ]
      );
    }
  } catch (error) {
    console.log(error);
  }
}
