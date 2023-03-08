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

    if (mapAttributes['rims'][jsonAttributes[3].value]) mapAttributes['rims'][jsonAttributes[3].value]++;
    else mapAttributes['rims'][jsonAttributes[3].value] = 1;

    if (mapAttributes['face'][jsonAttributes[4].value]) mapAttributes['face'][jsonAttributes[4].value]++;
    else mapAttributes['face'][jsonAttributes[4].value] = 1;

    if (mapAttributes['head'][jsonAttributes[5].value]) mapAttributes['head'][jsonAttributes[5].value]++;
    else mapAttributes['head'][jsonAttributes[5].value] = 1;
  });
  console.log(mapAttributes);

  // {
  //   backgrounds: { 'Lux Yellow': 337, 'Pine Green': 357, 'Deep Magenta': 306 },
  //   cars: {
  //     Black: 245,
  //     Green: 159,
  //     Brown: 145,
  //     Gold: 60,
  //     Sand: 288,
  //     'Blue-Light': 103
  //   },
  //   rims: {
  //     WSand: 1,
  //     'Monkey-Brown': 714,
  //     'Monkey-Dark': 227,
  //     'Monkey-Pink': 57,
  //     WBlack: 1
  //   },
  //   type: {
  //     'Monkey-Brown': 1,
  //     'Empty-Face': 280,
  //     Teeth: 122,
  //     Pipe: 61,
  //     Smile: 126,
  //     Pierce: 153,
  //     Uuu: 121,
  //     Surprized: 88,
  //     'Cool-Glasses': 47,
  //     'Monkey-Dark': 1
  //   },
  //   head: {
  //     Horns: 1,
  //     WBlack: 251,
  //     WGrey: 158,
  //     WAlloy: 117,
  //     WGold: 58,
  //     WSand: 265,
  //     WGreen: 149,
  //     Headphones: 1
  //   },
  //   face: {
  //     Pierce: 1,
  //     Headphones: 168,
  //     'Empty-Head': 272,
  //     Helmet: 126,
  //     'Team-Cap': 174,
  //     Horns: 129,
  //     'Exposed-Brain': 76,
  //     Crown: 53,
  //     Smile: 1
  //   }
  // }
});
