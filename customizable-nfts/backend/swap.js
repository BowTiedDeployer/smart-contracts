// Assemble:
import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, operationType, wallets } from './consts.js';
import { hashToPinataUrl, jsonResponseToTokenUri, pinataToHTTPUrl } from './converters.js';
import { dbGetTxId, dbIncremendId, dbReadCurrentId, dbUpdateTxId } from './helper_db.js';
import { imgInGameContentCreate, imgProfileContentCreate } from './helper_files.js';
import {
  jsonContentCreate,
  fetchJsonFromUrl,
  getAttributesMapTraitValue,
  getImageUrlFromJson,
  getImgGameUrlFromJson,
  getImgComponentUrlFromJson,
} from './helper_json.js';
import {
  callSCFunctionWithNonce,
  chainGetTxIdStatus,
  checkNonceUpdate,
  getAccountNonce,
  readOnlySCJsonResponse,
  sleep,
} from './helper_sc.js';
import { uploadFlowImg, uploadFlowJson } from './uploads.js';

// - needs nft id fetched from nfts owned combined with the nft metadata - gets it from the queue

let networkN =
  network === 'mainnet' ? new StacksMainnet() : network === 'testnet' ? new StacksTestnet() : new StacksMocknet();

const listOfTuplesResponseToList = (tupleResponse) => {
  let idLists = [];
  const tupleList = tupleResponse.value.value;
  tupleList.forEach((x) => {
    idLists.push({
      address: x.value.member.value,
      degenId: x.value['degen-id'].value,
      componentId: x.value['component-id'].value,
      componentType: x.value['component-type'].value,
    });
  });
  return idLists;
};

const getValuesFromQueueSwap = async () => {
  // return a list having {}
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin[network],
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'get-swap-work-queue',
    []
  );
  return listOfTuplesResponseToList(values);
};

const swapServerFlow = async () => {
  // get values from queue
  let valuesToSwap = await getValuesFromQueueSwap();
  console.log(valuesToSwap);

  // maximum 25 transactions done in a block by the same account
  let upperLimit = valuesToSwap.length > 25 ? 25 : valuesToSwap.length;
  let availableNonce = await getAccountNonce(wallets.admin[network]);
  let lastUsedNonce = availableNonce - 1;

  async function checkNonceUpdate(checkIt = 1) {
    if (checkIt > 10) throw new Error("Nonce didn't update on the blockchain API.");

    if (availableNonce > lastUsedNonce) return (lastUsedNonce = availableNonce);
    else {
      await sleep(checkIt * 1000);
      availableNonce = await getAccountNonce(wallets.admin[network]);

      return await checkNonceUpdate(++checkIt);
    }
  }

  let lastTxId = null;
  for (let i = 0; i < upperLimit; i++) {
    // verify available nonce
    await checkNonceUpdate();

    const tuple = valuesToSwap[i];
    console.log('tuple', tuple);
    let attributes = {};

    // take jsons (background, rims, car, head - type: alien/skull, face, head)

    // get the attribute value & imgUrl from each json

    // create image from component img urls (background_url, rims_url, car_url, head_url)

    // upload image and get hash

    // create json with component attributes (name#id, img hash, attributes, collection("DegenNFT"))

    // upload json and get hash

    // call assemble_finalize (member as address, json_hash as uri)

    // increment id
  }
};

const checkToStartFlow = async () => {
  const txId = await dbGetTxId(operationType.assemble); //readFromDB
  // fetchJSONResponse(txId)
  // general call
  const status = await chainGetTxIdStatus(txId);

  if (status === 'success') {
    console.log('--------------flow can start-----------');
    await swapServerFlow();
  } else if (status === 'abort_by_response') {
    // todo: alert if problem case happen (as long as the SC has stx it will not happen)
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------aborted-----------xxxxxxx');
    console.error(`error: failed tx ${txId} with status: ${status}`);
  } else if (status === 'pending') {
    // do nothing
    console.log('----------pending----------');
  } else {
    console.error(`invalid status "${status}" txid: ${txId}`);
  }
};

// await checkToStartFlow();

await swapServerFlow();
