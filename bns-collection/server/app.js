import express from 'express';
const app = express();
import fs from 'fs';
import path from 'path';

const PORT = 5000;


app.get('/test', (req, res)=>{
  res.json({
    "test: Hello world!"
  })
})

app.get('/jsons/:name', (req, res) => {
  const json_name = req.params.name;
  fs.readFile(`./../files_stored/jsons/${json_name}`, (err, data)=>{
    if (err) res.status(500).send(err)
    else res.send(JSON.parse(data));
  });
});

app.get('/images/:name', (req, res) => {
  const image_name = req.params.name;
  fs.readFile(`./../files_stored/images/${image_name}`, (err, data)=>{
    if (err) res.status(500).send(err)
    else res.send(JSON.parse(data));
  });
});

app.get('/in-game/:name', (req, res) => {
  const image_name = req.params.name;
  fs.readFile(`./../files_stored/in-game/${image_name}`, (err, data)=>{
    if (err) res.status(500).send(err)
    else res.send(JSON.parse(data));
  });
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});