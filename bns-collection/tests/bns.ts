import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.31.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';
// import { buildPreorderNameTx, buildRegisterNameTx } from '@stacks/bns';
// import { StacksTestnet } from '@stacks/network';

const BNS_CONTRACT_NAME = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bns';
const BNS_NFT_CONTRACT_NAME = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bsn-nft';
const FNC_PREORDER = 'preorder';

// function preorder_name_hash(name: string, salt: string) {
// return hash160(Buffer.concat([Buffer.from(name),typeof salt !== 'string' ? salt : Buffer.from(salt)]));
// }

// check bns functionalities
// preorder name with given wallet
// see name

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
