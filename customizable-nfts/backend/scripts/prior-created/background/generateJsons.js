import fs from 'fs';
import { jsonContentCreate } from '../../../helper_json.js';

// Backgrounds
// takes all the backgrounds from the folder
// create json calling composeMetadata(file-name, ipfs+file-name.png, [{trait_type: 'Background', value: file-name,}], 'DegenBackgrounds')
const pathBgGenerated = './generated/';
const pathBgImg = './images/';

fs.readdir(pathBgImg, (err, backgrounds) => {
  backgrounds.forEach((background) => {
    const backgroundName = background.split('.')[0];
    const metadata = jsonContentCreate(
      backgroundName,
      `ipfs://QmXweB6wjPHoVoBQWYFUz75TMAPXJGbncyffvxQoaYTria/${background}`,
      `ipfs://QmXweB6wjPHoVoBQWYFUz75TMAPXJGbncyffvxQoaYTria/${background}`,
      '',
      { Background: backgroundName },
      'DegenBackgrounds'
    );
    fs.writeFile(pathBgGenerated + backgroundName + '.json', metadata, function (err, result) {
      if (err) console.log('error', err);
    });
  });
});
