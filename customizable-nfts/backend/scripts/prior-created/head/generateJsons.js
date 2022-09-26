import fs from 'fs';

// Heads

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
const pathHeadGenerated = './generated/jsons/';
const pathHeadNYCImg = './AlienHead/';
const pathFaceNYCImg = './AlienFace/';
const pathHeadMiamiImg = './SkullHead/';
const pathFaceMiamiImg = './SkullFace/';

// read every combination from nyc and create all possible heads in json format

// read every combination from miami and create all possible heads in json format

// const pathHeadImg = prefix + 'Head/';

// Goes through all NYC heads and faces
fs.readdir(pathHeadNYCImg, (err, heads) => {
  heads.forEach((head) => {
    const headName = head.split('.')[0];
    fs.readdir(pathFaceNYCImg, (err, faces) => {
      faces.forEach((face) => {
        const faceName = face.split('.')[0];
        const metadata = jsonContentCreate(
          'NYC_' + headName + '_' + faceName,
          `ipfs://QmUytSaKD2HGmJgrZWQdYY36DMd6oKDTZVcAvYqkR4hxst/NYC_${headName}_${faceName}.png`, // marketplace
          `ipfs://QmeBHNDwNUvwDR9rDT4Vh3oXCxsLyMSLwV2oPk8uAdQpxK/NYC_${headName}_${faceName}.png`, // component
          `ipfs://QmbUFUAZfqN1AsDHNSLomFVnDXn7L8baEfRcJiv8jsYxAL/NYC_${headName}_${faceName}.png`, // in-game
          { Race: 'Alien', Head: headName, Face: faceName },
          'DegenHeads'
        );
        fs.writeFile(pathHeadGenerated + 'NYC_' + headName + '_' + faceName + '.json', metadata, (err, result) => {
          if (err) console.log('error', err);
        });
      });
    });
  });
});

fs.readdir(pathHeadMiamiImg, (err, heads) => {
  heads.forEach((head) => {
    const headName = head.split('.')[0];
    fs.readdir(pathFaceMiamiImg, (err, faces) => {
      faces.forEach((face) => {
        const faceName = face.split('.')[0];
        const metadata = jsonContentCreate(
          'Miami_' + headName + '_' + faceName,
          `ipfs://QmUytSaKD2HGmJgrZWQdYY36DMd6oKDTZVcAvYqkR4hxst/Miami_${headName}_${faceName}.png`, // marketplace
          `ipfs://QmeBHNDwNUvwDR9rDT4Vh3oXCxsLyMSLwV2oPk8uAdQpxK/Miami_${headName}_${faceName}.png`, // component
          `ipfs://QmbUFUAZfqN1AsDHNSLomFVnDXn7L8baEfRcJiv8jsYxAL/Miami_${headName}_${faceName}.png`, // in-game
          { Race: 'Skull', Head: headName, Face: faceName },
          'DegenHeads'
        );
        fs.writeFile(pathHeadGenerated + 'Miami_' + headName + '_' + faceName + '.json', metadata, (err, result) => {
          if (err) console.log('error', err);
        });
      });
    });
  });
});
