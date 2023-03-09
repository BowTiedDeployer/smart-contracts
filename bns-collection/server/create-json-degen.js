const fs = require('fs');

// Loop through 1000 times to create 1000 JSON files
for (let i = 1; i <= 1000; i++) {
  // Create the JSON object
  const jsonObject = `{
    "sip": 16,
    "name": "BitcoinDegen#${i}",
    "image": "https://stacksdegens.com/bitcoin-degens/images/${i}.png",
    "attributes": [
      {
        "trait_type": "unknown",
        "value": "unknown"
      }
    ],
    "properties": {
      "image_game": "https://stacksdegens.com/bitcoin-degens/in-game/${i}.png",
      "collection": "BitcoinDegens"
    }
  }`;

  // Convert the object to JSON string

  fs.writeFileSync(`../files_stored/empty_jsons/${i}.json`, jsonObject);
}
