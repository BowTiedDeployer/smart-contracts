export const getAttributesMapTraitValue = (json) => {
  let attr = {};
  for (const attribute of json.attributes) {
    attr[attribute.trait_type] = attribute.value;
  }
  return attr;
};

export const getImgUrlFromJson = async (json) => {
  return json.image;
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
