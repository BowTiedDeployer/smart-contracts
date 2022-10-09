import { MongoClient } from 'mongodb';
import { network, operationType } from './consts.js';
// const uri = process.env.DB_CONNECTION;
// 'mongodb+srv://CustomizableUser:CustomizablePass@customizablenftscluster.fo7cge1.mongodb.net/CustomizableDB?retryWrites=true&w=majority';
const uri = 'mongodb+srv://Radone:Radone@learningcluster.8d0t2ys.mongodb.net/_devnet?retryWrites=true&w=majority';
const customizableNFTInfo = 'CustomizableNFTInfo';
const NFTIndex = 'NFTIndex';

const client = new MongoClient(uri);

export const dbReadCurrentId = async () => {
  try {
    await client.connect();
    return (await client.db().collection(customizableNFTInfo).findOne())?.currentId;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// console.log(await dbReadCurrentId());

export const dbIncremendCurrentId = async (currId) => {
  try {
    await client.connect();
    const currentIdDb = client.db().collection(customizableNFTInfo);
    await currentIdDb.updateOne({ currentId: currId }, { $set: { currentId: currId + 1 } });
    client.close();
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// await dbIncremendId(await dbReadCurrentId());
// console.log(await dbReadCurrentId());

export const dbReadId = async (component) => {
  try {
    await client.connect();
    return (await client.db().collection(customizableNFTInfo).findOne())?.[`${component}Id`];
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// console.log(await dbReadId('head'));

export const dbIncremendId = async (component, currentId) => {
  try {
    await client.connect();
    const currentIdDb = client.db().collection(customizableNFTInfo);
    await currentIdDb.updateOne({ [`${component}Id`]: currentId }, { $set: { [`${component}Id`]: currentId + 1 } });
    client.close();
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// await dbIncremendId('head', await dbReadId('head'));
// console.log(await dbReadId('head'));

export const dbReadLastExecutedBlockId = async () => {
  try {
    await client.connect();
    return (await client.db().collection(customizableNFTInfo).findOne())?.lastExecutedBlockId;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// console.log(await dbReadLastExecutedBlockId());

export const dbUpdateLastExecutedBlockId = async (currentLastExecuted, updatedLastExecuted) => {
  try {
    await client.connect();
    const lastExecutedBlockIdDb = client.db().collection(customizableNFTInfo);
    await lastExecutedBlockIdDb.updateOne(
      { lastExecutedBlockId: currentLastExecuted },
      { $set: { lastExecutedBlockId: updatedLastExecuted } }
    );
    client.close();
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// await dbUpdateLastExecutedBlockId(await dbReadLastExecutedBlockId(), 232);
// console.log(await dbReadLastExecutedBlockId());

export const dbGetTxId = async (operation) => {
  try {
    await client.connect();
    const result = await client.db().collection(customizableNFTInfo).findOne();
    switch (operation) {
      case operationType.merge:
        return result?.mergeTxId;
        break;
      case operationType.assemble:
        return result?.assembleTxId;
        break;
      case operationType.disassemble:
        return result?.disassembleTxId;
        break;
      case operationType.swap:
        return result?.swapTxId;
        break;
      default:
        return null;
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// console.log(await dbGetTxId('merge'));

export const dbUpdateTxId = async (operation, txId) => {
  try {
    await client.connect();
    const currentIdDb = client.db().collection(customizableNFTInfo);
    switch (operation) {
      case operationType.merge:
        await currentIdDb.updateOne({}, { $set: { mergeTxId: txId } });
        break;
      case operationType.assemble:
        await currentIdDb.updateOne({}, { $set: { assembleTxId: txId } });
        break;
      case operationType.disassemble:
        await currentIdDb.updateOne({}, { $set: { disassembleTxId: txId } });
        break;
      case operationType.swap:
        await currentIdDb.updateOne({}, { $set: { swapTxId: txId } });
        break;
      default:
        console.error(`invalid operation ${txId}`);
        // throw new Error(`invalid operation ${txId}`);
        return null;
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// await dbUpdateTxId('merge', '3122311');
// console.log(await dbGetTxId('merge'));

export const dbReadLastDone = async () => {
  try {
    await client.connect();
    return (await client.db().collection(customizableNFTInfo).findOne())?.lastDone;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// console.log(await dbReadLastDone());

export const dbUpdateLastDone = async (nowDone) => {
  try {
    await client.connect();
    const currentIdDb = client.db().collection(customizableNFTInfo);
    // await currentIdDb.updateOne({}, { $set: { lastDone: nowDone } });

    let matchedCount = 0;
    switch (nowDone) {
      case operationType.assemble:
        const resultAssemble = await currentIdDb.updateOne({ lastDone: 'swap' }, { $set: { lastDone: nowDone } });
        matchedCount = resultAssemble.matchedCount;
        break;
      case operationType.disassemble:
        const resultDisassemble = await currentIdDb.updateOne(
          { lastDone: 'assemble' },
          { $set: { lastDone: nowDone } }
        );
        matchedCount = resultDisassemble.matchedCount;
        break;
      case operationType.merge:
        const resultMerge = await currentIdDb.updateOne({ lastDone: 'disassemble' }, { $set: { lastDone: nowDone } });
        matchedCount = resultMerge.matchedCount;
        break;
      case operationType.swap:
        const resultSwap = await currentIdDb.updateOne({ lastDone: 'merge' }, { $set: { lastDone: nowDone } });
        matchedCount = resultSwap.matchedCount;
        break;
      default:
        console.error(`invalid operation ${nowDone}`);
        return null;
    }

    if (matchedCount === 0) {
      console.error(`cannot update to ${nowDone}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// await dbUpdateLastDone('swap');
// console.log(await dbReadLastDone());

export const dbInsertNFTINdex = async (collection, id, name, json_url, img_marketplace, img_utility) => {
  try {
    await client.connect();
    const currentIdDb = client.db().collection(NFTIndex);
    await currentIdDb.insertOne({ collection, id, name, json_url, img_marketplace, img_utility });
    client.close();
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
// await dbInsertNFTINdex(
//   'stacksdegens',
//   24,
//   'Degen#24',
//   'ipfs:/bafkreia3yegwahw4w27cindmbz3wp5vbexdjyouttwjp5wiy75stqe67c4',
//   'ipfs://bafybeidzvpeh4pof7ty346f3bxvenpj6cqszrwt7s4gvzt2gudwrykqpsa',
//   'ipfs://bafkreifuzjosxtoq6o5oke7fiueo7kwznj2jov6imwd7kcpw2crjkhgyou'
// );

// await dbIncremendId(3);
// console.log(operationType.assemble, await dbUpdateTxId(operationType.assembledsa, '1assemble132sda'));
// console.log(operationType.disassemble, await dbUpdateTxId(operationType.disassemble, '1disassemble132sda'));
// console.log(operationType.merge, await dbUpdateTxId(operationType.merge, '1merge132sda'));
// console.log(operationType.swap, await dbUpdateTxId(operationType.swap, '1swap132sda'));

// console.log(operationType.assemble, await dbGetTxId(operationType.assemble));
// console.log(operationType.disassemble, await dbGetTxId(operationType.disassemble));
// console.log(operationType.merge, await dbGetTxId(operationType.merge));
// console.log(operationType.swap, await dbGetTxId(operationType.swap));

// let currentDbId = await dbReadCurrentId();
// console.log('currentDbId', currentDbId);
// await dbIncremendId(currentDbId);
// currentDbId = await dbReadCurrentId();
// console.log('currentDbId', currentDbId);

// let txIdAssemble = await dbGetTxId(operationType.assemble);
// console.log('txIdAssemble', txIdAssemble);
// await dbUpdateTxId(operationType.assemble, '2assemble45432');
// let txIdAssemble = await dbGetTxId(operationType.assemble);
// console.log('txIdAssemble', txIdAssemble);

// let lastDone = await dbReadLastDone();
// console.log('lastDone', lastDone);

// await dbUpdateLastDone('merge');
// lastDone = await dbReadLastDone();
// console.log('lastDone', lastDone);
