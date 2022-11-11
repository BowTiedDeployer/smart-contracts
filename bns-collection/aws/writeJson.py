{
  "sip": 16,
  "name": "DarkPurple",
  "image": "ipfs://QmXweB6wjPHoVoBQWYFUz75TMAPXJGbncyffvxQoaYTria/DarkPurple.png",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "DarkPurple"
    }
  ],
  "properties": {
    "collection": "DegenBackgrounds"
  }
}


import json
# import boto3

# s3 = boto3.client('s3')

def lambda_handler(event, context):
  bucket = 'test-refresh-metadata-json.stacksdegens.com'#aws-simplified-transactions'

  transactionToUpload = {}
  transactionToUpload['transactionId'] = '12345'
  transactionToUpload['type'] = 'PURCHASE'
  transactionToUpload['amount'] = 20
  transactionToUpload['customerId'] = 'CID-11111'
  
  fileName = 'CID-11111' + '.json'

  uploadByteStream = bytes(json.dumps(transactionToUpload).encode('UTF-8'))

  # s3.put_object(Bucket=bucket, Key=fileName, Body=uploadByteStream)
  
  print('Put Complete')

from readJson import getJsonModified

def write_json(data):
  dictionary = {
    "sip": 16,
    "name": "DarkPurple",
    "image": "ipfs://QmXweB6wjPHoVoBQWYFUz75TMAPXJGbncyffvxQoaYTria/DarkPurple.png",
    "attributes": [
      {
        "trait_type": "Background",
        "value": "DarkPurple"
      }
    ],
    "properties": {
      "collection": "DegenBackgrounds"
    }
  }

  with open('sample.json', 'w', encoding='utf-8') as outfile:
    # json_object = json.dump(dictionary, outfile, ensure_ascii=False, indent=4)
    json_object = json.dumps(data, indent=2)
    outfile.write(json_object)


write_json(getJsonModified("sample.json", "thisName.btc"))