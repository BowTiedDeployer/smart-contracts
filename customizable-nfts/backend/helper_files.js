import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import fs from 'fs';

export const saveFile = async (filePath, fileContent) => {
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) console.log('error', err);
  });
};

export const deleteFile = async (filePath) => {
  // fs.unlinkSync(filePath);
  fs.unlink(filePath, (err, data) => {
    if (err) console.error('ERROR', err);
    else console.log(`DELETED FILE ${filePath}`);
  });
};

export const imgProfileContentCreate = async (backgroundPath, carPath, rimsPath, headPath) => {
  const img = await mergeImages([backgroundPath, carPath, rimsPath, headPath], {
    Canvas: Canvas,
    Image: Image,
  }).then((b64) => {
    return b64;
  });

  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const imgContent = Buffer.from(data, 'base64');
  return imgContent;
};

export const imgInGameContentCreate = async (carPath, headPath) => {
  const img = await mergeImages([carPath, headPath], {
    Canvas: Canvas,
    Image: Image,
  }).then((b64) => {
    return b64;
  });

  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const imgContent = Buffer.from(data, 'base64');
  return imgContent;
};
