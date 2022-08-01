import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import fs from 'fs';

const prefix = './components/';
const pathCarsGen = './generated/images/cars/';
const bentleyColors = prefix + 'BentleyColors/';
const lamboColors = prefix + 'LamboColors/';

// Generate all NYC Heads

// Goes through all bentleys and lambos
fs.readdir(bentleyColors, (err, colors) => {
  colors.forEach((color) => {
    const colorName = color.split('.')[0];
    generateCar('Bentley', color, colorName);
  });
});

fs.readdir(lamboColors, (err, colors) => {
  colors.forEach((color) => {
    const colorName = color.split('.')[0];
    generateCar('Lambo', color, colorName);
  });
});

async function generateCar(type, color, colorName) {
  const colorPath = type == 'Lambo' ? lamboColors + color : type == 'Bentley' ? bentleyColors + color : '';
  const carContour =
    type == 'Lambo' ? prefix + 'LamboContour.png' : type == 'Bentley' ? prefix + 'BentleyContour.png' : '';

  const img = await mergeImages([colorPath, carContour], {
    Canvas: Canvas,
    Image: Image,
  }).then((b64) => {
    return b64;
  });

  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');
  fs.writeFile(pathCarsGen + colorName + '.png', buf, function (err, result) {
    if (err) console.log('error', err);
  });
}
