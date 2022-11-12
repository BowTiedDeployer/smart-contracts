import express from 'express';
const app = express();
import fs from 'fs';
import path from 'path';


app.get('/', (req, res)=>{
  res.json({
    number: 1
  })
})

app.get('/:json_nr', (req, res) => {
  const nr = parseInt(req.params.json_nr);
  console.log(nr);
  // res.json(nr);
  fs.readFile(`./jsons/${nr}`, (err, data)=>{
    if (err) res.status(500).send(err)
    else res.send(JSON.parse(data));
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});