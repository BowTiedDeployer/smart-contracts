import fs from 'fs';
import { jsonContentCreate } from '../../../helper_json.js';

// Rims
const pathRimsGenerated = './generated/';
const pathRimsImg = './images/';

fs.readdir(pathRimsImg, (err, rims) => {
  rims.forEach((rim) => {
    const rimName = rim.split('.')[0];
    const metadata = jsonContentCreate(
      rimName,
      `ipfs://QmWBHgQFLKpXW8EnU6LeRXcU2iZRCpsSMCgfnb7G6obA31/${rim}`, // marketplace - to be done
      `ipfs://QmWBHgQFLKpXW8EnU6LeRXcU2iZRCpsSMCgfnb7G6obA31/${rim}`, // for assemble
      '',
      { Rims: rimName },
      'DegenRims'
    );
    fs.writeFile(pathRimsGenerated + rimName + '.json', metadata, function (err, result) {
      if (err) console.log('error', err);
    });
  });
});
