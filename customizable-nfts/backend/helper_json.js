export const getAttributesMapTraitValue = (json) => {
  let attr = {};
  for (const attribute of json.attributes) {
    attr[attribute.trait_type] = attribute.value;
  }
  return attr;
};

export const getImageUrlFromJson = (json) => {
  return json.image;
};

export const getImgComponentUrlFromJson = (json) => {
  return json.properties.image_component;
};

export const getImgGameUrlFromJson = (json) => {
  return json.properties.image_game;
};

export const fetchJsonFromUrl = async (jsonUrl) => {
  //example https://stxnft.mypinata.cloud/ipfs/QmbX7UCSFLBvJa2yB4YxqZxhacrxiKUGbE6fHbQuYMhNhf
  return fetch(jsonUrl).then((res) => res.json());
};

// export const createJson = () => {
//   return `
// {
//   "sip": 16,
//   "name": "Degen#2",
//   "image": "ipfs://QmaSjpJBMSDJ8x8FfL2Kcf2n7eNpDagqXtUhfNTAym5CwR",
//   "attributes": [
//     {
//       "trait_type": "Background",
//       "value": "BlueOpaque"
//     },
//     {
//       "trait_type": "Car",
//       "value": "LamboBlue"
//     },
//     {
//       "trait_type": "Rims",
//       "value": "ClassyGold"
//     },
//     {
//       "trait_type": "Type",
//       "value": "Alien"
//     },
//     {
//       "trait_type": "Head",
//       "value": "Samurai"
//     },
//     {
//       "trait_type": "Face",
//       "value": "Cuban"
//     }
//   ],
//   "properties": {
//     "collection": "DegenNFT"
//   }
// }
// `;
// };

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
  }`;
  return metadata;
};
