import cron from 'node-cron';
import { checkToStartFlowAssemble } from './assemble.js';
import { network, operationType, urlApis, wallets } from './consts.js';
import { checkToStartFlowDisassemble } from './disassemble.js';
import { dbReadLastDone } from './helper_db.js';
import { getMempoolTransactionCount } from './helper_sc.js';
import { checkToStartFlowMerge } from './merge.js';
import { checkToStartFlowSwap } from './swap.js';

const every_five_minutes = async () => {
  const transactionCount = await getMempoolTransactionCount(wallets.admin[network]);
  let operationLimit = 4;

  while (operationLimit > 0) {
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

cron.schedule('0-59/5 * * * *', () => {
  every_five_minutes();
});
