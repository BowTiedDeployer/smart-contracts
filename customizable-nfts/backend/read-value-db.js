import { MongoClient } from 'mongodb';
import { network } from './consts.js';
const uri =
  'mongodb+srv://CustomizableUser:CustomizablePass@customizablenftscluster.fo7cge1.mongodb.net/CustomizableDB?retryWrites=true&w=majority';

const collectionId = {
  mainnnet: 'Mainnet',
  testnet: 'Testnet',
  mocknet: 'Devnet',
};

const client = new MongoClient(uri);

export const dbReadCurrentId = async () => {
  try {
    await client.connect();
    return (await client.db().collection(collectionId[network]).findOne())?.currentId;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

console.log(await dbReadCurrentId());

export const dbIncremendId = async (currId) => {
  try {
    await client.connect();
    const currentIdDb = client.db().collection(collectionId[network]);
    await currentIdDb.updateOne({ currentId: currId }, { $set: { currentId: currId + 1 } });
    client.close();
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

await dbIncremendId(3);
