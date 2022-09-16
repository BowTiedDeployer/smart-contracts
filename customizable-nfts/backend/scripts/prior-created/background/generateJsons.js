import fs from 'fs';

// Backgrounds

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

const pathBgGenerated = './generated/';
const pathBgImg = './images/';

// takes all the backgrounds from the folder
fs.readdir(pathBgImg, (err, backgrounds) => {
  backgrounds.forEach((background) => {
    const backgroundName = background.split('.')[0];
    const metadata = jsonContentCreate(
      backgroundName,
      `ipfs://QmXweB6wjPHoVoBQWYFUz75TMAPXJGbncyffvxQoaYTria/${background}`, // marketplace
      `ipfs://QmXweB6wjPHoVoBQWYFUz75TMAPXJGbncyffvxQoaYTria/${background}`, // component
      '', // in-game
      { Background: backgroundName },
      'DegenBackgrounds'
    );
    fs.writeFile(pathBgGenerated + backgroundName + '.json', metadata, function (err, result) {
      if (err) console.log('error', err);
    });
  });
});
