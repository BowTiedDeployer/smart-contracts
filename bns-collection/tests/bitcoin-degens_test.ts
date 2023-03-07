import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.2.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';
import { createHash } from 'https://deno.land/std@0.107.0/hash/mod.ts';

const BNS_CONTRACT_NAME = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bns'; // ST000000000000000000002AMW42H
const BNS_NFT_CONTRACT_NAME = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-degens';
const FNC_PREORDER = 'preorder';
const FNC_REGISTER = 'register';
const FNC_CLAIM = 'claim';
const FNC_CLAIM_5 = 'claim-5';
const FNC_CLAIM_10 = 'claim-10';
const IS_WHITELISTED = 'is-whitelisted';
const GET_WHITELIST_SPOTS = 'get-whitelist-spots';
const SET_WHITELIST_SPOTS = 'set-whitelist-spots';
const SET_ONLY_WHITELIST = 'set-only-whitelisted';
const SET_MINT_ENABLER = 'set-mint-enabler';
const GET_NFT_NAME = 'get-nft-name';
const GET_BATCH_NFT_NAME = 'get-batch-nft-name';
const GET_LAST_TOKNE_ID = 'get-last-token-id';
const GET_TOKEN_URI = 'get-token-uri';
const GET_OWNER = 'get-owner';
const URI_ROOT = 'https://stacksdegens.com/bitcoin-degens/jsons/$TOKEN_ID.json';
const BURN_TOKEN = 'burn-token';
const TRANSFER = 'transfer';
const GET_ADDRESS_BNS_NAME = 'get-address-bns-name';

const CLAIM_OK_RESPONSE = true;
const ERR_MINT_DISABLED = 300;
const ERR_WHITELIST_ONLY = 301;
const ERR_FULL_MINT_REACHED = 302;
const MINT_PRICE = '69000000';

// transfer from normal to bns

// function preorder_name_hash(name: string, salt: string) {
// return hash160(Buffer.concat([Buffer.from(name),typeof salt !== 'string' ? salt : Buffer.from(salt)]));
// }

// TESTS TO BE DONE
// check whitelist functionality
//   check is whitelisted true / false
//   check can mint true/ false

// check payment
// pay integral price

// check bns functionalities

// TESTS TO BE DONE
// check whitelist functionality
//   check is whitelisted true / false
//   check can mint true/ false

Clarinet.test({
  name: `Ensure that ${GET_WHITELIST_SPOTS} and ${IS_WHITELISTED} functionalities work properly, also inside mint function`,
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

    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, IS_WHITELISTED, [types.principal(wallet_1.address)], wallet_1.address)
      .result.expectBool(true);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, IS_WHITELISTED, [types.principal(wallet_2.address)], wallet_1.address)
      .result.expectBool(true);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, IS_WHITELISTED, [types.principal(wallet_3.address)], wallet_1.address)
      .result.expectBool(false);
  },
});

// check mint available only whitelist
Clarinet.test({
  name: 'Ensure that mint is working only to whitelisted when whitelist is enabled',
  // wallet 1, 2 are whitelisted, 3 is not whitelisted
  // wallet 1, 2 can mint, 3 cannot mint
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;
    const wallet_3 = accounts.get('wallet_3')!;
    let block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(true)], deployer.address),
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
    assertEquals(block.receipts.length, 3);
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
    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[3].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
    block.receipts[4].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[5].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
    block.receipts[6].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
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
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(true)], deployer.address),
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
    assertEquals(block.receipts.length, 3);
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
    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[3].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
    block.receipts[4].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[5].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
    block.receipts[6].result.expectErr().expectUint(ERR_WHITELIST_ONLY);

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
    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[3].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[4].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[5].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[6].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
  },
});

Clarinet.test({
  name: 'Ensure that pay, integral work as expected when whitelisted enable',
  // whitelisted - can mint - 2, 3, 4, 5,
  // try mint with
  //   2, 3, 4, 5 - full
  //   6 - failed
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    const alice = accounts.get('wallet_1')!;
    const bob = accounts.get('wallet_2')!;
    const charlie = accounts.get('wallet_3')!;
    const dave = accounts.get('wallet_4')!;
    const elephant = accounts.get('wallet_5')!;
    const fred = accounts.get('wallet_6')!;
    const cases = [
      {
        namespace: 'btc',
        version: 1,
        salt: '0000',
        value: 64000000000,
        namespaceOwner: alice,
        nameOwner: bob,
        priceFunction: [
          types.uint(4), // base
          types.uint(250), // coeff
          types.uint(7), // bucket 1
          types.uint(6), // bucket 2
          types.uint(5), // bucket 3
          types.uint(4), // bucket 4
          types.uint(3), // bucket 5
          types.uint(2), // bucket 6
          types.uint(1), // bucket 7
          types.uint(1), // bucket 8
          types.uint(1), // bucket 9
          types.uint(1), // bucket 10
          types.uint(1), // bucket 11
          types.uint(1), // bucket 12
          types.uint(1), // bucket 13
          types.uint(1), // bucket 14
          types.uint(1), // bucket 15
          types.uint(1), // bucket 16+
          types.uint(4), // nonAlphaDiscount
          types.uint(4), // noVowelDiscount
        ],
        renewalRule: 10,
        nameImporter: alice,
        zonefile: '0000',
      },
    ];

    let merged = new TextEncoder().encode(`${cases[0].namespace}${cases[0].salt}`);
    let sha256 = createHash('sha256').update(merged).digest();
    let ripemd160 = createHash('ripemd160').update(sha256).digest();
    // Given a launched namespace 'btc', owned by Alice
    let block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-preorder',
        [types.buff(ripemd160), types.uint(cases[0].value)],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);

    // Reveal the namespace
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-reveal',
        [
          types.buff(cases[0].namespace),
          types.buff(cases[0].salt),
          ...cases[0].priceFunction,
          types.uint(cases[0].renewalRule),
          types.principal(cases[0].nameImporter.address),
        ],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // Launch the namespace
    block = chain.mineBlock([
      Tx.contractCall('bns', 'namespace-ready', [types.buff(cases[0].namespace)], cases[0].namespaceOwner.address),
    ]);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // Given an existing pre-order of the 'names.btc'
    let bobName = 'bowtieddeployer';
    let charlieName = 'degensarecool';
    let fredName = 'bowtiedsirjonathan';
    let bobRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${bobName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let charlieRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${charlieName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let fredRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${fredName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    block = chain.mineBlock([
      Tx.contractCall('bns', 'name-preorder', [types.buff(bobRipemd160), types.uint(2560000)], bob.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(charlieRipemd160), types.uint(2560000)], charlie.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(fredRipemd160), types.uint(2560000)], fred.address),
    ]);

    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);
    block.receipts[1].result.expectOk().expectUint(144 + block.height - 1);

    // Bob, charlie, dave registering the 'names.btc' should succeed
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'name-register',
        [types.buff(cases[0].namespace), types.buff(bobName), types.buff(cases[0].salt), types.buff(cases[0].zonefile)],
        bob.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(charlieName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        charlie.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(fredName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        fred.address
      ),
    ]);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // verify bob bns name
    let call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(bob.address)], alice.address);
    let response: any = call.result.expectOk().expectTuple();
    response['name'].expectBuff(bobName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(bobName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(bob.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify charlie bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(charlie.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(charlieName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(charlieName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(charlie.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify fred bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(fred.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(fredName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(fredName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(fred.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(true)], deployer.address),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(bob.address), types.uint(3)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(charlie.address), types.uint(1)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(dave.address), types.uint(2)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(elephant.address), types.uint(2)],
        deployer.address
      ),
    ]);
    assertEquals(block.receipts.length, 5);
    assertEquals(block.height, 7);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(fred.address)], deployer.address)
      .result.expectNone();

    // whitelisted - can mint - 2, 3, 4, 5,
    // have bns - full-price - 2, 3, 6
    // try mint with
    //   2, 3 - full-price
    //   4, 5 - full
    //   6 - failed
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // should fail
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], dave.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], elephant.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], fred.address), // should fail
    ]);

    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[0].events[0].type, 'stx_transfer_event');
    assertEquals(block.receipts[0].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[0].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[0].events[1].nft_mint_event.recipient, bob.address);
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[1].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[1].events[1].nft_mint_event.recipient, bob.address);
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[2].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[2].events[1].nft_mint_event.recipient, bob.address);
    block.receipts[3].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.sender, charlie.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[3].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[3].events[1].nft_mint_event.recipient, charlie.address);
    block.receipts[4].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
    block.receipts[5].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.sender, dave.address);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[5].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[5].events[1].nft_mint_event.recipient, dave.address);
    block.receipts[6].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.sender, elephant.address);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[6].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[6].events[1].nft_mint_event.recipient, elephant.address);
    block.receipts[7].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
  },
});

Clarinet.test({
  name: 'Ensure that pay, integral and name-nft work as expected when whitelisted disabled',
  //   2, 3, 4, 5 - full
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    const alice = accounts.get('wallet_1')!;
    const bob = accounts.get('wallet_2')!;
    const charlie = accounts.get('wallet_3')!;
    const dave = accounts.get('wallet_4')!;
    const elephant = accounts.get('wallet_5')!;
    const fred = accounts.get('wallet_6')!;
    const cases = [
      {
        namespace: 'btc',
        version: 1,
        salt: '0000',
        value: 64000000000,
        namespaceOwner: alice,
        nameOwner: bob,
        priceFunction: [
          types.uint(4), // base
          types.uint(250), // coeff
          types.uint(7), // bucket 1
          types.uint(6), // bucket 2
          types.uint(5), // bucket 3
          types.uint(4), // bucket 4
          types.uint(3), // bucket 5
          types.uint(2), // bucket 6
          types.uint(1), // bucket 7
          types.uint(1), // bucket 8
          types.uint(1), // bucket 9
          types.uint(1), // bucket 10
          types.uint(1), // bucket 11
          types.uint(1), // bucket 12
          types.uint(1), // bucket 13
          types.uint(1), // bucket 14
          types.uint(1), // bucket 15
          types.uint(1), // bucket 16+
          types.uint(4), // nonAlphaDiscount
          types.uint(4), // noVowelDiscount
        ],
        renewalRule: 10,
        nameImporter: alice,
        zonefile: '0000',
      },
    ];

    let merged = new TextEncoder().encode(`${cases[0].namespace}${cases[0].salt}`);
    let sha256 = createHash('sha256').update(merged).digest();
    let ripemd160 = createHash('ripemd160').update(sha256).digest();
    // Given a launched namespace 'btc', owned by Alice
    let block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-preorder',
        [types.buff(ripemd160), types.uint(cases[0].value)],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);

    // Reveal the namespace
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-reveal',
        [
          types.buff(cases[0].namespace),
          types.buff(cases[0].salt),
          ...cases[0].priceFunction,
          types.uint(cases[0].renewalRule),
          types.principal(cases[0].nameImporter.address),
        ],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // Launch the namespace
    block = chain.mineBlock([
      Tx.contractCall('bns', 'namespace-ready', [types.buff(cases[0].namespace)], cases[0].namespaceOwner.address),
    ]);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // Given an existing pre-order of the 'names.btc'
    let bobName = 'bowtieddeployer';
    let charlieName = 'degensarecool';
    let fredName = 'bowtiedsirjonathan';
    let bobRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${bobName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let charlieRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${charlieName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let fredRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${fredName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    block = chain.mineBlock([
      Tx.contractCall('bns', 'name-preorder', [types.buff(bobRipemd160), types.uint(2560000)], bob.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(charlieRipemd160), types.uint(2560000)], charlie.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(fredRipemd160), types.uint(2560000)], fred.address),
    ]);

    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);
    block.receipts[1].result.expectOk().expectUint(144 + block.height - 1);

    // Bob, charlie, dave registering the 'names.btc' should succeed
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'name-register',
        [types.buff(cases[0].namespace), types.buff(bobName), types.buff(cases[0].salt), types.buff(cases[0].zonefile)],
        bob.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(charlieName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        charlie.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(fredName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        fred.address
      ),
    ]);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // verify bob bns name
    let call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(bob.address)], alice.address);
    let response: any = call.result.expectOk().expectTuple();
    response['name'].expectBuff(bobName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(bobName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(bob.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify charlie bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(charlie.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(charlieName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(charlieName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(charlie.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify fred bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(fred.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(fredName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(fredName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(fred.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // set mint for everybody, not just whitelisted users
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(false)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(fred.address)], deployer.address)
      .result.expectNone();

    //   2, 3, 4, 5 - full
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], dave.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], elephant.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], deployer.address), // full-price
    ]);

    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[0].events[0].type, 'stx_transfer_event');
    assertEquals(block.receipts[0].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[0].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[0].events[1].nft_mint_event.recipient, bob.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(1)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    ); // .result.expectNone();
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[1].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[1].events[1].nft_mint_event.recipient, bob.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(2)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[2].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[2].events[1].nft_mint_event.recipient, bob.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(3)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );
    block.receipts[3].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.sender, charlie.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[3].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[3].events[1].nft_mint_event.recipient, charlie.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(4)], deployer.address).result.expectSome(),
      `"${charlieName}.${cases[0].namespace}"`
    );
    block.receipts[3].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[4].events[0].stx_transfer_event.sender, charlie.address);
    assertEquals(block.receipts[4].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[4].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[4].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[4].events[1].nft_mint_event.recipient, charlie.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(5)], deployer.address).result.expectSome(),
      `"${charlieName}.${cases[0].namespace}"`
    );
    block.receipts[5].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.sender, dave.address);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[5].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[5].events[1].nft_mint_event.recipient, dave.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(6)], deployer.address).result.expectSome(),
      '"BitcoinDegen#6"'
    );
    block.receipts[6].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.sender, elephant.address);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[6].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[6].events[1].nft_mint_event.recipient, elephant.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(7)], deployer.address).result.expectSome(),
      '"BitcoinDegen#7"'
    );

    block.receipts[7].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    // no stx transfer event
    assertEquals(block.receipts[7].events[0].type, 'nft_mint_event');
    assertEquals(block.receipts[7].events[0].nft_mint_event.recipient, deployer.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(8)], deployer.address).result.expectSome(),
      '"BitcoinDegen#8"'
    );
  },
});

Clarinet.test({
  name: 'Ensure that nft traits are working as expected',
  // whitelift off, mint degens, check nft-trait functions in the same time
  //   2, 3 - discounted
  //   4, 5 - full
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    const alice = accounts.get('wallet_1')!;
    const bob = accounts.get('wallet_2')!;
    const charlie = accounts.get('wallet_3')!;
    const dave = accounts.get('wallet_4')!;
    const elephant = accounts.get('wallet_5')!;
    const fred = accounts.get('wallet_6')!;
    const cases = [
      {
        namespace: 'btc',
        version: 1,
        salt: '0000',
        value: 64000000000,
        namespaceOwner: alice,
        nameOwner: bob,
        priceFunction: [
          types.uint(4), // base
          types.uint(250), // coeff
          types.uint(7), // bucket 1
          types.uint(6), // bucket 2
          types.uint(5), // bucket 3
          types.uint(4), // bucket 4
          types.uint(3), // bucket 5
          types.uint(2), // bucket 6
          types.uint(1), // bucket 7
          types.uint(1), // bucket 8
          types.uint(1), // bucket 9
          types.uint(1), // bucket 10
          types.uint(1), // bucket 11
          types.uint(1), // bucket 12
          types.uint(1), // bucket 13
          types.uint(1), // bucket 14
          types.uint(1), // bucket 15
          types.uint(1), // bucket 16+
          types.uint(4), // nonAlphaDiscount
          types.uint(4), // noVowelDiscount
        ],
        renewalRule: 10,
        nameImporter: alice,
        zonefile: '0000',
      },
    ];

    let merged = new TextEncoder().encode(`${cases[0].namespace}${cases[0].salt}`);
    let sha256 = createHash('sha256').update(merged).digest();
    let ripemd160 = createHash('ripemd160').update(sha256).digest();
    // Given a launched namespace 'btc', owned by Alice
    let block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-preorder',
        [types.buff(ripemd160), types.uint(cases[0].value)],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);

    // Reveal the namespace
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-reveal',
        [
          types.buff(cases[0].namespace),
          types.buff(cases[0].salt),
          ...cases[0].priceFunction,
          types.uint(cases[0].renewalRule),
          types.principal(cases[0].nameImporter.address),
        ],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // Launch the namespace
    block = chain.mineBlock([
      Tx.contractCall('bns', 'namespace-ready', [types.buff(cases[0].namespace)], cases[0].namespaceOwner.address),
    ]);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // Given an existing pre-order of the 'names.btc'
    let bobName = 'bowtieddeployer';
    let charlieName = 'degensarecool';
    let fredName = 'bowtiedsirjonathan';
    let bobRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${bobName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let charlieRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${charlieName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let fredRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${fredName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    block = chain.mineBlock([
      Tx.contractCall('bns', 'name-preorder', [types.buff(bobRipemd160), types.uint(2560000)], bob.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(charlieRipemd160), types.uint(2560000)], charlie.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(fredRipemd160), types.uint(2560000)], fred.address),
    ]);

    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);
    block.receipts[1].result.expectOk().expectUint(144 + block.height - 1);

    // Bob, charlie, dave registering the 'names.btc' should succeed
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'name-register',
        [types.buff(cases[0].namespace), types.buff(bobName), types.buff(cases[0].salt), types.buff(cases[0].zonefile)],
        bob.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(charlieName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        charlie.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(fredName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        fred.address
      ),
    ]);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // verify bob bns name
    let call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(bob.address)], alice.address);
    let response: any = call.result.expectOk().expectTuple();
    response['name'].expectBuff(bobName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(bobName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(bob.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify charlie bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(charlie.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(charlieName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(charlieName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(charlie.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify fred bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(fred.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(fredName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(fredName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(fred.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // set mint for everybody, not just whitelisted users
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(false)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(fred.address)], deployer.address)
      .result.expectNone();

    // check last-id
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_LAST_TOKNE_ID, [], deployer.address)
      .result.expectOk()
      .expectUint(0);

    //   2, 3, 4, 5 - full
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
    ]);
    // check last-id
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_LAST_TOKNE_ID, [], deployer.address)
      .result.expectOk()
      .expectUint(3);

    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[0].events[0].type, 'stx_transfer_event');
    assertEquals(block.receipts[0].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[0].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[0].events[1].nft_mint_event.recipient, bob.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(1)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[1].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[1].events[1].nft_mint_event.recipient, bob.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(2)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[2].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[2].events[1].nft_mint_event.recipient, bob.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(3)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );

    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], dave.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], elephant.address), // full-price
    ]);

    // check last-id
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_LAST_TOKNE_ID, [], deployer.address)
      .result.expectOk()
      .expectUint(7);

    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.sender, charlie.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[0].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[0].events[1].nft_mint_event.recipient, charlie.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(4)], deployer.address).result.expectSome(),
      `"${charlieName}.${cases[0].namespace}"`
    );
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.sender, charlie.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[1].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[1].events[1].nft_mint_event.recipient, charlie.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(5)], deployer.address).result.expectSome(),
      `"${charlieName}.${cases[0].namespace}"`
    );
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.sender, dave.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[2].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[2].events[1].nft_mint_event.recipient, dave.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(6)], deployer.address).result.expectSome(),
      '"BitcoinDegen#6"'
    );
    block.receipts[3].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.sender, elephant.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[3].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[3].events[1].nft_mint_event.recipient, elephant.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(7)], deployer.address).result.expectSome(),
      '"BitcoinDegen#7"'
    );

    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_OWNER, [types.uint(1)], deployer.address)
      .result.expectOk()
      .expectSome()
      .expectPrincipal(bob.address);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_OWNER, [types.uint(2)], deployer.address)
      .result.expectOk()
      .expectSome()
      .expectPrincipal(bob.address);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_OWNER, [types.uint(3)], deployer.address)
      .result.expectOk()
      .expectSome()
      .expectPrincipal(bob.address);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_OWNER, [types.uint(4)], deployer.address)
      .result.expectOk()
      .expectSome()
      .expectPrincipal(charlie.address);

    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_OWNER, [types.uint(5)], deployer.address)
      .result.expectOk()
      .expectSome()
      .expectPrincipal(charlie.address);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_OWNER, [types.uint(6)], deployer.address)
      .result.expectOk()
      .expectSome()
      .expectPrincipal(dave.address);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_OWNER, [types.uint(7)], deployer.address)
      .result.expectOk()
      .expectSome()
      .expectPrincipal(elephant.address);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_OWNER, [types.uint(8)], deployer.address)
      .result.expectOk()
      .expectNone();

    assertEquals(
      chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_TOKEN_URI, [types.uint(1)], deployer.address)
        .result.expectOk()
        .expectSome(),
      `"${URI_ROOT}"`
    );
    assertEquals(
      chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_TOKEN_URI, [types.uint(2)], deployer.address)
        .result.expectOk()
        .expectSome(),
      `"${URI_ROOT}"`
    );
    assertEquals(
      chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_TOKEN_URI, [types.uint(3)], deployer.address)
        .result.expectOk()
        .expectSome(),
      `"${URI_ROOT}"`
    );
    assertEquals(
      chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_TOKEN_URI, [types.uint(4)], deployer.address)
        .result.expectOk()
        .expectSome(),
      `"${URI_ROOT}"`
    );
    assertEquals(
      chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_TOKEN_URI, [types.uint(5)], deployer.address)
        .result.expectOk()
        .expectSome(),
      `"${URI_ROOT}"`
    );
    assertEquals(
      chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_TOKEN_URI, [types.uint(6)], deployer.address)
        .result.expectOk()
        .expectSome(),
      `"${URI_ROOT}"`
    );
    assertEquals(
      chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_TOKEN_URI, [types.uint(7)], deployer.address)
        .result.expectOk()
        .expectSome(),
      `"${URI_ROOT}"`
    );
    assertEquals(
      chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_TOKEN_URI, [types.uint(8)], deployer.address)
        .result.expectOk()
        .expectSome(),
      `"${URI_ROOT}"`
    );

    // Burn NFT
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, BURN_TOKEN, [types.uint(1)], bob.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, BURN_TOKEN, [types.uint(2)], bob.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, BURN_TOKEN, [types.uint(3)], bob.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, BURN_TOKEN, [types.uint(4)], charlie.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, BURN_TOKEN, [types.uint(5)], charlie.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, BURN_TOKEN, [types.uint(6)], dave.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, BURN_TOKEN, [types.uint(7)], elephant.address),
    ]);
    for (var i = 0; i < 7; i++) {
      assertEquals(block.receipts[i].events[0].type, 'nft_burn_event');
      block.receipts[i].events[0].nft_burn_event.value.expectUint(i + 1);
    }
    block.receipts[0].events[0].nft_burn_event.sender.expectPrincipal(bob.address);
    block.receipts[1].events[0].nft_burn_event.sender.expectPrincipal(bob.address);
    block.receipts[2].events[0].nft_burn_event.sender.expectPrincipal(bob.address);
    block.receipts[3].events[0].nft_burn_event.sender.expectPrincipal(charlie.address);
    block.receipts[4].events[0].nft_burn_event.sender.expectPrincipal(charlie.address);
    block.receipts[5].events[0].nft_burn_event.sender.expectPrincipal(dave.address);
    block.receipts[6].events[0].nft_burn_event.sender.expectPrincipal(elephant.address);
  },
});

Clarinet.test({
  name: 'Ensure that transfer and its naming work as expected when whitelisted disabled',
  //   2, 3 - discounted
  //   4, 5 - full
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    const alice = accounts.get('wallet_1')!;
    const bob = accounts.get('wallet_2')!;
    const charlie = accounts.get('wallet_3')!;
    const dave = accounts.get('wallet_4')!;
    const elephant = accounts.get('wallet_5')!;
    const fred = accounts.get('wallet_6')!;
    const graphite = accounts.get('wallet_7')!;
    const hector = accounts.get('wallet_8')!;
    const cases = [
      {
        namespace: 'btc',
        version: 1,
        salt: '0000',
        value: 64000000000,
        namespaceOwner: alice,
        nameOwner: bob,
        priceFunction: [
          types.uint(4), // base
          types.uint(250), // coeff
          types.uint(7), // bucket 1
          types.uint(6), // bucket 2
          types.uint(5), // bucket 3
          types.uint(4), // bucket 4
          types.uint(3), // bucket 5
          types.uint(2), // bucket 6
          types.uint(1), // bucket 7
          types.uint(1), // bucket 8
          types.uint(1), // bucket 9
          types.uint(1), // bucket 10
          types.uint(1), // bucket 11
          types.uint(1), // bucket 12
          types.uint(1), // bucket 13
          types.uint(1), // bucket 14
          types.uint(1), // bucket 15
          types.uint(1), // bucket 16+
          types.uint(4), // nonAlphaDiscount
          types.uint(4), // noVowelDiscount
        ],
        renewalRule: 10,
        nameImporter: alice,
        zonefile: '0000',
      },
    ];

    let merged = new TextEncoder().encode(`${cases[0].namespace}${cases[0].salt}`);
    let sha256 = createHash('sha256').update(merged).digest();
    let ripemd160 = createHash('ripemd160').update(sha256).digest();
    // Given a launched namespace 'btc', owned by Alice
    let block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-preorder',
        [types.buff(ripemd160), types.uint(cases[0].value)],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);

    // Reveal the namespace
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-reveal',
        [
          types.buff(cases[0].namespace),
          types.buff(cases[0].salt),
          ...cases[0].priceFunction,
          types.uint(cases[0].renewalRule),
          types.principal(cases[0].nameImporter.address),
        ],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // Launch the namespace
    block = chain.mineBlock([
      Tx.contractCall('bns', 'namespace-ready', [types.buff(cases[0].namespace)], cases[0].namespaceOwner.address),
    ]);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // Given an existing pre-order of the 'names.btc'
    let bobName = 'bowtieddeployer';
    let charlieName = 'degensarecool';
    let fredName = 'bowtiedsirjonathan';
    let bobRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${bobName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let charlieRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${charlieName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let fredRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${fredName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    block = chain.mineBlock([
      Tx.contractCall('bns', 'name-preorder', [types.buff(bobRipemd160), types.uint(2560000)], bob.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(charlieRipemd160), types.uint(2560000)], charlie.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(fredRipemd160), types.uint(2560000)], fred.address),
    ]);

    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);
    block.receipts[1].result.expectOk().expectUint(144 + block.height - 1);

    // Bob, charlie, dave registering the 'names.btc' should succeed
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'name-register',
        [types.buff(cases[0].namespace), types.buff(bobName), types.buff(cases[0].salt), types.buff(cases[0].zonefile)],
        bob.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(charlieName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        charlie.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(fredName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        fred.address
      ),
      Tx.contractCall(
        'bnsx-fake',
        'set-primary-name',
        [
          types.principal(graphite.address),
          types.tuple({ name: types.buff('graphite'), namespace: types.buff('btc') }),
        ],
        fred.address
      ),
      Tx.contractCall(
        'bnsx-fake',
        'set-primary-name',
        [types.principal(hector.address), types.tuple({ name: types.buff('hector'), namespace: types.buff('stx') })],
        fred.address
      ),
    ]);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // verify bob bns name
    let call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(bob.address)], alice.address);
    let response: any = call.result.expectOk().expectTuple();
    response['name'].expectBuff(bobName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(bobName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(bob.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify charlie bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(charlie.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(charlieName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(charlieName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(charlie.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify fred bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(fred.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(fredName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(fredName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(fred.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // set mint for everybody, not just whitelisted users
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(false)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(fred.address)], deployer.address)
      .result.expectNone();

    //   2, 3, 4, 5 - full
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], dave.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], elephant.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], graphite.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], hector.address), // full-price
    ]);

    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[0].events[0].type, 'stx_transfer_event');
    assertEquals(block.receipts[0].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[0].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[0].events[1].nft_mint_event.recipient, bob.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(1)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[1].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[1].events[1].nft_mint_event.recipient, bob.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(2)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[2].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[2].events[1].nft_mint_event.recipient, bob.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(3)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );
    block.receipts[3].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.sender, charlie.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[3].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[3].events[1].nft_mint_event.recipient, charlie.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(4)], deployer.address).result.expectSome(),
      `"${charlieName}.${cases[0].namespace}"`
    );
    block.receipts[4].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[4].events[0].stx_transfer_event.sender, charlie.address);
    assertEquals(block.receipts[4].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[4].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[4].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[4].events[1].nft_mint_event.recipient, charlie.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(5)], deployer.address).result.expectSome(),
      `"${charlieName}.${cases[0].namespace}"`
    );
    block.receipts[5].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.sender, dave.address);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[5].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[5].events[1].nft_mint_event.recipient, dave.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(6)], deployer.address).result.expectSome(),
      '"BitcoinDegen#6"'
    );
    block.receipts[6].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.sender, elephant.address);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[6].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[6].events[1].nft_mint_event.recipient, elephant.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(7)], deployer.address).result.expectSome(),
      '"BitcoinDegen#7"'
    );
    block.receipts[6].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[7].events[0].stx_transfer_event.sender, graphite.address);
    assertEquals(block.receipts[7].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[7].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[7].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[7].events[1].nft_mint_event.recipient, graphite.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(8)], deployer.address).result.expectSome(),
      '"graphite.btc"'
    );
    block.receipts[6].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[8].events[0].stx_transfer_event.sender, hector.address);
    assertEquals(block.receipts[8].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[8].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[8].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[8].events[1].nft_mint_event.recipient, hector.address);
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(9)], deployer.address).result.expectSome(),
      '"hector.stx"'
    );

    // - modified to BTC Name BNS ( bob transfer to dave, bob transfer to charlie)
    // modified to BTC Name BNSX ( bot transfer to graphite)
    // - modified to Degen Name ( elephant to charlie, charlie to bob, dave to bob )
    block = chain.mineBlock([
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        TRANSFER,
        [types.uint(1), types.principal(bob.address), types.principal(dave.address)],
        bob.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        TRANSFER,
        [types.uint(2), types.principal(bob.address), types.principal(dave.address)],
        bob.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        TRANSFER,
        [types.uint(3), types.principal(bob.address), types.principal(graphite.address)],
        bob.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        TRANSFER,
        [types.uint(7), types.principal(elephant.address), types.principal(charlie.address)],
        elephant.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        TRANSFER,
        [types.uint(5), types.principal(charlie.address), types.principal(bob.address)],
        charlie.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        TRANSFER,
        [types.uint(6), types.principal(dave.address), types.principal(bob.address)],
        dave.address
      ),
    ]);

    // verify names updated
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(1)], deployer.address).result.expectSome(),
      '"BitcoinDegen#1"'
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(2)], deployer.address).result.expectSome(),
      '"BitcoinDegen#2"'
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(3)], deployer.address).result.expectSome(),
      '"graphite.btc"'
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(4)], deployer.address).result.expectSome(),
      `"${charlieName}.${cases[0].namespace}"`
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(5)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(6)], deployer.address).result.expectSome(),
      `"${bobName}.${cases[0].namespace}"`
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(7)], deployer.address).result.expectSome(),
      `"${charlieName}.${cases[0].namespace}"`
    );
  },
});

Clarinet.test({
  name: `Ensure that ${GET_ADDRESS_BNS_NAME} to ascii works as expected`,
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    // get-address-bns-name
    // less than 20 characters name, 10 characters namespace
    assertEquals(
      chain.callReadOnlyFn(
        BNS_NFT_CONTRACT_NAME,
        GET_ADDRESS_BNS_NAME,
        [types.tuple({ name: types.buff('bowtieddeployer'), namespace: types.buff('btc') })],
        deployer.address
      ).result,
      '"bowtieddeployer.btc"'
    );
    assertEquals(
      chain.callReadOnlyFn(
        BNS_NFT_CONTRACT_NAME,
        GET_ADDRESS_BNS_NAME,
        [types.tuple({ name: types.buff('abcdefghijklmnopqrst'), namespace: types.buff('uvwxyz123') })],
        deployer.address
      ).result,
      '"abcdefghijklmnopqrst.uvwxyz123"'
    );
    assertEquals(
      chain.callReadOnlyFn(
        BNS_NFT_CONTRACT_NAME,
        GET_ADDRESS_BNS_NAME,
        [types.tuple({ name: types.buff('bowtieddeployer'), namespace: types.buff('id') })],
        deployer.address
      ).result,
      '"bowtieddeployer.id"'
    );
  },
});

Clarinet.test({
  name: `Ensure that minting all 1000 results in ok values and conversions and minting more fails`,
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;
    // remove whitelist
    // mint 420
    // check them

    let block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(false)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(false);

    let will_be_mined = [];
    for (let i = 0; i < 500; i++) {
      will_be_mined.push(Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address));
    }
    block = chain.mineBlock(will_be_mined);

    will_be_mined = [];
    for (let i = 500; i < 1000; i++) {
      will_be_mined.push(Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address));
    }
    block = chain.mineBlock(will_be_mined);

    will_be_mined = [];
    for (let i = 1000; i < 1010; i++) {
      will_be_mined.push(Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address));
    }
    block = chain.mineBlock(will_be_mined);

    assertEquals(block.receipts.length, 10);
    assertEquals(block.height, 5);
    for (let i = 0; i < 10; i++) {
      block.receipts[i].result.expectErr().expectUint(ERR_FULL_MINT_REACHED);
    }

    // verify name
    for (let i = 0; i < 1000; i++) {
      assertEquals(
        chain
          .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(i + 1)], deployer.address)
          .result.expectSome(),
        `"BitcoinDegen#${i + 1}"`
      );
    }

    // fail minting more
    for (let i = 0; i < 10; i++) {
      chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(i + 1001)], deployer.address)
        .result.expectNone();
    }
  },
});

Clarinet.test({
  name: `Ensure that batch get name works as expected`,
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;
    // mint 1000
    // check them

    let block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(false)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(false);

    let will_be_mined = [];
    for (let i = 0; i < 500; i++) {
      will_be_mined.push(Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address));
    }
    block = chain.mineBlock(will_be_mined);

    will_be_mined = [];
    for (let i = 500; i < 1000; i++) {
      will_be_mined.push(Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_1.address));
    }
    block = chain.mineBlock(will_be_mined);

    // verify 25 once -> read-count 28
    // max read count-read only is 30
    let list_of_ids = [];
    let string_verify = '';
    let curr_id = 0;
    for (let j = 0; j < 40; j++) {
      list_of_ids = [];
      string_verify = '';
      for (let i = 1; i <= 25; i++) {
        curr_id = j * 25 + i;
        list_of_ids.push(types.uint(curr_id));
        string_verify = string_verify + `(some \"BitcoinDegen#${curr_id}\"), `;
      }
      let result = chain.callReadOnlyFn(
        BNS_NFT_CONTRACT_NAME,
        GET_BATCH_NFT_NAME,
        [types.list(list_of_ids)],
        deployer.address
      );
      string_verify = string_verify.slice(0, -2);
      assertEquals(result.result, `[${string_verify}]`);
    }
  },
});

Clarinet.test({
  name: 'Ensure that pay, integral work as expected when whitelisted enable with bnsx as well',
  // whitelisted - can mint - 2, 3, 4, 5, 7, 8
  // try mint with
  //   2, 3, 4, 5 - bns
  //   6 - failed
  //   7, 8 - bnsx
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    const alice = accounts.get('wallet_1')!;
    const bob = accounts.get('wallet_2')!;
    const charlie = accounts.get('wallet_3')!;
    const dave = accounts.get('wallet_4')!;
    const elephant = accounts.get('wallet_5')!;
    const fred = accounts.get('wallet_6')!;
    const graphite = accounts.get('wallet_7')!;
    const hector = accounts.get('wallet_8')!;
    const cases = [
      {
        namespace: 'btc',
        version: 1,
        salt: '0000',
        value: 64000000000,
        namespaceOwner: alice,
        nameOwner: bob,
        priceFunction: [
          types.uint(4), // base
          types.uint(250), // coeff
          types.uint(7), // bucket 1
          types.uint(6), // bucket 2
          types.uint(5), // bucket 3
          types.uint(4), // bucket 4
          types.uint(3), // bucket 5
          types.uint(2), // bucket 6
          types.uint(1), // bucket 7
          types.uint(1), // bucket 8
          types.uint(1), // bucket 9
          types.uint(1), // bucket 10
          types.uint(1), // bucket 11
          types.uint(1), // bucket 12
          types.uint(1), // bucket 13
          types.uint(1), // bucket 14
          types.uint(1), // bucket 15
          types.uint(1), // bucket 16+
          types.uint(4), // nonAlphaDiscount
          types.uint(4), // noVowelDiscount
        ],
        renewalRule: 10,
        nameImporter: alice,
        zonefile: '0000',
      },
    ];

    let merged = new TextEncoder().encode(`${cases[0].namespace}${cases[0].salt}`);
    let sha256 = createHash('sha256').update(merged).digest();
    let ripemd160 = createHash('ripemd160').update(sha256).digest();
    // Given a launched namespace 'btc', owned by Alice
    let block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-preorder',
        [types.buff(ripemd160), types.uint(cases[0].value)],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);

    // Reveal the namespace
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'namespace-reveal',
        [
          types.buff(cases[0].namespace),
          types.buff(cases[0].salt),
          ...cases[0].priceFunction,
          types.uint(cases[0].renewalRule),
          types.principal(cases[0].nameImporter.address),
        ],
        cases[0].namespaceOwner.address
      ),
    ]);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // Launch the namespace
    block = chain.mineBlock([
      Tx.contractCall('bns', 'namespace-ready', [types.buff(cases[0].namespace)], cases[0].namespaceOwner.address),
    ]);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // Given an existing pre-order of the 'names.btc'
    let bobName = 'bowtieddeployer';
    let charlieName = 'degensarecool';
    let fredName = 'bowtiedsirjonathan';
    let bobRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${bobName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let charlieRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${charlieName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    let fredRipemd160 = createHash('ripemd160')
      .update(
        createHash('sha256')
          .update(new TextEncoder().encode(`${fredName}.${cases[0].namespace}${cases[0].salt}`))
          .digest()
      )
      .digest();

    block = chain.mineBlock([
      Tx.contractCall('bns', 'name-preorder', [types.buff(bobRipemd160), types.uint(2560000)], bob.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(charlieRipemd160), types.uint(2560000)], charlie.address),
      Tx.contractCall('bns', 'name-preorder', [types.buff(fredRipemd160), types.uint(2560000)], fred.address),
    ]);

    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectUint(144 + block.height - 1);
    block.receipts[1].result.expectOk().expectUint(144 + block.height - 1);

    // Bob, charlie, dave registering the 'names.btc' should succeed
    block = chain.mineBlock([
      Tx.contractCall(
        'bns',
        'name-register',
        [types.buff(cases[0].namespace), types.buff(bobName), types.buff(cases[0].salt), types.buff(cases[0].zonefile)],
        bob.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(charlieName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        charlie.address
      ),
      Tx.contractCall(
        'bns',
        'name-register',
        [
          types.buff(cases[0].namespace),
          types.buff(fredName),
          types.buff(cases[0].salt),
          types.buff(cases[0].zonefile),
        ],
        fred.address
      ),
      Tx.contractCall(
        'bnsx-fake',
        'set-primary-name',
        [
          types.principal(graphite.address),
          types.tuple({ name: types.buff('graphite'), namespace: types.buff('btc') }),
        ],
        fred.address
      ),
      Tx.contractCall(
        'bnsx-fake',
        'set-primary-name',
        [types.principal(hector.address), types.tuple({ name: types.buff('hector'), namespace: types.buff('stx') })],
        fred.address
      ),
    ]);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // verify bob bns name
    let call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(bob.address)], alice.address);
    let response: any = call.result.expectOk().expectTuple();
    response['name'].expectBuff(bobName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(bobName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(bob.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify charlie bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(charlie.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(charlieName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(charlieName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(charlie.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    // verify fred bns name
    call = chain.callReadOnlyFn('bns', 'resolve-principal', [types.principal(fred.address)], alice.address);
    response = call.result.expectOk().expectTuple();
    response['name'].expectBuff(fredName);
    response['namespace'].expectBuff('btc');

    call = chain.callReadOnlyFn(
      'bns',
      'name-resolve',
      [types.buff(cases[0].namespace), types.buff(fredName)],
      alice.address
    );
    response = call.result.expectOk().expectTuple();
    response['owner'].expectPrincipal(fred.address);
    response['zonefile-hash'].expectBuff(cases[0].zonefile);

    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(true)], deployer.address),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(bob.address), types.uint(3)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(charlie.address), types.uint(1)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(dave.address), types.uint(2)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(elephant.address), types.uint(2)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(graphite.address), types.uint(2)],
        deployer.address
      ),
      Tx.contractCall(
        BNS_NFT_CONTRACT_NAME,
        SET_WHITELIST_SPOTS,
        [types.principal(hector.address), types.uint(2)],
        deployer.address
      ),
    ]);
    assertEquals(block.receipts.length, 7);
    assertEquals(block.height, 7);
    chain
      .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_WHITELIST_SPOTS, [types.principal(fred.address)], deployer.address)
      .result.expectNone();

    // whitelisted - can mint - 2, 3, 4, 5,
    // have bns - full-price - 2, 3, 6
    // try mint with
    //   2, 3 - full-price
    //   4, 5 - full
    //   6 - failed
    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], bob.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], charlie.address), // should fail
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], dave.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], elephant.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], fred.address), // should fail
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], graphite.address), // full-price
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], hector.address), // full-price
    ]);

    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[0].events[0].type, 'stx_transfer_event');
    assertEquals(block.receipts[0].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[0].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[0].events[1].nft_mint_event.recipient, bob.address);
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[1].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[1].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[1].events[1].nft_mint_event.recipient, bob.address);
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.sender, bob.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[2].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[2].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[2].events[1].nft_mint_event.recipient, bob.address);
    block.receipts[3].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.sender, charlie.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[3].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[3].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[3].events[1].nft_mint_event.recipient, charlie.address);
    block.receipts[4].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
    block.receipts[5].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.sender, dave.address);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[5].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[5].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[5].events[1].nft_mint_event.recipient, dave.address);
    block.receipts[6].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.sender, elephant.address);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[6].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[6].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[6].events[1].nft_mint_event.recipient, elephant.address);
    block.receipts[7].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
    block.receipts[8].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[8].events[0].stx_transfer_event.sender, graphite.address);
    assertEquals(block.receipts[8].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[8].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[8].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[8].events[1].nft_mint_event.recipient, graphite.address);
    block.receipts[9].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    assertEquals(block.receipts[9].events[0].stx_transfer_event.sender, hector.address);
    assertEquals(block.receipts[9].events[0].stx_transfer_event.recipient, deployer.address);
    assertEquals(block.receipts[9].events[0].stx_transfer_event.amount, MINT_PRICE);
    assertEquals(block.receipts[9].events[1].type, 'nft_mint_event');
    assertEquals(block.receipts[9].events[1].nft_mint_event.recipient, hector.address);

    let resss = '';
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(1)], deployer.address).result.expectSome(),
      '"bowtieddeployer.btc"'
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(2)], deployer.address).result.expectSome(),
      '"bowtieddeployer.btc"'
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(3)], deployer.address).result.expectSome(),
      '"bowtieddeployer.btc"'
    );
    assertEquals(
      (resss = chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(4)], deployer.address)
        .result.expectSome()),
      `"degensarecool.btc"`
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(5)], deployer.address).result.expectSome(),
      `"BitcoinDegen#5"`
    );
    assertEquals(
      chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(6)], deployer.address).result.expectSome(),
      `"BitcoinDegen#6"`
    );
    assertEquals(
      (resss = chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(7)], deployer.address)
        .result.expectSome()),
      `"graphite.btc"`
    );
    assertEquals(
      (resss = chain
        .callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(8)], deployer.address)
        .result.expectSome()),
      `"hector.stx"`
    );
    chain.callReadOnlyFn(BNS_NFT_CONTRACT_NAME, GET_NFT_NAME, [types.uint(9)], deployer.address).result.expectNone();
  },
});

// flow full
//
// Launch SC mint true and whitelist false
// mint 200 degens
// Stop mint
// Accept whitelist
// start mint
// mint 400 degens
// Close whitelist => open for everyone
// mint 600 degens
// fail to mint 100 degens more

Clarinet.test({
  name: 'Ensure that mainnet flow mint is working',
  // wallet 1, 2 are whitelisted, 3 is not whitelisted
  // wallet 1, 2 can mint, 3 cannot mint
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;
    const wallet_3 = accounts.get('wallet_3')!;
    const wallet_4 = accounts.get('wallet_4')!;
    const wallet_5 = accounts.get('wallet_5')!;
    const wallet_6 = accounts.get('wallet_6')!;
    // wallet 4 mints 1 degen 5 times
    // wallet 5 mints 5 degens 1 time
    // wallet 6 mints 10 degens 20 times

    let block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_4.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_4.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_4.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_4.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM, [], wallet_4.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_5, [], wallet_5.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, FNC_CLAIM_10, [], wallet_6.address),
    ]);
    assertEquals(block.receipts.length, 26);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[3].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[4].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[5].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[6].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[7].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[8].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[9].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[10].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[11].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[12].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[13].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[14].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[15].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[16].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[17].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[18].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[19].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[20].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[21].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[22].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[23].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[24].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[25].result.expectOk().expectBool(CLAIM_OK_RESPONSE);

    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_MINT_ENABLER, [types.bool(false)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);

    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(true)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);

    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_MINT_ENABLER, [types.bool(true)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);

    block = chain.mineBlock([
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
    assertEquals(block.height, 6);
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
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[3].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
    block.receipts[4].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[5].result.expectErr().expectUint(ERR_WHITELIST_ONLY);
    block.receipts[6].result.expectErr().expectUint(ERR_WHITELIST_ONLY);

    block = chain.mineBlock([
      Tx.contractCall(BNS_NFT_CONTRACT_NAME, SET_ONLY_WHITELIST, [types.bool(false)], deployer.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
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
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[1].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[2].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[3].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[4].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[5].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
    block.receipts[6].result.expectOk().expectBool(CLAIM_OK_RESPONSE);
  },
});

// mint 5 and mint 10 called
