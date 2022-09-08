import fs from 'fs';
// import { jsonContentCreate } from '../../../helper_json.js';

// Rims
const pathRimsGenerated = './generated/';
const pathRimsImg = './images/';

const createJsonAttributes = (attributes) => {
  let attributesList = [];

  attributes.Background ? attributesList.push({ trait_type: 'Background', value: attributes.Background }) : null;
  attributes.Car ? attributesList.push({ trait_type: 'Car', value: attributes.Car }) : null;
  attributes.Rims ? attributesList.push({ trait_type: 'Rims', value: attributes.Rims }) : null;
  attributes.Type ? attributesList.push({ trait_type: 'Type', value: attributes.Type }) : null;
  attributes.Race ? attributesList.push({ trait_type: 'Race', value: attributes.Race }) : null;
  attributes.Head ? attributesList.push({ trait_type: 'Head', value: attributes.Head }) : null;
  attributes.Face ? attributesList.push({ trait_type: 'Face', value: attributes.Face }) : null;

  let jsonAttributes = '';
  attributesList.forEach((attribute) => {
    jsonAttributes += `
    {
      "trait_type": "${attribute.trait_type}", 
      "value": "${attribute.value}"
    },`;
  });

  // removes last trailling comma for complience with JSON standard
  return jsonAttributes.slice(0, -1);
};

// degen - imageComponent == ""
// rims, background - imageInGame == ""
export const jsonContentCreate = (name, image, imageComponent, imageInGame, attributes, collection) => {
  const jsonAttributes = createJsonAttributes(attributes);

  let properties = '';
  if (imageComponent != '')
    properties += `"image_component": "${imageComponent}",
      `;
  if (imageInGame != '')
    properties += `"image_game": "${imageInGame}",
      `;

  let metadata = `{
  "sip": 16,
  "name": "${name}",
  "image": "${image}",
  "attributes": [${jsonAttributes}
  ],
  "properties": {
    ${properties}"collection": "${collection}"
  }
}
`;
  return metadata;
};

fs.readdir(pathRimsImg, (err, rims) => {
  rims.forEach((rim) => {
    const rimName = rim.split('.')[0];
    const metadata = jsonContentCreate(
      rimName,
      `ipfs://QmUAeq2AoLPPednjPxmZzstG3yDHR7fqs7mK3q8oQg2qRV/${rim}`, // marketplace
      `ipfs://QmWBHgQFLKpXW8EnU6LeRXcU2iZRCpsSMCgfnb7G6obA31/${rim}`, // component
      '', // in-game
      { Rims: rimName },
      'DegenRims'
    );
    fs.writeFile(pathRimsGenerated + rimName + '.json', metadata, function (err, result) {
      if (err) console.log('error', err);
    });
  });
});
