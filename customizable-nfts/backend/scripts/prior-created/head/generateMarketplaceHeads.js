import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import fs from 'fs';

const prefix = './';
const pathHeadGen = './generated-marketplace/';
const heads = './generated/images/';
// x 165
// y 80
// width 665
// height 580
// Generate all Heads for marketplace
const generateHead = async (head) => {
  const headPath = heads + head;
  console.log(headPath);

  // x: -124, y: -455
  const img = await mergeImages([{ src: headPath, x: -185, y: -50 }], {
    width: 500,
    height: 500,
    Canvas: Canvas,
    Image: Image,
  }).then((b64) => {
    return b64;
  });

  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');
  fs.writeFile(pathHeadGen + head, buf, (err, result) => {
    if (err) console.log('error', err);
  });
};

// Goes through all NYC heads and faces
fs.readdir(heads, (err, heads) => {
  heads.forEach((head) => {
    generateHead(head);
  });
});
