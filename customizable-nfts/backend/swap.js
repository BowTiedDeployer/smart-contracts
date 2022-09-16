// Assemble:
import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { componentType, contracts, network, operationType, wallets } from './consts.js';
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
  getTokenUri,
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
    let attributes = {};

    let swapComponent =
      tuple.componentType === 'background-type'
        ? componentType['background'].type
        : tuple.componentType === 'car-type'
        ? componentType['car'].type
        : tuple.componentType === 'head-type'
        ? componentType['head'].type
        : componentType['rims'].type;

    // take jsons (degen, component)
    const urlJsonDegen = await getTokenUri(
      network,
      wallets.user[network],
      contracts[network].degens.split('.')[0],
      contracts[network].degens.split('.')[1],
      'get-token-uri',
      [tuple.degenId]
    );
    const jsonDegen = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonDegen));

    const urlJsonComponent = await getTokenUri(
      network,
      wallets.user[network],
      componentType[swapComponent].contract.split('.')[0],
      componentType[swapComponent].contract.split('.')[1],
      'get-token-uri',
      [tuple.componentId]
    );
    const jsonComponent = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonComponent));

    // take all attributes from Degen json ( old + the new overwritten one )
    attributes = getAttributesMapTraitValue(jsonDegen);

    // get attributes from the component, the name-url and imgUrl
    let componentAttributes = getAttributesMapTraitValue(jsonComponent);

    let oldComponentName = '';
    switch (swapComponent) {
      case componentType['background'].type:
        oldComponentName = attributes.Background;
        attributes.Background = componentAttributes.Background;
        break;
      case componentType['car'].type:
        oldComponentName = attributes.Car;
        attributes.Car = componentAttributes.Car;
        break;
      case componentType['head'].type:
        let attributeCity = attributes.Type == 'Alien' ? 'NYC' : 'Skull' ? 'Miami' : '';
        oldComponentName = `${attributeCity}_${attributes.Head}_${attributes.Face}`;
        attributes.Type = componentAttributes.Race;
        attributes.Head = componentAttributes.Head;
        attributes.Face = componentAttributes.Face;
        break;
      case componentType['rims'].type:
        oldComponentName = attributes.Rims;
        attributes.Rims = componentAttributes.Rims;
        break;
      default:
        break;
    }

    // for each attribute get name-url, fetch json, get imgUrl
    const urlJsonBackground = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].backgrounds.split('.')[0],
        contracts[network].backgrounds.split('.')[1],
        'get-name-url',
        [attributes.Background]
      )
    );

    const urlJsonCar = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].cars.split('.')[0],
        contracts[network].cars.split('.')[1],
        'get-name-url',
        [attributes.Car]
      )
    );

    let attributeCity = attributes.Type == 'Alien' ? 'NYC' : 'Skull' ? 'Miami' : '';
    const urlJsonHead = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].heads.split('.')[0],
        contracts[network].heads.split('.')[1],
        'get-name-url',
        [`${attributeCity}_${attributes.Head}_${attributes.Face}`]
      )
    );

    const urlJsonRims = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].rims.split('.')[0],
        contracts[network].rims.split('.')[1],
        'get-name-url',
        [attributes.Rims]
      )
    );

    const jsonBackground = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonBackground));
    const urlImgComponentBackground = getImgComponentUrlFromJson(jsonBackground);

    const jsonCar = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonCar));
    const urlImgGameCar = getImgGameUrlFromJson(jsonCar);
    const urlImgComponentCar = getImgComponentUrlFromJson(jsonCar);

    const jsonHead = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonHead));
    // console.log('jsonHead: ', jsonHead);
    const urlImgGameHead = getImgGameUrlFromJson(jsonHead);
    const urlImgComponentHead = getImgComponentUrlFromJson(jsonHead);

    const jsonRims = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonRims));
    const urlImgComponentRims = getImgComponentUrlFromJson(jsonRims);
    // console.log('urlImgRims', urlImgRims);

    const currentDbId = await dbReadCurrentId();
    const degenName = `BadDegen#${currentDbId}`;
    const degenImgName = `BadImgDegen#${currentDbId}`;
    const degenImgGameName = `BadImgGameDegen#${currentDbId}`;
    const degenJsonName = `BadJsonDegen#${currentDbId}`;

    // create image from component img urls (background_url, rims_url, car_url, head_url)
    const degenImg = await imgProfileContentCreate(
      pinataToHTTPUrl(urlImgComponentBackground),
      pinataToHTTPUrl(urlImgComponentCar),
      pinataToHTTPUrl(urlImgComponentHead),
      pinataToHTTPUrl(urlImgComponentRims)
    );

    const degenImgGame = await imgInGameContentCreate(pinataToHTTPUrl(urlImgGameCar), pinataToHTTPUrl(urlImgGameHead));

    // todo: check before production - upload to pinata 0 bytes
    // upload image and get hash
    const degenImgHash = await uploadFlowImg(degenImgName, degenImg);
    const degenImgGameHash = await uploadFlowImg(degenImgGameName, degenImgGame);

    // create json with component attributes (name#id, img hash, attributes, collection("DegenNFT"))
    const degenJson = jsonContentCreate(
      degenName,
      hashToPinataUrl(degenImgHash),
      '',
      hashToPinataUrl(degenImgGameHash),
      attributes,
      'DegenNFT'
    );
    console.log(degenJson);

    // upload json and get hash
    // todo: check before production - case upload json 0 bytes
    const degenJsonHash = await uploadFlowJson(degenJsonName, degenJson);
    console.log('jsonHash', degenJsonHash);

    // call assemble_finalize (member as address, json_hash as uri, old component-name, component-type)
    lastTxId = await callSCFunctionWithNonce(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'swap-finalize',
      [tuple.degenId, tuple.address, hashToPinataUrl(degenJsonHash), oldComponentName, tuple.componentType]
    );

    // increment id
    await dbIncremendId(currentDbId);

    console.log('lastTxId', lastTxId);
    await dbUpdateTxId(operationType.swap, lastTxId);
  }
};

const checkToStartFlow = async () => {
  const txId = await dbGetTxId(operationType.swap); //readFromDB
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
