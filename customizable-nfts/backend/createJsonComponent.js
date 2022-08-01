// for every component creates the metadata json

import fs from 'fs';

const createJsonAttributes = (attributes) => {
  let jsonAttributes = '';
  attributes.forEach((attribute) => {
    jsonAttributes += `
    {
      "trait_type": "${attribute.trait_type}", 
      "value": "${attribute.value}"
    },`;
  });

  // removes last trailling comma for complience with JSON standard
  return jsonAttributes.slice(0, -1);
};

const composeMetadata = (name, image, attributes, collection) => {
  const jsonAttributes = createJsonAttributes(attributes);

  let metadata = `{
  "sip": 16,
  "name": "${name}",
  "image": "${image}",
  "attributes": [${jsonAttributes}
  ],
  "properties": {    
    "collection": "${collection}"
  }
}`;

  return metadata;
};

// Backgrounds
// takes all the backgrounds from the folder
// create json calling composeMetadata(file-name, ipfs+file-name.png, [{trait_type: 'Background', value: file-name,}], 'DegenBackgrounds')
const prefix = './components/';
const pathBgGenerated = './generated/jsons/Background/';
const pathBgImg = prefix + 'Background/';

fs.readdir(pathBgImg, (err, backgrounds) => {
  backgrounds.forEach((background) => {
    const backgroundName = background.split('.')[0];
    const metadata = composeMetadata(
      backgroundName,
      `ipfs://QmXweB6wjPHoVoBQWYFUz75TMAPXJGbncyffvxQoaYTria/${background}`,
      [{ trait_type: 'Background', value: backgroundName }],
      'DegenBackgrounds'
    );
    fs.writeFile(pathBgGenerated + backgroundName + '.json', metadata, function (err, result) {
      if (err) console.log('error', err);
    });
  });
});

// Cars
const pathCarGenerated = './generated/jsons/Car/';
const pathCarImg = prefix + 'Car/';

fs.readdir(pathCarImg, (err, cars) => {
  cars.forEach((car) => {
    const carName = car.split('.')[0];
    const metadata = composeMetadata(
      carName,
      `ipfs://QmY6NmxfHYRvW4q2jvkUbYqJto6boQG8RScwUkuie3gbjD/${car}`,
      [{ trait_type: 'Car', value: carName }],
      'DegenBackgrounds'
    );
    fs.writeFile(pathCarGenerated + carName + '.json', metadata, function (err, result) {
      if (err) console.log('error', err);
    });
  });
});

// Rims
const pathRimsGenerated = './generated/jsons/Rims/';
const pathRimsImg = prefix + 'Rims/';

fs.readdir(pathRimsImg, (err, rims) => {
  rims.forEach((rim) => {
    const rimName = rim.split('.')[0];
    const metadata = composeMetadata(
      rimName,
      `ipfs://QmWBHgQFLKpXW8EnU6LeRXcU2iZRCpsSMCgfnb7G6obA31/${rim}`,
      [{ trait_type: 'Rims', value: rimName }],
      'DegenBackgrounds'
    );
    fs.writeFile(pathRimsGenerated + rimName + '.json', metadata, function (err, result) {
      if (err) console.log('error', err);
    });
  });
});

// Heads
// extra step

const pathHeadGenerated = './generated/jsons/Head/';
const pathHeadNYC = '';
const pathFaceNYC = '';
const pathHeadMiami = '';
const pathFaceMiami = '';

// read every combination from nyc and create all possible heads in json format

// read every combination from miami and create all possible heads in json format

// const pathHeadImg = prefix + 'Head/';

// fs.readdir(pathHeadImg, (err, heads) => {
//   heads.forEach((head) => {
//     const headName = head.split('.')[0];

//     const metadata = composeMetadata(
//       headName,
//       `ipfs://QmWBHgQFLKpXW8EnU6LeRXcU2iZRCpsSMCgfnb7G6obA31/${head}`,
//       [
//         { trait_type: 'Race', value: 'Skull/Alien' },
//         { trait_type: 'Head', value: headName },
//         { trait_type: 'Face', value: 'faceName' },
//       ],
//       'DegenBackgrounds'
//     );
//     fs.writeFile(pathHeadGenerated + headName + '.json', metadata, function (err, result) {
//       if (err) console.log('error', err);
//     });
//   });
// });
