
# Python program to read
# json file
import json


def getJson(json_nr):
  with open(json_nr, 'r') as f:
    return json.load(f)

def getJsonModified(json_nr, new_name):
  # Iterating through the json
  # list
  data = getJson(json_nr)
  data["name"] = new_name
  return data

# print(getJsonModified("sample.json", "thisName.btc"))

# have jsons to aws
