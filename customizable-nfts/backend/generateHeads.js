import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import fs from 'fs';

const prefix = './components/';
const pathHeadsGen = './generated/images/heads/';
const alienFace = prefix + 'AlienFace/';
const alienHead = prefix + 'AlienHead/';
const skullFace = prefix + 'SkullFace/';
const skullHead = prefix + 'SkullHead/';

// Generate all NYC Heads

// Goes through all NYC heads and faces
fs.readdir(alienHead, (err, heads) => {
  heads.forEach((head) => {
    const headName = head.split('.')[0];
    fs.readdir(alienFace, (err, faces) => {
      faces.forEach((face) => {
        const faceName = face.split('.')[0];
        generateHead('NYC', head, face, headName, faceName);
      });
    });
  });
});

fs.readdir(skullHead, (err, heads) => {
  heads.forEach((head) => {
    const headName = head.split('.')[0];
    fs.readdir(skullFace, (err, faces) => {
      faces.forEach((face) => {
        const faceName = face.split('.')[0];
        generateHead('Miami', head, face, headName, faceName);
      });
    });
  });
});

async function generateHead(city, head, face, headName, faceName) {
  const headPath = city == 'NYC' ? alienHead + head : city == 'Miami' ? skullHead + head : '';
  const facePath = city == 'NYC' ? alienFace + face : city == 'Miami' ? skullFace + face : '';
  const race = city == 'NYC' ? prefix + 'Alien.png' : city == 'Miami' ? prefix + 'Skull.png' : '';

  const img = await mergeImages([race, headPath, facePath], {
    Canvas: Canvas,
    Image: Image,
  }).then((b64) => {
    return b64;
  });

  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');
  fs.writeFile(pathHeadsGen + city + '_' + headName + '_' + faceName + '.png', buf, function (err, result) {
    if (err) console.log('error', err);
  });
}
