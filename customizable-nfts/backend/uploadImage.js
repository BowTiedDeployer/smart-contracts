import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function uploadImage(imagePath, imageNamePinata) {
  let data = new FormData();
  data.append('file', fs.createReadStream(path.join(__dirname, `/generated/images/${imagePath}`)));
  data.append('pinataOptions', '{"cidVersion": 1}');
  data.append('pinataMetadata', `{"name": "${imageNamePinata}", "keyvalues": {"company": "StacksDegens"}}`);

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
}

async function try22() {
  let { config, data } = uploadImage('volume.jpg', 'DegenNFT');
  const res = await axios(config);
  console.log(res.data);
}

try22();
