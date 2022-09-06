import fs from 'fs';
import { jsonContentCreate } from '../../../helper_json.js';

// Heads
// extra step

const pathHeadGenerated = './generated/jsons/';
const pathHeadNYCImg = './AlienHead/';
const pathFaceNYCImg = './AlienFace/';
const pathHeadMiamiImg = './SkullHead/';
const pathFaceMiamiImg = './SkullFace/';

// read every combination from nyc and create all possible heads in json format

// read every combination from miami and create all possible heads in json format

// const pathHeadImg = prefix + 'Head/';

// Goes through all NYC heads and faces
fs.readdir(pathHeadNYCImg, (err, heads) => {
  heads.forEach((head) => {
    const headName = head.split('.')[0];
    fs.readdir(pathFaceNYCImg, (err, faces) => {
      faces.forEach((face) => {
        const faceName = face.split('.')[0];

        const metadata = jsonContentCreate(
          'NYC_' + headName + '_' + faceName,
          `ipfs://QmeBHNDwNUvwDR9rDT4Vh3oXCxsLyMSLwV2oPk8uAdQpxK/NYC_${headName}_${faceName}.png`, // marketplace - to be done
          `ipfs://QmeBHNDwNUvwDR9rDT4Vh3oXCxsLyMSLwV2oPk8uAdQpxK/NYC_${headName}_${faceName}.png`, // for assemble
          `ipfs://QmeBHNDwNUvwDR9rDT4Vh3oXCxsLyMSLwV2oPk8uAdQpxK/Alien.png`, // in game - to be done
          { Race: 'Alien', Head: headName, Face: faceName },
          'DegenHeads'
        );
        fs.writeFile(
          pathHeadGenerated + 'NYC_' + headName + '_' + faceName + '.json',
          metadata,
          function (err, result) {
            if (err) console.log('error', err);
          }
        );
      });
    });
  });
});

fs.readdir(pathHeadMiamiImg, (err, heads) => {
  heads.forEach((head) => {
    const headName = head.split('.')[0];
    fs.readdir(pathFaceMiamiImg, (err, faces) => {
      faces.forEach((face) => {
        const faceName = face.split('.')[0];

        const metadata = jsonContentCreate(
          'Miami_' + headName + '_' + faceName,
          `ipfs://QmeBHNDwNUvwDR9rDT4Vh3oXCxsLyMSLwV2oPk8uAdQpxK/Miami_${headName}_${faceName}.png`, // marketplace - to be done
          `ipfs://QmeBHNDwNUvwDR9rDT4Vh3oXCxsLyMSLwV2oPk8uAdQpxK/Miami_${headName}_${faceName}.png`, // for assemble
          `ipfs://QmdorTWEvWbAyDB7vybjxcyET69SCyJjEjGdfhZDC5aaTq/Skull.png`, // in game - to be done
          { Race: 'Skull', Head: headName, Face: faceName },
          'DegenHeads'
        );
        fs.writeFile(
          pathHeadGenerated + 'Miami_' + headName + '_' + faceName + '.json',
          metadata,
          function (err, result) {
            if (err) console.log('error', err);
          }
        );
      });
    });
  });
});
