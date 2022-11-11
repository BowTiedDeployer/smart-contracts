import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.31.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';
// import { buildPreorderNameTx, buildRegisterNameTx } from '@stacks/bns';
// import { StacksTestnet } from '@stacks/network';

const BNS_CONTRACT_PRINCIPAL = '';
const BNS_CONTRACT_NAME = 'ST000000000000000000002AMW42H.bns';
const FNC_PREORDER = 'preorder';
const FNC_REGISTER = 'register';

// function preorder_name_hash(name: string, salt: string) {
// return hash160(Buffer.concat([Buffer.from(name),typeof salt !== 'string' ? salt : Buffer.from(salt)]));
// }

// TESTS TO BE DONE
// check whitelist functionality
//   check is whitelisted true / false
//   check can mint true/ false

// check payment
// pay integral price
// pay discounted

// check bns functionalities

Clarinet.test({
  name: 'Ensure that <...>',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let block = chain.mineBlock([
      /*
       * Add transactions with:
       * Tx.contractCall(...)
       */
    ]);
    assertEquals(block.receipts.length, 0);
    assertEquals(block.height, 2);

    block = chain.mineBlock([
      /*
       * Add transactions with:
       * Tx.contractCall(...)
       */
    ]);
    assertEquals(block.receipts.length, 0);
    assertEquals(block.height, 3);
  },
});

Clarinet.test({
  name: 'Ensure that can buy name.id',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;

    // const wallet_2 = accounts.get('wallet_2')!;
    // const wallet_3 = accounts.get('wallet_3')!;
    // console.log(
    //   buildPreorderNameTx({
    //     fullyQualifiedName: 'random.id',
    //     salt: 'salt',
    //     stxToBurn: 2000000n,
    //     publicKey: wallet_1.publicKey,
    //     network: new StacksTestnet(),
    //   })
    // );
    // let block = chain.mineBlock([Tx.contractCall(BNS_CONTRACT_NAME, FNC_PREORDER)]);
    // assertEquals(block.receipts.length, 0);
    // assertEquals(block.height, 2);

    // block = chain.mineBlock([
    //   /*
    //    * Add transactions with:
    //    * Tx.contractCall(...)
    //    */
    // ]);
    // assertEquals(block.receipts.length, 0);
    // assertEquals(block.height, 3);
  },
});
// Tx.contractCall(CONTRACT_NAME, CREATE_LOOTBOX, [types.principal(receiver.address)], admin.address),
//     ]
