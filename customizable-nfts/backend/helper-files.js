import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import fs from 'fs';

export const saveFile = (filePath, fileContent) => {
  fs.writeFile(filePath, fileContent, function (err, result) {
    if (err) console.log('error', err);
  });
};

export const imgContentCreate = async (backgroundPath, bodyPath, carPath, headPath) => {
  const img = await mergeImages(
    [
      'https://stxnft.mypinata.cloud/ipfs/QmXweB6wjPHoVoBQWYFUz75TMAPXJGbncyffvxQoaYTria/DarkPurple.png',
      'https://stxnft.mypinata.cloud/ipfs/QmY6NmxfHYRvW4q2jvkUbYqJto6boQG8RScwUkuie3gbjD/BentleyBlack.png',
      'https://stxnft.mypinata.cloud/ipfs/QmWBHgQFLKpXW8EnU6LeRXcU2iZRCpsSMCgfnb7G6obA31/ClassyCream.png',
    ],
    {
      Canvas: Canvas,
      Image: Image,
    }
  ).then((b64) => {
    return b64;
  });

  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const imgContent = Buffer.from(data, 'base64');
  return imgContent;
};
