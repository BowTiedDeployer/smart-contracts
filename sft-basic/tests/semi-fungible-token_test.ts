import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';
const contractName = 'semi-fungible-token';
const craftingFn = 'craft-item';
const getBalance = 'get-balance';
const mint = 'mint';
const gold = '1';
const energy = '2';
const wood = '3';
const iron = '4';
const woodenSword1 = '5';
const ironSword1 = '8';
const woodenArmor1 = '14';
const ironArmor1 = '17';
const woodenShield1 = '23';
const ironShield1 = '26';
const woodenHelmet1 = '32';
const ironHelmet1 = '35';
const woodenShoes1 = '41';
const ironShoes1 = '44';

Clarinet.test({
  name: 'Crafting Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 2

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden shield

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron shield

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShoes1)], admin.address)]);
    let balanceIron = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(admin.address)],
      admin.address
    );
    let balanceWood = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenShield1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronShield1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShield1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenHelmet1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenHelmet1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronHelmet1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironHelmet1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenShoes1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShoes1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronShoes1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShoes1), types.principal(admin.address)],
      admin.address
    );

    balanceIron.result.expectOk().expectUint(0);
    balanceWood.result.expectOk().expectUint(0);
    balanceWoodenSword1.result.expectOk().expectUint(1);
    balanceIronSword1.result.expectOk().expectUint(1);
    balanceWoodenArmor1.result.expectOk().expectUint(1);
    balanceIronArmor1.result.expectOk().expectUint(1);
    balanceWoodenShield1.result.expectOk().expectUint(1);
    balanceIronShield1.result.expectOk().expectUint(1);
    balanceWoodenHelmet1.result.expectOk().expectUint(1);
    balanceIronHelmet1.result.expectOk().expectUint(1);
    balanceWoodenShoes1.result.expectOk().expectUint(1);
    balanceIronShoes1.result.expectOk().expectUint(1);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});
