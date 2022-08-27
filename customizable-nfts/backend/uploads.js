import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { imgContentCreate, saveFile } from './helper-files';
import fs from 'fs';
import { createJson } from './helper-json.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadToPinata = (filePath, fileNamePinata) => {
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
  return { config: config, data: data };
};

const uploadFlowJson = async (jsonName, jsonContent) => {
  const jsonPath = jsonName + '.json';
  saveFile(jsonPath, jsonContent);
  let { config, data } = uploadToPinata(jsonPath, jsonName);
  const res = await axios(config);
  // delete funciton here file locally
  console.log(res.data);
};

const uploadFlowImg = async (imgName, imgContent) => {
  const imgPath = imgName + '.png';
  saveFile(imgPath, imgContent);
  let { config, data } = uploadToPinata(imgPath, imgName);
  const res = await axios(config);
  // same delete file locally
  console.log(res.data);
};

// JsonDegen#nr
uploadFlowJson('jsonGenerssNew', createJson());

// ImgDegen#nr
uploadFlowImg('imageNew', await imgContentCreate());