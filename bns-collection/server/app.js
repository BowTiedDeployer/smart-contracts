import express from 'express';
const app = express();
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 5000;

app.get('/test', (req, res) => {
  res.send('test: Hello world!');
});

app.get('/jsons/:name', (req, res) => {
  const json_name = req.params.name;
  fs.readFile(`./../files_stored/jsons/${json_name}`, (err, data) => {
    // if (err) res.status(500).send(err);
    if (err) res.status(404).send('Missing File');
    else res.send(JSON.parse(data));
  });
});

app.get('/images/:name', (req, res) => {
  const image_name = req.params.name;
  res.sendFile(path.join(__dirname, `../files_stored/images/${image_name}`), (err) => {
    if (err) res.status(404).send('Missing File');
  });
});

app.get('/in-game/:name', (req, res) => {
  const image_name = req.params.name;
  res.sendFile(path.join(__dirname, `../files_stored/in-game/${image_name}`), (err) => {
    if (err) res.status(404).send('Missing File');
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
