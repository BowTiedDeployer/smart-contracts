let axios = require('axios');
let FormData = require('form-data');
let fs = require('fs');
let path = require('path');
let env = require('dotenv').config();

function uploadImage(imageName) {
  let data = new FormData();
  data.append('file', fs.createReadStream(path.join(__dirname, `/generated/images/${imageName}`)));
  data.append('pinataOptions', '{"cidVersion": 1}');
  data.append('pinataMetadata', '{"name": "MyFile", "keyvalues": {"company": "StacksDegens"}}');

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
  let { config, data } = uploadImage('volume.jpg');
  const res = await axios(config);
  console.log(res.data);
}

try22();
