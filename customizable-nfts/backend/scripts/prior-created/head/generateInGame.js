import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import fs from 'fs';

const prefix = './';
const pathHeadsGen = './generated/in-game/';
const alienFace = './AlienFaceGame/';
const alienHead = './AlienHeadGame/';
const skullFace = './SkullFaceGame/';
const skullHead = './SkullHeadGame/';

// Generate all NYC Heads
async function generateHead(city, head, face, headName, faceName) {
  const headPath = city == 'NYC' ? alienHead + head : city == 'Miami' ? skullHead + head : '';
  const facePath = city == 'NYC' ? alienFace + face : city == 'Miami' ? skullFace + face : '';
  const race = city == 'NYC' ? prefix + 'AlienGame.png' : city == 'Miami' ? prefix + 'SkullGame.png' : '';

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

// Goes through all Miami heads and faces
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
