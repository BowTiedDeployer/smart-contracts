import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import fs from 'fs';

const prefix = './';
const pathRimsGen = './generated-marketplace/';
const rims = './images/';

// Generate all Rims for marketplace
async function generateRim(rim) {
  const rimPath = rims + rim;
  console.log(rimPath);

  // x: -124, y: -455
  const img = await mergeImages([{ src: rimPath, x: -74, y: -400 }], {
    width: 240,
    height: 240,
    Canvas: Canvas,
    Image: Image,
  }).then((b64) => {
    return b64;
  });

  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');
  fs.writeFile(pathRimsGen + rim, buf, function (err, result) {
    if (err) console.log('error', err);
  });
}

// Goes through all NYC heads and faces
fs.readdir(rims, (err, rims) => {
  rims.forEach((rim) => {
    generateRim(rim);
  });
});
