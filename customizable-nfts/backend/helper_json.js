export const getAttributesMapTraitValue = (json) => {
  let attr = {};
  for (const attribute of json.attributes) {
    attr[attribute.trait_type] = attribute.value;
  }
  return attr;
};

export const fetchJsonFromUrl = async (jsonUrl) => {
  //example https://stxnft.mypinata.cloud/ipfs/QmbX7UCSFLBvJa2yB4YxqZxhacrxiKUGbE6fHbQuYMhNhf
  return fetch(jsonUrl).then((res) => res.json());
};

export const createJson = () => {
  return `
{
  "sip": 16,
  "name": "Degen#2",
  "image": "ipfs://QmaSjpJBMSDJ8x8FfL2Kcf2n7eNpDagqXtUhfNTAym5CwR",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "BlueOpaque"
    },
    {
      "trait_type": "Car",
      "value": "LamboBlue"
    },
    {
      "trait_type": "Rims",
      "value": "ClassyGold"
    },
    {
      "trait_type": "Type",
      "value": "Alien"
    },
    {
      "trait_type": "Head",
      "value": "Samurai"
    },
    {
      "trait_type": "Face",
      "value": "Cuban"
    }
  ],
  "properties": {
    "collection": "DegenNFT"
  }
}
`;
};

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

export const composeJSON = (name, image, attributes, collection) => {
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
