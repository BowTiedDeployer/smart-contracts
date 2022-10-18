import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.31.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';
// import { buildPreorderNameTx, buildRegisterNameTx } from '@stacks/bns';
// import { StacksTestnet } from '@stacks/network';

const BNS_CONTRACT_NAME = 'ST000000000000000000002AMW42H.bns';
const BNS_NFT_CONTRACT_NAME = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bsn-nft';
const FNC_PREORDER = 'preorder';
const FNC_REGISTER = 'register';
const FNC_CLAIM = 'claim';
const GET_WHITELIST_SPOTS = 'get-whitelist-spots';
const SET_WHITELIST_SPOTS = 'set-whitelist-spots';
const SET_ONLY_WHITELIST = 'set-only-whitelisted';
const CLAIM_OK_RESPONSE = 2;
const ERR_CANNOT_MINT = 101;

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

// TESTS TO BE DONE
// check whitelist functionality
//   check is whitelisted true / false
//   check can mint true/ false

Clarinet.test({
  name: `Ensure that ${GET_WHITELIST_SPOTS} functionalities work properly, also inside mint function`,
  // wallet 1, 2 are whitelisted, 3 is not whitelisted
  // wallet 1, 2 can mint, 3 cannot mint
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;
    const wallet_3 = accounts.get('wallet_3')!;
    let block = chain.mineBlock([
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(wallet_1.address), types.uint(3)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(wallet_2.address), types.uint(1)],
        deployer.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 2);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(wallet_1.address)], wallet_1.address)
      .result.expectSome()
      .expectUint(3);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(wallet_2.address)], wallet_1.address)
      .result.expectSome()
      .expectUint(1);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(wallet_3.address)], wallet_1.address)
      .result.expectNone();
  },
});

// check mint available only whitelist
Clarinet.test({
  name: 'Ensure that mint is working only to whitelisted',
  // wallet 1, 2 are whitelisted, 3 is not whitelisted
  // wallet 1, 2 can mint, 3 cannot mint
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;
    const wallet_3 = accounts.get('wallet_3')!;
    let block = chain.mineBlock([
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(wallet_1.address), types.uint(3)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(wallet_2.address), types.uint(1)],
        deployer.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 2);
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_2.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_2.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_3.address),
    ]);
    assertEquals(block.receipts.length, 7);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[1].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[2].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[3].result.expectErr().expectUint(ERR_CANNOT_MINT);
    block.receipts[4].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[5].result.expectErr().expectUint(ERR_CANNOT_MINT);
    block.receipts[6].result.expectErr().expectUint(ERR_CANNOT_MINT);
  },
});

Clarinet.test({
  name: 'Ensure that mint is working to everybody when whitelist is not necessary',
  // wallet 1, 2 are whitelisted, 3 is not whitelisted
  // wallet 1, 2 can mint, 3 cannot mint
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;
    const wallet_3 = accounts.get('wallet_3')!;
    let block = chain.mineBlock([
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(wallet_1.address), types.uint(3)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(wallet_2.address), types.uint(1)],
        deployer.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 2);
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_2.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_2.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_3.address),
    ]);
    assertEquals(block.receipts.length, 7);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[1].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[2].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[3].result.expectErr().expectUint(ERR_CANNOT_MINT);
    block.receipts[4].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[5].result.expectErr().expectUint(ERR_CANNOT_MINT);
    block.receipts[6].result.expectErr().expectUint(ERR_CANNOT_MINT);

    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(false)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(false);

    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_2.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_2.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_3.address),
    ]);
    assertEquals(block.receipts.length, 7);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[1].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[2].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[3].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[4].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[5].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
    block.receipts[6].result.expectOk().expectUint(CLAIM_OK_RESPONSE);
  },
});

// check payment
// pay integral price
// pay discounted
Clarinet.test({
  name: 'Ensure that pay integral and discout work as expected when whitelisted enable',
  // wallet 1, 2 are whitelisted, 3 is not whitelisted
  // wallet 1, 2 can mint, 3 cannot mint
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;
    const wallet_3 = accounts.get('wallet_3')!;
    let block = chain.mineBlock([
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(wallet_1.address), types.uint(3)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(wallet_2.address), types.uint(1)],
        deployer.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 2);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(wallet_1.address)], wallet_1.address)
      .result.expectSome()
      .expectUint(3);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(wallet_2.address)], wallet_1.address)
      .result.expectSome()
      .expectUint(1);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(wallet_3.address)], wallet_1.address)
      .result.expectNone();
    // first user pay only discount - mint bns name
    // second user pay full price

    // go to btc.us and copy/paste the arguments that are needed there for preorder
    // do it for an .id value
  },
});

// copy above and modify for buying without whitelist needed
