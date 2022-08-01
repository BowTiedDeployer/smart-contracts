import fetch from 'node-fetch';
import { metadataOldDegensSrc } from './consts.js';
import { getAttributesMapTraitValue } from './merge_helper_functions.js';

// get value from queue
const getMergeValueFromQueue = () => {
  return { member: "'Sp1231232131", degenId: 23, degenType: 'miami' };
};

// take old json
let value = getMergeValueFromQueue();
// fetch json
let dataJson = await fetch(metadataOldDegensSrc[value.degenType](value.degenId)).then((response) => {
  return response.json();
});
// create new image from json ( on nyc pick only car, not accent )
console.log(dataJson);
console.log(dataJson.attributes);

const attr = getAttributesMapTraitValue(dataJson);

// upload image and get hash

// modify json to be standard:

// add ipfs img hash to json and id

// upload json to pinata

// call merge_finalize with (value.member, json url)

// increment id
