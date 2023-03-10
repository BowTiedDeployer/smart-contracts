const fs = require('fs');
const path = require('path');

// Set the field name and value to search for
const fieldName = 'trait_type';
const fieldValue = 'Background';
const mapAttributes = {
  backgrounds: {},
  cars: {},
  type: {},
  rims: {},
  face: {},
  head: {},
};

// each NFT has a rarity
// place them all in an array/map
const rarity = [0];

const worthBuying = [];

// const listBackgrounds=[]
// Set the directory where the JSON files are stored
const dir = '../files_stored/jsons';

// Initialize a counter variable to keep track of the number of matching fields
let counter = 0;

// Read each file in the directory
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }

  // Iterate over each file
  files.forEach((file) => {
    // Construct the full path to the file
    const filePath = path.join(dir, file);

    // Read the contents of the file
    const fileContents = fs.readFileSync(filePath);

    // Parse the JSON data
    const jsonData = JSON.parse(fileContents);
    const jsonAttributes = jsonData.attributes;

    // Iterate over the attributes array and search for the field with the specified name and value
    if (mapAttributes['backgrounds'][jsonAttributes[0].value]) mapAttributes['backgrounds'][jsonAttributes[0].value]++;
    else mapAttributes['backgrounds'][jsonAttributes[0].value] = 1;

    if (mapAttributes['cars'][jsonAttributes[1].value]) mapAttributes['cars'][jsonAttributes[1].value]++;
    else mapAttributes['cars'][jsonAttributes[1].value] = 1;

    if (mapAttributes['type'][jsonAttributes[2].value]) mapAttributes['type'][jsonAttributes[2].value]++;
    else mapAttributes['type'][jsonAttributes[2].value] = 1;

    if (mapAttributes['face'][jsonAttributes[3].value]) mapAttributes['face'][jsonAttributes[3].value]++;
    else mapAttributes['face'][jsonAttributes[3].value] = 1;

    if (mapAttributes['rims'][jsonAttributes[4].value]) mapAttributes['rims'][jsonAttributes[4].value]++;
    else mapAttributes['rims'][jsonAttributes[4].value] = 1;

    if (mapAttributes['head'][jsonAttributes[5].value]) mapAttributes['head'][jsonAttributes[5].value]++;
    else mapAttributes['head'][jsonAttributes[5].value] = 1;

    if (
      jsonAttributes[1].value == 'Gold' ||
      jsonAttributes[2].value == 'Monkey-Pink' ||
      jsonAttributes[3].value == 'Cool-Glasses' ||
      jsonAttributes[3].value == 'Pipe' ||
      jsonAttributes[4].value == 'WGold' ||
      jsonAttributes[5].value == 'Crown' ||
      jsonAttributes[5].value == 'Exposed-Brain'
    )
      worthBuying.push(jsonData.name.split('#')[1]);
  });

  // console.log(mapAttributes);

  // console.log(worthBuying.filter((item) => item >= 0 && item <= 100));
});

// Read each file in the directory
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }

  // Iterate over each file
  files.forEach((file) => {
    // Construct the full path to the file
    const filePath = path.join(dir, file);

    // Read the contents of the file
    const fileContents = fs.readFileSync(filePath);

    // Parse the JSON data
    const jsonData = JSON.parse(fileContents);
    const jsonAttributes = jsonData.attributes;

    let rarityNTF =
      mapAttributes['backgrounds'][jsonAttributes[0].value] *
      mapAttributes['cars'][jsonAttributes[1].value] *
      mapAttributes['type'][jsonAttributes[2].value] *
      mapAttributes['face'][jsonAttributes[3].value] *
      mapAttributes['rims'][jsonAttributes[4].value] *
      mapAttributes['head'][jsonAttributes[5].value];
    // console log each mapAttribute from above

    rarity.push(rarityNTF);
  });

  for (let i = 0; i < rarity.length; i++) {
    console.log(rarity[i]);
  }
});
