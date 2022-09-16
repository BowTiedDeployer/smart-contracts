import fs from 'fs';

// Cars

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

const pathCarGenerated = './generated/';
const pathCarImg = './images/';

fs.readdir(pathCarImg, (err, cars) => {
  cars.forEach((car) => {
    const carName = car.split('.')[0];
    const metadata = jsonContentCreate(
      carName,
      `ipfs://QmYoRfeG8ucG27hyAaHwvsquHP5LrAGNeEncML1BkCcit1/${car}`, // marketplace
      `ipfs://QmeCL653FLxAfdT8wGkHxhwHSdEfPBH4WF8h9Hz6XDbi4u/${car}`, // for assemble
      `ipfs://QmXivFXDKXgnECXN7ckPf8KHXn6mogvHwLsdT1rAfCCU72/${car}`, // in game
      { Car: carName },
      'DegenCars'
    );
    fs.writeFile(pathCarGenerated + carName + '.json', metadata, function (err, result) {
      if (err) console.log('error', err);
    });
  });
});
