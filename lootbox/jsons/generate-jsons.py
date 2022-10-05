
# every json has format ...

def create_json(i):
  return """{
  "sip": 16,
  "name": "Lootbox Background#%s",
  "image": "ipfs://QmciPXBGPDYF57QAHtoRs99ocMqEzJVvsjjmSjGCEV4qp7/%s.png",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Unknown",
    }
  ],
  "properties": {
    "collection": "LootboxBackground"
  }
}
""" % (str(i),str(i))

def save_jsons():
  for i in range(1,256) :
    # print(i)
    with open('pinata-jsons/%s.py'%(str(i)), 'w') as file:
      file.write(create_json(i))

save_jsons()
