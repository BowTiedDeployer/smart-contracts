import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import fs from 'fs';

const prefix = './';
const pathCarGen = './generated-marketplace/';
const cars = './images/';

// Generate all Cars for marketplace
async function generateCar(car) {
  const carPath = cars + car;
  console.log(carPath);

  const img = await mergeImages([{ src: carPath, x: -40, y: -110 }], {
    width: 730,
    height: 730,
    Canvas: Canvas,
    Image: Image,
  }).then((b64) => {
    return b64;
  });

  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');
  fs.writeFile(pathCarGen + car, buf, function (err, result) {
    if (err) console.log('error', err);
  });
}

// Goes through all cars
fs.readdir(cars, (err, cars) => {
  cars.forEach((car) => {
    generateCar(car);
  });
});
