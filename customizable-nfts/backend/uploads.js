import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { deleteFile, saveFile } from './helper_files.js';
import { hashToPinataUrl, jsonResponseToTokenUri, pinataToHTTPUrl } from './converters.js';
import fs from 'fs';
import { jsonContentCreate } from './helper_json.js';
import { sleep } from './helper_sc.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadToPinata = async (filePath, fileNamePinata) => {
  // contain .json /.png in filePath
  let data = new FormData();
  data.append('file', fs.createReadStream(path.join(__dirname, `/${filePath}`)));
  data.append('pinataOptions', '{"cidVersion": 1}');
  data.append('pinataMetadata', `{"name": "${fileNamePinata}", "keyvalues": {"company": "StacksDegens"}}`);

  let config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    headers: {
      Authorization: `Bearer ${process.env.JWT_PIN_FILE}`,
      ...data.getHeaders(),
    },
    data: data,
  };
  return config;
};

export const uploadFlowJsonOld = async (jsonName, jsonContent) => {
  const jsonPath = jsonName + '.json';
  await saveFile(jsonPath, jsonContent);
  await sleep(3000);
  let config = await uploadToPinata(jsonPath, jsonName);
  const res = await axios(config);
  // await deleteFile(jsonPath);
  return res.data.IpfsHash;
};

export const uploadFlowImgOld = async (imgName, imgContent) => {
  const imgPath = imgName + '.png';
  await saveFile(imgPath, imgContent);
  await sleep(3000);
  let config = await uploadToPinata(imgPath, imgName);
  const res = await axios(config);
  // await deleteFile(imgPath);
  return res.data.IpfsHash;
};

export const uploadFlowImg = async (imgName, imgContent) => {
  const imgPath = imgName + '.png';
  let resFinal = await saveFile(imgPath, imgContent)
    .then(() => uploadToPinata(imgPath, imgName))
    // .catch((err) =>console.error(`ERROR: ${err}`))
    .then((config) => axios(config))
    // .catch((err) =>console.error(`ERROR: ${err}`))
    .then((res) => {
      deleteFile(imgPath);
      // fs.promises.unlink(imgPath);
      return res;
    });
  return resFinal.data.IpfsHash;
};

export const uploadFlowJson = async (jsonName, jsonContent) => {
  const jsonPath = jsonName + '.json';
  let resFinal = await fs.promises
    .writeFile(jsonPath, jsonContent)
    .then(() => uploadToPinata(jsonPath, jsonName))
    // .catch((err) =>console.error(`ERROR: ${err}`))
    .then((config) => axios(config))
    // .catch((err) =>console.error(`ERROR: ${err}`))
    .then((res) => {
      fs.promises.unlink(jsonPath);
      return res;
    });
  return resFinal.data.IpfsHash;
};
