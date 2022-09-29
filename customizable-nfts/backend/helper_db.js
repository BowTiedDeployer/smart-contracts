import { MongoClient } from 'mongodb';
import { network, operationType } from './consts.js';
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

// console.log(await dbReadCurrentId());

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

export const dbReadLastExecutedBlockId = async () => {
  try {
    await client.connect();
    return (await client.db().collection(collectionId[network]).findOne())?.lastExecutedBlockId;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

// console.log(await dbReadCurrentId());

export const dbUpdateLastExecutedBlockId = async (currentLastExecuted, updatedLastExecuted) => {
  try {
    await client.connect();
    const lastExecutedBlockIdDb = client.db().collection(collectionId[network]);
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

export const dbGetTxId = async (operation) => {
  try {
    await client.connect();
    const result = await client.db().collection(collectionId[network]).findOne();
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

export const dbUpdateTxId = async (operation, txId) => {
  try {
    await client.connect();
    const currentIdDb = client.db().collection(collectionId[network]);
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

export const dbReadLastDone = async () => {
  try {
    await client.connect();
    return (await client.db().collection(collectionId[network]).findOne())?.lastDone;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const dbUpdateLastDone = async (nowDone) => {
  try {
    await client.connect();
    const currentIdDb = client.db().collection(collectionId[network]);
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

let lastDone = await dbReadLastDone();
console.log('lastDone', lastDone);

// await dbUpdateLastDone('merge');
// lastDone = await dbReadLastDone();
// console.log('lastDone', lastDone);
