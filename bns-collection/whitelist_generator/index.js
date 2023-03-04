const fs = require('fs');

// Replace "filename.csv" with the actual filename of your CSV file
const filename = 'owners.csv';

// Open the output file for writing
const outputFile = fs.createWriteStream('smart-contract.txt', { flags: 'w' });

// Read the CSV file and split it into lines
const fileContents = fs.readFileSync(filename, 'utf8');
const lines = fileContents.trim().split('\n');

// Loop through each line and output the message to the output file
lines.forEach((line) => {
  let [address, numero] = line.split(',');
  numero = parseInt(numero.slice(1, -1));
  const message = `(map-set whitelist-spots ${address} u${parseInt(numero) * 5})\n`;
  outputFile.write(message);
});

// Close the output file
outputFile.end();
