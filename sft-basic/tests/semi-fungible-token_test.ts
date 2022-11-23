import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';
const contractName = 'semi-fungible-token';
const craftingFn = 'craft-item';
const levelUpFn = 'level-up';
const acquisitionFn = 'buy-item';
const getBalance = 'get-balance';
const mint = 'mint';
const gold = '1';
const energy = '2';
const wood = '3';
const iron = '4';
const woodenSword1 = '5';
const woodenSword2 = '6';
const woodenSword3 = '7';
const ironSword1 = '8';
const ironSword2 = '9';
const ironSword3 = '10';
const enhancedSword1 = '11';
const enhancedSword2 = '12';
const enhancedSword3 = '13';
const woodenArmor1 = '14';
const woodenArmor2 = '15';
const woodenArmor3 = '16';
const ironArmor1 = '17';
const ironArmor2 = '18';
const ironArmor3 = '19';
const enhancedArmor1 = '20';
const enhancedArmor2 = '21';
const enhancedArmor3 = '22';
const woodenShield1 = '23';
const woodenShield2 = '24';
const woodenShield3 = '25';
const ironShield1 = '26';
const ironShield2 = '27';
const ironShield3 = '28';
const enhancedShield1 = '29';
const enhancedShield2 = '30';
const enhancedShield3 = '31';
const woodenHelmet1 = '32';
const woodenHelmet2 = '33';
const woodenHelmet3 = '34';
const ironHelmet1 = '35';
const ironHelmet2 = '36';
const ironHelmet3 = '37';
const enhancedHelmet1 = '38';
const enhancedHelmet2 = '39';
const enhancedHelmet3 = '40';
const woodenShoes1 = '41';
const woodenShoes2 = '42';
const woodenShoes3 = '43';
const ironShoes1 = '44';
const ironShoes2 = '45';
const ironShoes3 = '46';
const enhancedShoes1 = '47';
const enhancedShoes2 = '48';
const enhancedShoes3 = '49';

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

    // mint 10

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

Clarinet.test({
  name: 'Level up case',
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

    // craft woodenSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword3)], admin.address)]);
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

    // craft ironSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenSword3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword3.result.expectOk().expectUint(1);
    let balanceIronSword3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword3), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword3.result.expectOk().expectUint(1);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenArmor3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor3.result.expectOk().expectUint(1);
    let balanceIronArmor3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceIronArmor3.result.expectOk().expectUint(1);

    // mint 16

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // // craft enhancedArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 35);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 18

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 36);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 37);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 19

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 38);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 39);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 20

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 40);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 41);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 21

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 42);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 43);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 22

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 44);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 45);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 23

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 46);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 47);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 24

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 48);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 49);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenShield3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenShield3.result.expectOk().expectUint(1);
    let balanceIronShield3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShield3), types.principal(admin.address)],
      admin.address
    );
    balanceIronShield3.result.expectOk().expectUint(1);

    // mint 25

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 50);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 51);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 26

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 52);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 53);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 27

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 54);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 55);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 28

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 56);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 57);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 29

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 58);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 59);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 30

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 60);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 61);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 31

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 62);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 63);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 32

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 64);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 65);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 33

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 66);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 67);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenHelmet3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenHelmet3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenHelmet3.result.expectOk().expectUint(1);
    let balanceIronHelmet3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironHelmet3), types.principal(admin.address)],
      admin.address
    );
    balanceIronHelmet3.result.expectOk().expectUint(1);

    // mint 34

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 68);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 69);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 35

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 70);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 71);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 36

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 72);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 73);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 37

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 74);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 75);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 38

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 76);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 77);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 39

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 78);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 79);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 40

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 80);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 81);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 41

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 82);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 83);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 42

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 84);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSHoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 85);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenShoes3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShoes3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenShoes3.result.expectOk().expectUint(1);
    let balanceIronShoes3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShoes3), types.principal(admin.address)],
      admin.address
    );
    balanceIronShoes3.result.expectOk().expectUint(1);

    // mint 43

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 86);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 87);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 44

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 88);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 89);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 45

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 90);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 91);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Acquisition case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword1

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(40), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(500), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedSword2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(50), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(17), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(400), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(12), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(12), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedArmor2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedArmor2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShield3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShield2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(670), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedShield2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedShield2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(370), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedHelmet1

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedHelmet1)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(25), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 16

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(120), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 35);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Crafting with more resources case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // mint phase

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron sword 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden shield 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);

    // craft iron shield 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    let balanceGold = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(admin.address)],
      admin.address
    );
    let balanceEnergy = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(admin.address)],
      admin.address
    );
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

    balanceGold.result.expectOk().expectUint(9999);
    balanceEnergy.result.expectOk().expectUint(9999);
    balanceIron.result.expectOk().expectUint(9986);
    balanceWood.result.expectOk().expectUint(9986);
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
  },
});
