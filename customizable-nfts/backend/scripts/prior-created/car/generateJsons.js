import fs from 'fs';
import { jsonContentCreate } from '../../../helper_json.js';

// Cars
const pathCarGenerated = './generated/';
const pathCarImg = './images/';

fs.readdir(pathCarImg, (err, cars) => {
  cars.forEach((car) => {
    const carName = car.split('.')[0];
    const metadata = jsonContentCreate(
      carName,
      `ipfs://QmY6NmxfHYRvW4q2jvkUbYqJto6boQG8RScwUkuie3gbjD/${car}`, // marketplace - to be done
      `ipfs://QmY6NmxfHYRvW4q2jvkUbYqJto6boQG8RScwUkuie3gbjD/${car}`, // for assemble
      `ipfs://QmXivFXDKXgnECXN7ckPf8KHXn6mogvHwLsdT1rAfCCU72/${car}`, // in game
      { Car: carName },
      'DegenCars'
    );
    fs.writeFile(pathCarGenerated + carName + '.json', metadata, function (err, result) {
      if (err) console.log('error', err);
    });
  });
});
