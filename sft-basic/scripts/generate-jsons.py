import json

# Data to be written

elements = [
  "Wooden",
  "Iron",
  "Enhanced",
]
levels=["1","2","3"]
items=["Sword","Armor","Shield","Helmet","Shoes"]

def get_duck_string(element, item, level, token_id):
  return """{
  "sip": 16,
  "name": "%s %s %s",
  "image": "ipfs://QmS57rKdQB7ioMsg5PNUdyzzQnZpfzPZF5G63E1xkGci4w/%s.png",
  "attributes": [
    {
      "trait_type": "type",
      "value": "%s"
    },
    {
      "trait_type": "level",
      "display_type": "number",
      "value": %s
    },
    {
      "trait_type": "element",
      "value": "%s"
    }
  ],
  "properties": {
      "image_in_game":  "ipfs://content_here/%s.png",
      "collection":  "Base_Game_SFTs"
  }
}
"""%(element,item,level,token_id,item,level,element,token_id)

for i in range(5,50):
  with open("jsons-nft/%s.json"%i, "w") as outfile:
    outfile.write(get_duck_string(elements[(i-5)%9//3],items[(i-5)//9],levels[(i-5)%3],i))