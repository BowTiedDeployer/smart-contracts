//import cron from 'node-cron';
import { checkToStartFlowAssemble } from './assemble.js';
import { network, operationType, urlApis, wallets } from './consts.js';
import { checkToStartFlowDisassemble } from './disassemble.js';
import { dbReadLastDone, dbReadLastExecutedBlockId, dbUpdateLastExecutedBlockId } from './helper_db.js';
import { getAccountNonce, getBlockHeight, getMempoolTransactionCount } from './helper_sc.js';
import { checkToStartFlowMerge } from './merge.js';
import { checkToStartFlowSwap } from './swap.js';
import { getNrOperationsAvailable, setNrOperationsAvailable, setWalletStoredNonce } from './variables.js';

const every_five_minutes = async () => {
  const transactionCount = await getMempoolTransactionCount(wallets.user[network]);
  console.log(await transactionCount);
  setNrOperationsAvailable(getNrOperationsAvailable() - transactionCount);
  console.log('---Nr Operations Available: ' + getNrOperationsAvailable());
  const blcokchainNextNonce = await getAccountNonce(wallets[wallets.user.name][network]);
  setWalletStoredNonce(wallets.user.name, blcokchainNextNonce);
  const lastExecutedBlockId = await dbReadLastExecutedBlockId();
  const currentBlockId = await getBlockHeight();
  console.log(await getBlockHeight, await dbReadLastExecutedBlockId());
  console.log(currentBlockId);
  if (lastExecutedBlockId === currentBlockId) {
    console.log('same Block, wait for a new block to start');
    return;
  } else if (lastExecutedBlockId > currentBlockId) {
    console.log('ERROR: last executed block > current block');
    return;
  }
  await dbUpdateLastExecutedBlockId(lastExecutedBlockId, currentBlockId);
  let operationLimit = 4;
  while (operationLimit > 0 && getNrOperationsAvailable() > 0) {
    let lastOperation = await dbReadLastDone();
    console.log('lastOperation: ', lastOperation);

    switch (lastOperation) {
      case operationType.assemble:
        console.log('recurrent disassemble check start');
        await checkToStartFlowDisassemble();
        operationLimit -= 1;
        break;
      case operationType.disassemble:
        console.log('recurrent merge check start');
        await checkToStartFlowMerge();
        operationLimit -= 1;
        break;
      case operationType.merge:
        console.log('recurrent swap check start');
        await checkToStartFlowSwap();
        operationLimit -= 1;
        break;
      case operationType.swap:
        console.log('recurrent assemble check start');
        await checkToStartFlowAssemble();
        operationLimit -= 1;
        break;
      default:
        console.error(`invalid`);
        return null;
    }
  }
};
every_five_minutes();

// cron.schedule('*/5 * * * *', () => {
//   every_five_minutes();
// });
