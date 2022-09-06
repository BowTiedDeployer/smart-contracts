// Assemble:
import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { contracts, network, wallets } from './consts.js';
import { hashToPinataUrl, jsonResponseToTokenUri, pinataToHTTPUrl } from './converters.js';
import { dbIncremendId, dbReadCurrentId } from './helper_db.js';
import { imgProfileContentCreate } from './helper_files.js';
import { jsonContentCreate, fetchJsonFromUrl, getAttributesMapTraitValue, getImgUrlFromJson } from './helper_json.js';
import { callSCFunctionWithNonce, checkNonceUpdate, getAccountNonce, readOnlySCJsonResponse } from './helper_sc.js';
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
      backgroundId: x.value['background-id'].value,
      carId: x.value['car-id'].value,
      rimId: x.value['rim-id'].value,
      headId: x.value['head-id'].value,
    });
  });
  return idLists;
};

const getValuesFromQueueAssemble = async () => {
  // return a list having {}
  const values = await readOnlySCJsonResponse(
    networkN,
    wallets.admin[network],
    contracts[network].customizable.split('.')[0],
    contracts[network].customizable.split('.')[1],
    'get-assemble-work-queue',
    []
  );
  return listOfTuplesResponseToList(values);
};

const assembleServerFlow = async () => {
  // get values from queue
  let valuesToAssemble = await getValuesFromQueueAssemble();
  // console.log(valuesToAssemble);

  for await (const tuple of valuesToAssemble) {
    // verify available nonce
    let availableNonce = await getAccountNonce(wallets.admin[network]);
    let lastUsedNonce = availableNonce - 1;
    checkNonceUpdate(1, availableNonce, lastUsedNonce);

    let attributes = {};

    // take jsons (background, rims, car, head - type: alien/skull, face, head)
    const urlJsonBackground = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].backgrounds.split('.')[0],
        contracts[network].backgrounds.split('.')[1],
        'get-token-uri',
        [tuple.backgroundId]
      )
    );

    const urlJsonCar = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].cars.split('.')[0],
        contracts[network].cars.split('.')[1],
        'get-token-uri',
        [tuple.carId]
      )
    );

    const urlJsonHead = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].heads.split('.')[0],
        contracts[network].heads.split('.')[1],
        'get-token-uri',
        [tuple.headId]
      )
    );

    const urlJsonRims = await jsonResponseToTokenUri(
      await readOnlySCJsonResponse(
        network,
        wallets.user[network],
        contracts[network].rims.split('.')[0],
        contracts[network].rims.split('.')[1],
        'get-token-uri',
        [tuple.rimId]
      )
    );

    // get the attribute value & imgUrl from each json
    const jsonBackground = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonBackground));
    const urlImgBackground = getImgUrlFromJson(jsonBackground);
    let attributeBackground = getAttributesMapTraitValue(jsonBackground);

    const jsonCar = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonCar));
    const urlImgCar = getImgUrlFromJson(jsonCar);
    let attributeCar = getAttributesMapTraitValue(jsonCar);

    const jsonHead = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonHead));
    // console.log('jsonHead: ', jsonHead);
    const urlImgHead = getImgUrlFromJson(jsonHead);
    let attributeHead = getAttributesMapTraitValue(jsonHead);

    const jsonRims = await fetchJsonFromUrl(pinataToHTTPUrl(urlJsonRims));
    const urlImgRims = getImgUrlFromJson(jsonRims);
    // console.log('urlImgRims', urlImgRims);
    let attributeRims = getAttributesMapTraitValue(jsonRims);

    attributes = { ...attributeBackground, ...attributeCar, ...attributeHead, ...attributeRims };

    //convert Race -> Type
    attributes.Type = attributes.Race;
    const { Race, ...otherAttributes } = attributes;
    attributes = otherAttributes;

    const currentDbId = await dbReadCurrentId();
    const degenName = `BadDegen#${currentDbId}`;
    const degenImgName = `BadImgDegen#${currentDbId}`;
    const degenJsonName = `BadJsonDegen#${currentDbId}`;

    // create image from component img urls (background_url, rims_url, car_url, head_url)
    const degenImg = await imgProfileContentCreate(
      pinataToHTTPUrl(urlImgBackground),
      pinataToHTTPUrl(urlImgCar),
      pinataToHTTPUrl(urlImgHead),
      pinataToHTTPUrl(urlImgRims)
    );

    // upload image and get hash
    const degenImgHash = await uploadFlowImg(degenImgName, degenImg);

    // create json with component attributes (name#id, img hash, attributes, collection("DegenNFT"))
    const degenJson = jsonContentCreate(degenName, hashToPinataUrl(degenImgHash), attributes, 'DegenNFT');
    // console.log(degenJson);

    // upload json and get hash
    const degenJsonHash = await uploadFlowJson(degenJsonName, degenJson);
    // console.log(degenJsonHash);

    // call assemble_finalize (member as address, json_hash as uri)
    callSCFunctionWithNonce(
      networkN,
      contracts[network].customizable.split('.')[0],
      contracts[network].customizable.split('.')[1],
      'assemble-finalize',
      [tuple.address, hashToPinataUrl(degenImgHash)]
    );

    // increment id
    dbIncremendId(currentDbId);
  }
};

await assembleServerFlow();
