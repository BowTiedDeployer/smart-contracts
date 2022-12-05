import { Clarinet, Tx, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';
const errorInsufficientBalance = 1;
const errorInvalidSender = 4;
const contractName = 'semi-fungible-token';
const transferFn = 'transfer';
const craftingFn = 'craft-item';
const levelUpFn = 'level-up';
const acquisitionFn = 'buy-item';
const getBalance = 'get-balance';
const getCraftingResources = 'get-crafting-resources';
const getLevelUpResources = 'get-level-up-resources';
const getAcquisitionResources = 'get-acquisition-resources';
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
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        // mint 1
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden sword 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden sword 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 3
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden armor 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft iron armor 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden shield
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 11);
        // mint 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft iron shield
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 7
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenHelmet
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 8
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironHelmet
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 9
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenShoes
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 10
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironShoes
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        let balanceIron = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(iron),
            types.principal(admin.address)
        ], admin.address);
        let balanceWood = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(wood),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenSword1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronSword1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenArmor1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronArmor1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenShield1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShield1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronShield1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShield1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenHelmet1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenHelmet1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronHelmet1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironHelmet1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenShoes1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShoes1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronShoes1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShoes1),
            types.principal(admin.address)
        ], admin.address);
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
    }
});
Clarinet.test({
    name: 'Level up case',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        // mint 1
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 3
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenSword3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenSword3.result.expectOk().expectUint(1);
        let balanceIronSword3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronSword3.result.expectOk().expectUint(1);
        // mint 7
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft enhancedSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 8
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 9
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 10
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 11
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 22);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 23);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 12
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 24);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 25);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 13
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 26);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 27);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 14
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 28);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 29);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 15
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 30);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 31);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenArmor3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor3.result.expectOk().expectUint(1);
        let balanceIronArmor3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronArmor3.result.expectOk().expectUint(1);
        // mint 16
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 32);
        block.receipts[0].result.expectOk().expectBool(true);
        // // craft enhancedArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 33);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 17
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 34);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 35);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 18
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 36);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 37);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 19
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 38);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenShield1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 39);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 20
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 40);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 41);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 21
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 42);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 43);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 22
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 44);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironShield1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 45);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 23
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 46);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 47);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 24
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 48);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 49);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenShield3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShield3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenShield3.result.expectOk().expectUint(1);
        let balanceIronShield3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShield3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronShield3.result.expectOk().expectUint(1);
        // mint 25
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 50);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft enhancedShield1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 51);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 26
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 52);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 53);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 27
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 54);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 55);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 28
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 56);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 57);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 29
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 58);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 59);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 30
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 60);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 61);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 31
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 62);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 63);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 32
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 64);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 65);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 33
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 66);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 67);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenHelmet3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenHelmet3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenHelmet3.result.expectOk().expectUint(1);
        let balanceIronHelmet3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironHelmet3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronHelmet3.result.expectOk().expectUint(1);
        // mint 34
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 68);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft enhancedHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 69);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 35
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 70);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 71);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 36
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 72);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 73);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 37
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 74);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 75);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 38
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 76);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 77);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 39
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 78);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenShoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 79);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 40
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 80);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 81);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 41
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 82);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 83);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 42
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 84);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironSHoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 85);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenShoes3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShoes3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenShoes3.result.expectOk().expectUint(1);
        let balanceIronShoes3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShoes3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronShoes3.result.expectOk().expectUint(1);
        // mint 43
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 86);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft enhancedShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 87);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 44
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 88);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 89);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 45
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 90);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedShoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 91);
        block.receipts[0].result.expectOk().expectBool(true);
    }
});
Clarinet.test({
    name: 'Acquisition case',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        // mint 1
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(15),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(40),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 3
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(20),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(500),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(11),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(11),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedSword2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(15),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(50),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(17),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 7
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(20),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 8
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(400),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(12),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(12),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedArmor2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 9
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(150),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 10
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(230),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 11
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(670),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 22);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedShield2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 23);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 12
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(150),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 24);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 25);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 13
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(230),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 26);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 27);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 14
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(370),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 28);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedHelmet1)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 29);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 15
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(25),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 30);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 31);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 16
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(120),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 32);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenShoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 33);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 17
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 34);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 35);
        block.receipts[0].result.expectOk().expectBool(true);
    }
});
Clarinet.test({
    name: 'Crafting with more resources case',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        // mint phase
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 4);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden sword 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft iron sword 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden armor 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft iron armor 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden shield 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        // craft iron shield 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        let balanceGold = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(gold),
            types.principal(admin.address)
        ], admin.address);
        let balanceEnergy = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(energy),
            types.principal(admin.address)
        ], admin.address);
        let balanceIron = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(iron),
            types.principal(admin.address)
        ], admin.address);
        let balanceWood = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(wood),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenSword1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronSword1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenArmor1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronArmor1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenShield1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShield1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronShield1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShield1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenHelmet1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenHelmet1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronHelmet1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironHelmet1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenShoes1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShoes1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronShoes1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShoes1),
            types.principal(admin.address)
        ], admin.address);
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
    }
});
Clarinet.test({
    name: 'Level up with more resources case ',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        // mint phase
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 4);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up woodenSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        // levelup woodenSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenSword3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenSword3.result.expectOk().expectUint(1);
        let balanceIronSword3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronSword3.result.expectOk().expectUint(1);
        // craft enhancedSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up woodenArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // levelup woodenArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenArmor3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor3.result.expectOk().expectUint(1);
        let balanceIronArmor3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronArmor3.result.expectOk().expectUint(1);
        // // craft enhancedArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenShield1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up woodenShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 22);
        block.receipts[0].result.expectOk().expectBool(true);
        // levelup woodenShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 23);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironShield1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 24);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 25);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 26);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenShield3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShield3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenShield3.result.expectOk().expectUint(1);
        let balanceIronShield3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShield3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronShield3.result.expectOk().expectUint(1);
        // craft enhancedShield1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 27);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 28);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 29);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 30);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up woodenHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 31);
        block.receipts[0].result.expectOk().expectBool(true);
        // levelup woodenHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 32);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 33);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 34);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 35);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenHelmet3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenHelmet3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenHelmet3.result.expectOk().expectUint(1);
        let balanceIronHelmet3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironHelmet3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronHelmet3.result.expectOk().expectUint(1);
        // craft enhancedHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 36);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 37);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 38);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 39);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up woodenShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 40);
        block.receipts[0].result.expectOk().expectBool(true);
        // levelup woodenShoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 41);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 42);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 43);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up ironSHoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 44);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenShoes3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShoes3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenShoes3.result.expectOk().expectUint(1);
        let balanceIronShoes3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShoes3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronShoes3.result.expectOk().expectUint(1);
        // craft enhancedShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 45);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 46);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up enhancedShoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 47);
        block.receipts[0].result.expectOk().expectBool(true);
    }
});
Clarinet.test({
    name: 'Acquisition with more resources case',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        // mint 1
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(9999),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 4);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedSword2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedArmor2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedShield2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedHelmet1)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenShoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
    }
});
Clarinet.test({
    name: 'Crafting with less resources case',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        // NO MINT == NO RESOURCE AT ALL
        let block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // MINT ONE RESOURCE NOT ENOUGH
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft iron sword 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // MINT ONE RESOURCE NONE OF THE OTHERS
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(woodenSword3),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // try crafting enhanced sword 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // mint
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden armor 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft iron armor 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        // MINT TWO RESOURCES NONE OF THE THIRD
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(woodenArmor3),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(ironArmor3),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // try crafting enhanced armor 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // mint 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden shield
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        // mint 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft iron shield
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 7
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenHelmet
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 8
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironHelmet
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 9
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenShoes
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 22);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 10
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 23);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironShoes
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 24);
        block.receipts[0].result.expectOk().expectBool(true);
        let balanceIron = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(iron),
            types.principal(admin.address)
        ], admin.address);
        let balanceWood = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(wood),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenSword1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronSword1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword1),
            types.principal(admin.address)
        ], admin.address);
        let balanceEnhancedSword1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenArmor1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronArmor1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor1),
            types.principal(admin.address)
        ], admin.address);
        let balanceEnhancedArmor1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedArmor1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenShield1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShield1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronShield1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShield1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenHelmet1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenHelmet1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronHelmet1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironHelmet1),
            types.principal(admin.address)
        ], admin.address);
        let balanceWoodenShoes1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShoes1),
            types.principal(admin.address)
        ], admin.address);
        let balanceIronShoes1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShoes1),
            types.principal(admin.address)
        ], admin.address);
        balanceIron.result.expectOk().expectUint(2);
        balanceWood.result.expectOk().expectUint(0);
        balanceWoodenSword1.result.expectOk().expectUint(0);
        balanceIronSword1.result.expectOk().expectUint(0);
        balanceEnhancedSword1.result.expectOk().expectUint(0);
        balanceWoodenArmor1.result.expectOk().expectUint(1);
        balanceIronArmor1.result.expectOk().expectUint(1);
        balanceEnhancedArmor1.result.expectOk().expectUint(0);
        balanceWoodenShield1.result.expectOk().expectUint(1);
        balanceIronShield1.result.expectOk().expectUint(1);
        balanceWoodenHelmet1.result.expectOk().expectUint(1);
        balanceIronHelmet1.result.expectOk().expectUint(1);
        balanceWoodenShoes1.result.expectOk().expectUint(1);
        balanceIronShoes1.result.expectOk().expectUint(1);
    }
});
Clarinet.test({
    name: 'Level up with less resources case',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        // NO MINT == NO RESOURCE
        // craft woodenSword1
        let block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // MINT ONE RESOURCE NONE OF THE OTHER 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // level up woodenSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // MINT TWO RESOURCES NONE OF THE OTHER
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // MINT ONE RESOURCE NOT ENOUGH
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // mint 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // mint 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // intermediate balance check
        let balanceWoodenSword3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenSword3.result.expectOk().expectUint(0);
        let balanceIronSword3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronSword3.result.expectOk().expectUint(0);
        // mint 7
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(woodenSword3),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(ironSword3),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft enhancedSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 8
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 9
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 10
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 11
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 22);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 23);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 12
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 24);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 25);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 13
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 26);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 27);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 14
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 28);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 29);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 15
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 30);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 31);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenArmor3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor3.result.expectOk().expectUint(1);
        let balanceIronArmor3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronArmor3.result.expectOk().expectUint(1);
        // mint 16
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 32);
        block.receipts[0].result.expectOk().expectBool(true);
        // // craft enhancedArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 33);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 17
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(8),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 34);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 35);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 18
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 36);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 37);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 19
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 38);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenShield1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 39);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 20
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 40);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 41);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 21
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 42);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 43);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 22
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 44);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironShield1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 45);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 23
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 46);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 47);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 24
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 48);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 49);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenShield3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShield3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenShield3.result.expectOk().expectUint(1);
        let balanceIronShield3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShield3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronShield3.result.expectOk().expectUint(1);
        // mint 25
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 50);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft enhancedShield1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedShield1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 51);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 26
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 52);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 53);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 27
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 54);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 55);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 28
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 56);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 57);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 29
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 58);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 59);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 30
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 60);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 61);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 31
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 62);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 63);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 32
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 64);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 65);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 33
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 66);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 67);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenHelmet3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenHelmet3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenHelmet3.result.expectOk().expectUint(1);
        let balanceIronHelmet3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironHelmet3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronHelmet3.result.expectOk().expectUint(1);
        // mint 34
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 68);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft enhancedHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedHelmet1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 69);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 35
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 70);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 71);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 36
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 72);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 73);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 37
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 74);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 75);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 38
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 76);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 77);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 39
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 78);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenShoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 79);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 40
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 80);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 81);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 41
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 82);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 83);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 42
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 84);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironSHoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 85);
        block.receipts[0].result.expectOk().expectBool(true);
        // intermediate balance check
        let balanceWoodenShoes3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenShoes3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenShoes3.result.expectOk().expectUint(1);
        let balanceIronShoes3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironShoes3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronShoes3.result.expectOk().expectUint(1);
        // mint 43
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 86);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft enhancedShoes1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedShoes1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 87);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 44
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 88);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 89);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 45
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 90);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // level up enhancedShoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(enhancedShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 91);
        block.receipts[0].result.expectOk().expectBool(true);
    }
});
Clarinet.test({
    name: 'Acquisition with less resources case',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        // NO MINT == NO RESOURCE
        // buy woodenSword1
        let block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenSword1)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // MINT ONE RESOURCE NOT THE OTHER
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // MINT 2 RESOURCE EACH ONE NOT ENOUGH
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(19),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // buy ironSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // MINT ONE RESOURCE NONE OF THE OTHER 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(500),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedSword2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // MINT
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(15),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(50),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(17),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 7
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(20),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // MINT TWO RESOURCES NONE OF THE OTHER
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(400),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(12),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // buy enhancedArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedArmor2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
        // mint 9
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(150),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenShield3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenShield3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 10
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(230),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironShield2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 11
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(670),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // buy enhancedShield2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedShield2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 22);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 12
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(150),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 23);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // buy woodenHelmet3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenHelmet3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 24);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 13
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(230),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 25);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // buy ironHelmet2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironHelmet2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 26);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 14
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(370),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 27);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // buy enhancedHelmet1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedHelmet1)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 28);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 15
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(25),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 29);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // buy woodenShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 30);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 16
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(120),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 31);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // buy woodenShoes3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenShoes3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 32);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 17
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 33);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // buy ironShoes2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironShoes2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 34);
        block.receipts[0].result.expectOk().expectBool(true);
    }
});
Clarinet.test({
    name: 'Getter read only functions test',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        let craftingNoneList = [
            6,
            7,
            9,
            10,
            12,
            13,
            15,
            16,
            18,
            19,
            21,
            22,
            24,
            25,
            27,
            28,
            30,
            31,
            33,
            34,
            36,
            37,
            39,
            40,
            42,
            43,
            45,
            46,
            48,
            49, 
        ];
        let levelupNoneList = [
            5,
            8,
            11,
            14,
            17,
            20,
            23,
            26,
            29,
            32,
            35,
            38,
            41,
            44,
            47
        ];
        let acquisitionNoneList = [
            7,
            8,
            10,
            11,
            13,
            15,
            17,
            19,
            20,
            22,
            23,
            24,
            26,
            28,
            29,
            31,
            32,
            33,
            35,
            37,
            39,
            40,
            41,
            44,
            46,
            47,
            48,
            49, 
        ];
        for(let i = 5; i < 50; i++){
            let craftingResources = chain.callReadOnlyFn(contractName, getCraftingResources, [
                types.uint(i)
            ], admin.address);
            let levelUpResources = chain.callReadOnlyFn(contractName, getLevelUpResources, [
                types.uint(i)
            ], admin.address);
            let acquisitionResources = chain.callReadOnlyFn(contractName, getAcquisitionResources, [
                types.uint(i)
            ], admin.address);
            if (craftingNoneList.indexOf(i) > -1) {
                craftingResources.result.expectOk().expectNone();
            } else {
                craftingResources.result.expectOk().expectSome();
            }
            if (levelupNoneList.indexOf(i) > -1) {
                levelUpResources.result.expectOk().expectNone();
            } else {
                levelUpResources.result.expectOk().expectSome();
            }
            if (acquisitionNoneList.indexOf(i) > -1) {
                acquisitionResources.result.expectOk().expectNone();
            } else {
                acquisitionResources.result.expectOk().expectSome();
            }
        }
    }
});
Clarinet.test({
    name: 'Transfer resources test',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        const user1 = accounts.get('wallet_1');
        const user2 = accounts.get('wallet_2');
        const user3 = accounts.get('wallet_3');
        const user4 = accounts.get('wallet_4');
        // mint resources
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(1000),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(1000),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(1000),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(1000),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 4);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        block.receipts[3].result.expectOk().expectBool(true);
        // transfer 100 gold from admin to user 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(gold),
                types.uint(100),
                types.principal(admin.address),
                types.principal(user1.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 1st transfer
        let balanceIronAdmin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(gold),
            types.principal(admin.address)
        ], admin.address);
        balanceIronAdmin.result.expectOk().expectUint(900);
        let balanceIronUser1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(gold),
            types.principal(user1.address)
        ], user1.address);
        balanceIronUser1.result.expectOk().expectUint(100);
        // transfer 200 energy from admin to user 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(energy),
                types.uint(200),
                types.principal(admin.address),
                types.principal(user2.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 2nd transfer
        let balanceEnergyAdmin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(energy),
            types.principal(admin.address)
        ], admin.address);
        balanceEnergyAdmin.result.expectOk().expectUint(800);
        let balanceIronUser4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(energy),
            types.principal(user2.address)
        ], user2.address);
        balanceIronUser4.result.expectOk().expectUint(200);
        // transfer 300 wood from admin to user
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(wood),
                types.uint(300),
                types.principal(admin.address),
                types.principal(user3.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 3rd transfer
        balanceIronAdmin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(wood),
            types.principal(admin.address)
        ], admin.address);
        balanceIronAdmin.result.expectOk().expectUint(700);
        balanceIronUser4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(wood),
            types.principal(user3.address)
        ], user1.address);
        balanceIronUser4.result.expectOk().expectUint(300);
        // transfer 400 iron from admin to user 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(iron),
                types.uint(400),
                types.principal(admin.address),
                types.principal(user4.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 4th transfer
        balanceIronAdmin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(iron),
            types.principal(admin.address)
        ], admin.address);
        balanceIronAdmin.result.expectOk().expectUint(600);
        balanceIronUser4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(iron),
            types.principal(user4.address)
        ], user1.address);
        balanceIronUser4.result.expectOk().expectUint(400);
        // transfer 50 energy from user2 to user4
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(energy),
                types.uint(50),
                types.principal(user2.address),
                types.principal(user4.address)
            ], user2.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 5th transfer
        balanceIronAdmin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(energy),
            types.principal(admin.address)
        ], admin.address);
        balanceIronAdmin.result.expectOk().expectUint(800);
        balanceIronUser4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(energy),
            types.principal(user2.address)
        ], user1.address);
        balanceIronUser4.result.expectOk().expectUint(150);
        let balanceEnergyUser4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(energy),
            types.principal(user4.address)
        ], user4.address);
        balanceEnergyUser4.result.expectOk().expectUint(50);
        // transfer 50 gold from user1 to user2
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(gold),
                types.uint(50),
                types.principal(user1.address),
                types.principal(user2.address)
            ], user1.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 6th transfer
        balanceIronAdmin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(gold),
            types.principal(admin.address)
        ], admin.address);
        balanceIronAdmin.result.expectOk().expectUint(900);
        balanceIronUser1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(gold),
            types.principal(user1.address)
        ], user1.address);
        balanceIronUser1.result.expectOk().expectUint(50);
        balanceIronUser4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(gold),
            types.principal(user2.address)
        ], user2.address);
        balanceIronUser4.result.expectOk().expectUint(50);
        // transfer 50 wood from user3 to user1
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(wood),
                types.uint(50),
                types.principal(user3.address),
                types.principal(user1.address)
            ], user3.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 6th transfer
        balanceIronAdmin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(wood),
            types.principal(admin.address)
        ], admin.address);
        balanceIronAdmin.result.expectOk().expectUint(700);
        balanceIronUser1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(wood),
            types.principal(user1.address)
        ], user1.address);
        balanceIronUser1.result.expectOk().expectUint(50);
        balanceIronUser4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(wood),
            types.principal(user3.address)
        ], user3.address);
        balanceIronUser4.result.expectOk().expectUint(250);
        // transfer 50 iron from user4 to user3
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(iron),
                types.uint(50),
                types.principal(user4.address),
                types.principal(user3.address)
            ], user4.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 6th transfer
        balanceIronAdmin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(iron),
            types.principal(admin.address)
        ], admin.address);
        balanceIronAdmin.result.expectOk().expectUint(600);
        let balanceIronUser3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(iron),
            types.principal(user3.address)
        ], user3.address);
        balanceIronUser3.result.expectOk().expectUint(50);
        balanceIronUser4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(iron),
            types.principal(user4.address)
        ], user4.address);
        balanceIronUser4.result.expectOk().expectUint(350);
    }
});
Clarinet.test({
    name: 'Transfer crafted items test',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        const user1 = accounts.get('wallet_1');
        const user2 = accounts.get('wallet_2');
        const user3 = accounts.get('wallet_3');
        const user4 = accounts.get('wallet_4');
        const user5 = accounts.get('wallet_5');
        const user6 = accounts.get('wallet_6');
        // mint 1
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden sword 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden sword 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 3
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft wooden armor 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft iron armor 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(woodenSword3),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(ironSword3),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // craft enhancedSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(woodenArmor3),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(ironArmor3),
                types.uint(1),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[2].result.expectOk().expectBool(true);
        // craft enhancedArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(enhancedArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // transfer 1 woodenSword1 from admin to user 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenSword1),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user1.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 1st transfer
        let balanceWoodenSword1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenSword1Admin.result.expectOk().expectUint(0);
        let balanceWoodenSword1User1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(user1.address)
        ], user1.address);
        balanceWoodenSword1User1.result.expectOk().expectUint(1);
        // transfer 1 ironSword1 from admin to user 2 xxx
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironSword1),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user2.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 2nd transfer
        let balanceIronSword1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword1),
            types.principal(admin.address)
        ], admin.address);
        balanceIronSword1Admin.result.expectOk().expectUint(0);
        let balanceIronSword1User2 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword1),
            types.principal(user2.address)
        ], user2.address);
        balanceIronSword1User2.result.expectOk().expectUint(1);
        // transfer 1 enhancedSword1 from admin to user3
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(enhancedSword1),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user3.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 3rd transfer
        let balanceEnhancedSword1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword1),
            types.principal(admin.address)
        ], admin.address);
        balanceEnhancedSword1Admin.result.expectOk().expectUint(0);
        let balanceEnhancedSword1User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword1),
            types.principal(user3.address)
        ], user3.address);
        balanceEnhancedSword1User3.result.expectOk().expectUint(1);
        // transfer 1 woodenArmor1 from admin to user 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenArmor1),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user4.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 4th transfer
        let balanceWoodenArmor1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor1Admin.result.expectOk().expectUint(0);
        let balanceWoodenArmor1User4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(user4.address)
        ], user4.address);
        balanceWoodenArmor1User4.result.expectOk().expectUint(1);
        // transfer 1 ironArmor1 from admin to user 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironArmor1),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user5.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 5th transfer
        let balanceIronArmor1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor1),
            types.principal(admin.address)
        ], admin.address);
        balanceIronArmor1Admin.result.expectOk().expectUint(0);
        let balanceIronArmor1User5 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor1),
            types.principal(user5.address)
        ], user5.address);
        balanceIronArmor1User5.result.expectOk().expectUint(1);
        // transfer 1 enhancedArmor from admin to user 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(enhancedArmor1),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user6.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 6th transfer
        let balanceEnhancedArmor1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedArmor1),
            types.principal(admin.address)
        ], admin.address);
        balanceEnhancedArmor1Admin.result.expectOk().expectUint(0);
        let balanceEnhancedArmor1User6 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedArmor1),
            types.principal(user6.address)
        ], user6.address);
        balanceEnhancedArmor1User6.result.expectOk().expectUint(1);
        // transfer 1 woodenSword1 from user1 to user3
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenSword1),
                types.uint(1),
                types.principal(user1.address),
                types.principal(user3.address)
            ], user1.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 7th transfer
        balanceWoodenSword1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenSword1Admin.result.expectOk().expectUint(0);
        balanceWoodenSword1User1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(user1.address)
        ], user1.address);
        balanceWoodenSword1User1.result.expectOk().expectUint(0);
        let balanceWoodenSword1User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(user3.address)
        ], user3.address);
        balanceWoodenSword1User3.result.expectOk().expectUint(1);
        // transfer 1 ironSword1 from user2 to user4
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironSword1),
                types.uint(1),
                types.principal(user2.address),
                types.principal(user4.address)
            ], user2.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 8th transfer
        balanceIronSword1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword1),
            types.principal(admin.address)
        ], admin.address);
        balanceIronSword1Admin.result.expectOk().expectUint(0);
        balanceIronSword1User2 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword1),
            types.principal(user2.address)
        ], user2.address);
        balanceIronSword1User2.result.expectOk().expectUint(0);
        let balanceIronSword1User4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword1),
            types.principal(user4.address)
        ], user4.address);
        balanceIronSword1User4.result.expectOk().expectUint(1);
        // transfer 1 enhancedSword1 from user3 to user5
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(enhancedSword1),
                types.uint(1),
                types.principal(user3.address),
                types.principal(user5.address)
            ], user3.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 22);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 9th transfer
        balanceEnhancedSword1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword1),
            types.principal(admin.address)
        ], admin.address);
        balanceEnhancedSword1Admin.result.expectOk().expectUint(0);
        balanceEnhancedSword1User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword1),
            types.principal(user3.address)
        ], user3.address);
        balanceEnhancedSword1User3.result.expectOk().expectUint(0);
        let balanceEnhancedSword1User5 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword1),
            types.principal(user5.address)
        ], user5.address);
        balanceEnhancedSword1User5.result.expectOk().expectUint(1);
        // transfer 1 woodenArmor1 from user4 to user6
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenArmor1),
                types.uint(1),
                types.principal(user4.address),
                types.principal(user6.address)
            ], user4.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 23);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 10th transfer
        balanceWoodenArmor1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor1Admin.result.expectOk().expectUint(0);
        balanceWoodenArmor1User4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(user4.address)
        ], user4.address);
        balanceWoodenArmor1User4.result.expectOk().expectUint(0);
        let balanceWoodenArmor1User6 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(user6.address)
        ], user6.address);
        balanceWoodenArmor1User6.result.expectOk().expectUint(1);
        // transfer 1 ironArmor1 from user5 to user1
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironArmor1),
                types.uint(1),
                types.principal(user5.address),
                types.principal(user1.address)
            ], user5.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 24);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 11th transfer
        balanceIronArmor1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor1),
            types.principal(admin.address)
        ], admin.address);
        balanceIronArmor1Admin.result.expectOk().expectUint(0);
        balanceIronArmor1User5 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor1),
            types.principal(user5.address)
        ], user5.address);
        balanceIronArmor1User5.result.expectOk().expectUint(0);
        let balanceIronArmor1User1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor1),
            types.principal(user1.address)
        ], user1.address);
        balanceIronArmor1User1.result.expectOk().expectUint(1);
        // transfer 1 enhancedArmor from user6 to user2
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(enhancedArmor1),
                types.uint(1),
                types.principal(user6.address),
                types.principal(user2.address)
            ], user6.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 25);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 12th transfer
        balanceEnhancedArmor1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedArmor1),
            types.principal(admin.address)
        ], admin.address);
        balanceEnhancedArmor1Admin.result.expectOk().expectUint(0);
        balanceEnhancedArmor1User6 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedArmor1),
            types.principal(user6.address)
        ], user6.address);
        balanceEnhancedArmor1User6.result.expectOk().expectUint(0);
        let balanceEnhancedArmor1User2 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedArmor1),
            types.principal(user2.address)
        ], user2.address);
        balanceEnhancedArmor1User2.result.expectOk().expectUint(1);
    }
});
Clarinet.test({
    name: 'Transfer level-up items test',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        const user1 = accounts.get('wallet_1');
        const user2 = accounts.get('wallet_2');
        const user3 = accounts.get('wallet_3');
        const user4 = accounts.get('wallet_4');
        const user5 = accounts.get('wallet_5');
        const user6 = accounts.get('wallet_6');
        // mint 1
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 3
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironSword3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironSword3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 7
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft woodenArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 8
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(2),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up woodenArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 9
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(3),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // levelup woodenArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(woodenArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 10
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(4),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // craft ironArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, craftingFn, [
                types.uint(ironArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 11
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 22);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironArmor2
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironArmor2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 23);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 12
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(10),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(energy),
                types.uint(6),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 24);
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // level up ironArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, levelUpFn, [
                types.uint(ironArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 25);
        block.receipts[0].result.expectOk().expectBool(true);
        // transfer 1 woodenSword3 from admin to user3
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenSword3),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user3.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 26);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 1st transfer
        let balanceWoodenSword3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenSword3Admin.result.expectOk().expectUint(0);
        let balanceWoodenSword3User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword3),
            types.principal(user3.address)
        ], user3.address);
        balanceWoodenSword3User3.result.expectOk().expectUint(1);
        // transfer 1 woodenArmor3 from admin to user 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenArmor3),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user6.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 27);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 2nd transfer
        let balanceWoodenArmor3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor3Admin.result.expectOk().expectUint(0);
        let balanceWoodenArmor3User6 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(user6.address)
        ], user6.address);
        balanceWoodenArmor3User6.result.expectOk().expectUint(1);
        // transfer 1 ironSword3 from admin to user 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironSword3),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user2.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 28);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 3rd transfer
        let balanceIronSword3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronSword3Admin.result.expectOk().expectUint(0);
        let balanceIronSword3User2 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword3),
            types.principal(user2.address)
        ], user2.address);
        balanceIronSword3User2.result.expectOk().expectUint(1);
        // transfer 1 ironArmor3 from admin to user 3
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironArmor3),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user3.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 29);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 4th transfer
        let balanceIronArmor3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronArmor3Admin.result.expectOk().expectUint(0);
        let balanceIronArmor3User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor3),
            types.principal(user3.address)
        ], user3.address);
        balanceIronArmor3User3.result.expectOk().expectUint(1);
        // transfer 1 woodenSword3 from user3 to user1
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenSword3),
                types.uint(1),
                types.principal(user3.address),
                types.principal(user1.address)
            ], user3.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 30);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 5th transfer
        balanceWoodenSword3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenSword3Admin.result.expectOk().expectUint(0);
        balanceWoodenSword3User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword3),
            types.principal(user3.address)
        ], user3.address);
        balanceWoodenSword3User3.result.expectOk().expectUint(0);
        let balanceWoodenSword3User1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword3),
            types.principal(user1.address)
        ], user1.address);
        balanceWoodenSword3User1.result.expectOk().expectUint(1);
        // transfer 1 woodenArmor3 from user6 to user2
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenArmor3),
                types.uint(1),
                types.principal(user6.address),
                types.principal(user2.address)
            ], user6.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 31);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 6th transfer
        balanceWoodenArmor3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor3Admin.result.expectOk().expectUint(0);
        balanceWoodenArmor3User6 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(user6.address)
        ], user6.address);
        balanceWoodenArmor3User6.result.expectOk().expectUint(0);
        let balanceWoodenArmor3User2 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(user2.address)
        ], user2.address);
        balanceWoodenArmor3User2.result.expectOk().expectUint(1);
        // transfer 1 ironSword3 from user2 to user4
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironSword3),
                types.uint(1),
                types.principal(user2.address),
                types.principal(user4.address)
            ], user2.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 32);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 7th transfer
        balanceIronSword3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronSword3Admin.result.expectOk().expectUint(0);
        balanceIronSword3User2 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword3),
            types.principal(user2.address)
        ], user2.address);
        balanceIronSword3User2.result.expectOk().expectUint(0);
        let balanceIronSword3User4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword3),
            types.principal(user4.address)
        ], user4.address);
        balanceIronSword3User4.result.expectOk().expectUint(1);
        // transfer 1 ironArmor3 from user3 to user5 XXXXXXXXXXXXX
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironArmor3),
                types.uint(1),
                types.principal(user3.address),
                types.principal(user5.address)
            ], user3.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 33);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 4th transfer
        balanceIronArmor3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceIronArmor3Admin.result.expectOk().expectUint(0);
        balanceIronArmor3User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor3),
            types.principal(user3.address)
        ], user3.address);
        balanceIronArmor3User3.result.expectOk().expectUint(0);
        let balanceIronArmor3User5 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironArmor3),
            types.principal(user5.address)
        ], user5.address);
        balanceIronArmor3User5.result.expectOk().expectUint(1);
    }
});
Clarinet.test({
    name: 'Transfer acquisition items test',
    async fn (chain, accounts) {
        const admin = accounts.get('deployer');
        const user1 = accounts.get('wallet_1');
        const user2 = accounts.get('wallet_2');
        const user3 = accounts.get('wallet_3');
        const user4 = accounts.get('wallet_4');
        const user5 = accounts.get('wallet_5');
        const user6 = accounts.get('wallet_6');
        // mint 1
        let block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(15),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenSword1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenSword1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 3);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(40),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(7),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 4);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 5);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 3
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(5),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(20),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 6);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy ironSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(ironSword2)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 7);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(500),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(iron),
                types.uint(11),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(11),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 8);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy enhancedSword2
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(enhancedSword2)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 9);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(15),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 10);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenArmor1
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenArmor1)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 11);
        block.receipts[0].result.expectOk().expectBool(true);
        // mint 6
        block = chain.mineBlock([
            Tx.contractCall(contractName, mint, [
                types.uint(gold),
                types.uint(50),
                types.principal(admin.address)
            ], admin.address),
            Tx.contractCall(contractName, mint, [
                types.uint(wood),
                types.uint(17),
                types.principal(admin.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 12);
        block.receipts[0].result.expectOk().expectBool(true);
        // buy woodenArmor3
        block = chain.mineBlock([
            Tx.contractCall(contractName, acquisitionFn, [
                types.uint(woodenArmor3)
            ], admin.address)
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 13);
        block.receipts[0].result.expectOk().expectBool(true);
        // transfer 1 woodenSword1 from admin to user 1
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenSword1),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user1.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 14);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 1st transfer
        let balanceWoodenSword1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenSword1Admin.result.expectOk().expectUint(0);
        let balanceWoodenSword1User1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(user1.address)
        ], user1.address);
        balanceWoodenSword1User1.result.expectOk().expectUint(1);
        // transfer 1 ironSword2 from admin to user 2
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironSword2),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user2.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 15);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 2nd transfer
        let balanceIronSword2Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword2),
            types.principal(admin.address)
        ], admin.address);
        balanceIronSword2Admin.result.expectOk().expectUint(0);
        let balanceIronSword2User2 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword2),
            types.principal(user2.address)
        ], user2.address);
        balanceIronSword2User2.result.expectOk().expectUint(1);
        // transfer 1 enhancedSword2 from admin to user3
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(enhancedSword2),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user3.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 16);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 3rd transfer
        let balanceEnhancedSword2Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword2),
            types.principal(admin.address)
        ], admin.address);
        balanceEnhancedSword2Admin.result.expectOk().expectUint(0);
        let balanceEnhancedSword2User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword2),
            types.principal(user3.address)
        ], user3.address);
        balanceEnhancedSword2User3.result.expectOk().expectUint(1);
        // transfer 1 woodenArmor1 from admin to user 4
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenArmor1),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user4.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 17);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 4th transfer
        let balanceWoodenArmor1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor1Admin.result.expectOk().expectUint(0);
        let balanceWoodenArmor1User4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(user4.address)
        ], user4.address);
        balanceWoodenArmor1User4.result.expectOk().expectUint(1);
        // transfer 1 woodenArmor3 from admin to user 5
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenArmor3),
                types.uint(1),
                types.principal(admin.address),
                types.principal(user5.address)
            ], admin.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 18);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 5th transfer
        let balanceWoodenArmor3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor3Admin.result.expectOk().expectUint(0);
        let balanceWoodenArmor3User5 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(user5.address)
        ], user5.address);
        balanceWoodenArmor3User5.result.expectOk().expectUint(1);
        // transfer 1 woodenSword1 from user1 to user2
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenSword1),
                types.uint(1),
                types.principal(user1.address),
                types.principal(user2.address)
            ], user1.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 19);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 6th transfer
        balanceWoodenSword1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenSword1Admin.result.expectOk().expectUint(0);
        balanceWoodenSword1User1 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(user1.address)
        ], user1.address);
        balanceWoodenSword1User1.result.expectOk().expectUint(0);
        let balanceWoodenSword1User2 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenSword1),
            types.principal(user2.address)
        ], user2.address);
        balanceWoodenSword1User2.result.expectOk().expectUint(1);
        // transfer 1 ironSword2 from user2 to user3
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(ironSword2),
                types.uint(1),
                types.principal(user2.address),
                types.principal(user3.address)
            ], user2.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 20);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 7th transfer
        balanceIronSword2Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword2),
            types.principal(admin.address)
        ], admin.address);
        balanceIronSword2Admin.result.expectOk().expectUint(0);
        balanceIronSword2User2 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword2),
            types.principal(user2.address)
        ], user2.address);
        balanceIronSword2User2.result.expectOk().expectUint(0);
        let balanceIronSword2User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(ironSword2),
            types.principal(user3.address)
        ], user3.address);
        balanceIronSword2User3.result.expectOk().expectUint(1);
        // transfer 1 enhancedSword2 from user3 to user4
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(enhancedSword2),
                types.uint(1),
                types.principal(user3.address),
                types.principal(user4.address)
            ], user3.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 21);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 8th transfer
        balanceEnhancedSword2Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword2),
            types.principal(admin.address)
        ], admin.address);
        balanceEnhancedSword2Admin.result.expectOk().expectUint(0);
        balanceEnhancedSword2User3 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword2),
            types.principal(user3.address)
        ], user3.address);
        balanceEnhancedSword2User3.result.expectOk().expectUint(0);
        let balanceEnhancedSword2User4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(enhancedSword2),
            types.principal(user4.address)
        ], user4.address);
        balanceEnhancedSword2User4.result.expectOk().expectUint(1);
        // transfer 1 woodenArmor1 from user4 to user5
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenArmor1),
                types.uint(1),
                types.principal(user4.address),
                types.principal(user5.address)
            ], user4.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 22);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 9th transfer
        balanceWoodenArmor1Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor1Admin.result.expectOk().expectUint(0);
        balanceWoodenArmor1User4 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(user4.address)
        ], user4.address);
        balanceWoodenArmor1User4.result.expectOk().expectUint(0);
        let balanceWoodenArmor1User5 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor1),
            types.principal(user5.address)
        ], user5.address);
        balanceWoodenArmor1User5.result.expectOk().expectUint(1);
        // transfer 1 woodenArmor3 from user5 to user6 XXXXXXXXXXXXXXXXXXXXX
        block = chain.mineBlock([
            Tx.contractCall(contractName, transferFn, [
                types.uint(woodenArmor3),
                types.uint(1),
                types.principal(user5.address),
                types.principal(user6.address)
            ], user5.address), 
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 23);
        block.receipts[0].result.expectOk().expectBool(true);
        // balance after 5th transfer
        balanceWoodenArmor3Admin = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(admin.address)
        ], admin.address);
        balanceWoodenArmor3Admin.result.expectOk().expectUint(0);
        balanceWoodenArmor3User5 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(user5.address)
        ], user5.address);
        balanceWoodenArmor3User5.result.expectOk().expectUint(0);
        let balanceWoodenArmor3User6 = chain.callReadOnlyFn(contractName, getBalance, [
            types.uint(woodenArmor3),
            types.principal(user6.address)
        ], user6.address);
        balanceWoodenArmor3User6.result.expectOk().expectUint(1);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vVXNlcnMvZGVwbG95ZXIvRGVza3RvcC9TdGFja3NEZWdlbnMvc21hcnQtY29udHJhY3RzL3NmdC1iYXNpYy90ZXN0cy9zZW1pLWZ1bmdpYmxlLXRva2VuX3Rlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xhcmluZXQsIFR4LCBDaGFpbiwgQWNjb3VudCwgdHlwZXMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC94L2NsYXJpbmV0QHYxLjAuMy9pbmRleC50cyc7XG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC45MC4wL3Rlc3RpbmcvYXNzZXJ0cy50cyc7XG5jb25zdCBlcnJvckluc3VmZmljaWVudEJhbGFuY2UgPSAxO1xuY29uc3QgZXJyb3JJbnZhbGlkU2VuZGVyID0gNDtcbmNvbnN0IGNvbnRyYWN0TmFtZSA9ICdzZW1pLWZ1bmdpYmxlLXRva2VuJztcbmNvbnN0IHRyYW5zZmVyRm4gPSAndHJhbnNmZXInO1xuY29uc3QgY3JhZnRpbmdGbiA9ICdjcmFmdC1pdGVtJztcbmNvbnN0IGxldmVsVXBGbiA9ICdsZXZlbC11cCc7XG5jb25zdCBhY3F1aXNpdGlvbkZuID0gJ2J1eS1pdGVtJztcbmNvbnN0IGdldEJhbGFuY2UgPSAnZ2V0LWJhbGFuY2UnO1xuY29uc3QgZ2V0Q3JhZnRpbmdSZXNvdXJjZXMgPSAnZ2V0LWNyYWZ0aW5nLXJlc291cmNlcyc7XG5jb25zdCBnZXRMZXZlbFVwUmVzb3VyY2VzID0gJ2dldC1sZXZlbC11cC1yZXNvdXJjZXMnO1xuY29uc3QgZ2V0QWNxdWlzaXRpb25SZXNvdXJjZXMgPSAnZ2V0LWFjcXVpc2l0aW9uLXJlc291cmNlcyc7XG5jb25zdCBtaW50ID0gJ21pbnQnO1xuY29uc3QgZ29sZCA9ICcxJztcbmNvbnN0IGVuZXJneSA9ICcyJztcbmNvbnN0IHdvb2QgPSAnMyc7XG5jb25zdCBpcm9uID0gJzQnO1xuY29uc3Qgd29vZGVuU3dvcmQxID0gJzUnO1xuY29uc3Qgd29vZGVuU3dvcmQyID0gJzYnO1xuY29uc3Qgd29vZGVuU3dvcmQzID0gJzcnO1xuY29uc3QgaXJvblN3b3JkMSA9ICc4JztcbmNvbnN0IGlyb25Td29yZDIgPSAnOSc7XG5jb25zdCBpcm9uU3dvcmQzID0gJzEwJztcbmNvbnN0IGVuaGFuY2VkU3dvcmQxID0gJzExJztcbmNvbnN0IGVuaGFuY2VkU3dvcmQyID0gJzEyJztcbmNvbnN0IGVuaGFuY2VkU3dvcmQzID0gJzEzJztcbmNvbnN0IHdvb2RlbkFybW9yMSA9ICcxNCc7XG5jb25zdCB3b29kZW5Bcm1vcjIgPSAnMTUnO1xuY29uc3Qgd29vZGVuQXJtb3IzID0gJzE2JztcbmNvbnN0IGlyb25Bcm1vcjEgPSAnMTcnO1xuY29uc3QgaXJvbkFybW9yMiA9ICcxOCc7XG5jb25zdCBpcm9uQXJtb3IzID0gJzE5JztcbmNvbnN0IGVuaGFuY2VkQXJtb3IxID0gJzIwJztcbmNvbnN0IGVuaGFuY2VkQXJtb3IyID0gJzIxJztcbmNvbnN0IGVuaGFuY2VkQXJtb3IzID0gJzIyJztcbmNvbnN0IHdvb2RlblNoaWVsZDEgPSAnMjMnO1xuY29uc3Qgd29vZGVuU2hpZWxkMiA9ICcyNCc7XG5jb25zdCB3b29kZW5TaGllbGQzID0gJzI1JztcbmNvbnN0IGlyb25TaGllbGQxID0gJzI2JztcbmNvbnN0IGlyb25TaGllbGQyID0gJzI3JztcbmNvbnN0IGlyb25TaGllbGQzID0gJzI4JztcbmNvbnN0IGVuaGFuY2VkU2hpZWxkMSA9ICcyOSc7XG5jb25zdCBlbmhhbmNlZFNoaWVsZDIgPSAnMzAnO1xuY29uc3QgZW5oYW5jZWRTaGllbGQzID0gJzMxJztcbmNvbnN0IHdvb2RlbkhlbG1ldDEgPSAnMzInO1xuY29uc3Qgd29vZGVuSGVsbWV0MiA9ICczMyc7XG5jb25zdCB3b29kZW5IZWxtZXQzID0gJzM0JztcbmNvbnN0IGlyb25IZWxtZXQxID0gJzM1JztcbmNvbnN0IGlyb25IZWxtZXQyID0gJzM2JztcbmNvbnN0IGlyb25IZWxtZXQzID0gJzM3JztcbmNvbnN0IGVuaGFuY2VkSGVsbWV0MSA9ICczOCc7XG5jb25zdCBlbmhhbmNlZEhlbG1ldDIgPSAnMzknO1xuY29uc3QgZW5oYW5jZWRIZWxtZXQzID0gJzQwJztcbmNvbnN0IHdvb2RlblNob2VzMSA9ICc0MSc7XG5jb25zdCB3b29kZW5TaG9lczIgPSAnNDInO1xuY29uc3Qgd29vZGVuU2hvZXMzID0gJzQzJztcbmNvbnN0IGlyb25TaG9lczEgPSAnNDQnO1xuY29uc3QgaXJvblNob2VzMiA9ICc0NSc7XG5jb25zdCBpcm9uU2hvZXMzID0gJzQ2JztcbmNvbnN0IGVuaGFuY2VkU2hvZXMxID0gJzQ3JztcbmNvbnN0IGVuaGFuY2VkU2hvZXMyID0gJzQ4JztcbmNvbnN0IGVuaGFuY2VkU2hvZXMzID0gJzQ5JztcblxuQ2xhcmluZXQudGVzdCh7XG4gIG5hbWU6ICdDcmFmdGluZyBDYXNlJyxcbiAgYXN5bmMgZm4oY2hhaW46IENoYWluLCBhY2NvdW50czogTWFwPHN0cmluZywgQWNjb3VudD4pIHtcbiAgICBjb25zdCBhZG1pbiA9IGFjY291bnRzLmdldCgnZGVwbG95ZXInKSE7XG5cbiAgICAvLyBtaW50IDFcblxuICAgIGxldCBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbiBzd29yZCAxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCB3b29kZW4gc3dvcmQgMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGlyb25Td29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbiBhcm1vciAxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uIGFybW9yIDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuIHNoaWVsZFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlblNoaWVsZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMSk7XG5cbiAgICAvLyBtaW50IDZcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb24gc2hpZWxkXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvblNoaWVsZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgN1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuSGVsbWV0XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuSGVsbWV0MSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA4XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uSGVsbWV0XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgOVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuU2hvZXNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5TaG9lczEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTBcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25TaG9lc1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGlyb25TaG9lczEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIGxldCBiYWxhbmNlSXJvbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZVdvb2RlblN3b3JkMSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUlyb25Td29yZDEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uU3dvcmQxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGxldCBiYWxhbmNlV29vZGVuQXJtb3IxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGxldCBiYWxhbmNlSXJvbkFybW9yMSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Bcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kZW5TaGllbGQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU2hpZWxkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUlyb25TaGllbGQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblNoaWVsZDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kZW5IZWxtZXQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuSGVsbWV0MSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUlyb25IZWxtZXQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kZW5TaG9lczEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5TaG9lczEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VJcm9uU2hvZXMxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblNob2VzMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcblxuICAgIGJhbGFuY2VJcm9uLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG4gICAgYmFsYW5jZVdvb2QucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcbiAgICBiYWxhbmNlV29vZGVuU3dvcmQxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgYmFsYW5jZUlyb25Td29yZDEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgYmFsYW5jZUlyb25Bcm1vcjEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcbiAgICBiYWxhbmNlV29vZGVuU2hpZWxkMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VJcm9uU2hpZWxkMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VXb29kZW5IZWxtZXQxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgYmFsYW5jZUlyb25IZWxtZXQxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgYmFsYW5jZVdvb2RlblNob2VzMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VJcm9uU2hvZXMxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gIH0sXG59KTtcblxuQ2xhcmluZXQudGVzdCh7XG4gIG5hbWU6ICdMZXZlbCB1cCBjYXNlJyxcbiAgYXN5bmMgZm4oY2hhaW46IENoYWluLCBhY2NvdW50czogTWFwPHN0cmluZywgQWNjb3VudD4pIHtcbiAgICBjb25zdCBhZG1pbiA9IGFjY291bnRzLmdldCgnZGVwbG95ZXInKSE7XG5cbiAgICAvLyBtaW50IDFcblxuICAgIGxldCBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlblN3b3JkMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIHdvb2RlblN3b3JkMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsdXAgd29vZGVuU3dvcmQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5Td29yZDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA0XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25Td29yZDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uU3dvcmQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25Td29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25Td29yZDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uU3dvcmQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU3dvcmQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBpbnRlcm1lZGlhdGUgYmFsYW5jZSBjaGVja1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5Td29yZDMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblN3b3JkMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGxldCBiYWxhbmNlSXJvblN3b3JkMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Td29yZDMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIG1pbnQgN1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBlbmhhbmNlZFN3b3JkMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDhcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg4KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg4KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDgpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMl0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGVuaGFuY2VkU3dvcmQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA5XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzJdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZFN3b3JkM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTd29yZDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTBcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbkFybW9yMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIxKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIHdvb2RlbkFybW9yMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDEyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsdXAgd29vZGVuQXJtb3IzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25Bcm1vcjFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDE0XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgaXJvbkFybW9yMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoaXJvbkFybW9yMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxNVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uQXJtb3IzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uQXJtb3IzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBpbnRlcm1lZGlhdGUgYmFsYW5jZSBjaGVja1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5Bcm1vcjMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGxldCBiYWxhbmNlSXJvbkFybW9yMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Bcm1vcjMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Bcm1vcjMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIG1pbnQgMTZcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gLy8gY3JhZnQgZW5oYW5jZWRBcm1vcjFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChlbmhhbmNlZEFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxN1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDgpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDgpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoOCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1syXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRBcm1vcjJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkQXJtb3IyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDE4XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzNik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzJdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZEFybW9yM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRBcm1vcjMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTlcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlblNoaWVsZDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5TaGllbGQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDIwXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0MCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgd29vZGVuU2hpZWxkMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuU2hpZWxkMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQxKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAyMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsdXAgd29vZGVuU2hpZWxkM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuU2hpZWxkMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAyMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQ0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgaXJvblNoaWVsZDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uU2hpZWxkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQ1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAyM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25TaGllbGQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU2hpZWxkMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQ3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAyNFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25TaGllbGQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU2hpZWxkMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQ5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gaW50ZXJtZWRpYXRlIGJhbGFuY2UgY2hlY2tcblxuICAgIGxldCBiYWxhbmNlV29vZGVuU2hpZWxkMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlblNoaWVsZDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblNoaWVsZDMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcbiAgICBsZXQgYmFsYW5jZUlyb25TaGllbGQzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblNoaWVsZDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25TaGllbGQzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG5cbiAgICAvLyBtaW50IDI1XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1MCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGVuaGFuY2VkU2hpZWxkMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU2hpZWxkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDUxKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAyNlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNTIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1syXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRTaGllbGQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChlbmhhbmNlZFNoaWVsZDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1Myk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMjdcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDU0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMl0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGVuaGFuY2VkU2hpZWxkM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTaGllbGQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNTUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDI4XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNTYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCB3b29kZW5IZWxtZXQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuSGVsbWV0MSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDU3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAyOVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNTgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIHdvb2RlbkhlbG1ldDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KHdvb2RlbkhlbG1ldDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1OSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMzBcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbHVwIHdvb2RlbkhlbG1ldDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KHdvb2RlbkhlbG1ldDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2MSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMzFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2Mik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25IZWxtZXQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2Myk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMzJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDY0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uSGVsbWV0MlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2NSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMzNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDY2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uSGVsbWV0M1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2Nyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGludGVybWVkaWF0ZSBiYWxhbmNlIGNoZWNrXG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlbkhlbG1ldDMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5IZWxtZXQzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5IZWxtZXQzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgbGV0IGJhbGFuY2VJcm9uSGVsbWV0MyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25IZWxtZXQzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uSGVsbWV0My5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gbWludCAzNFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNjgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBlbmhhbmNlZEhlbG1ldDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChlbmhhbmNlZEhlbG1ldDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2OSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMzVcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDcwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMl0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGVuaGFuY2VkSGVsbWV0MlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRIZWxtZXQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNzEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDM2XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg3KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3Mik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzJdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZEhlbG1ldDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkSGVsbWV0MyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDczKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAzN1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDc0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuU2hvZXMxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuU2hvZXMxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNzUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDM4XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3Nik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgd29vZGVuU2hvZXMyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5TaG9lczIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3Nyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMzlcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDc4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbHVwIHdvb2RlblNob2VzM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuU2hvZXMzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNzkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDQwXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgODApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uU2hvZXMxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvblNob2VzMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDgxKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA0MVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgODIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25TaG9lczJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25TaG9lczIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4Myk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDg0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uU0hvZXMzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU2hvZXMzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgODUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBpbnRlcm1lZGlhdGUgYmFsYW5jZSBjaGVja1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5TaG9lczMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5TaG9lczMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblNob2VzMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGxldCBiYWxhbmNlSXJvblNob2VzMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25TaG9lczMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25TaG9lczMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIG1pbnQgNDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDg2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgZW5oYW5jZWRTaG9lczFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChlbmhhbmNlZFNob2VzMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDg3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA0NFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgODgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1syXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRTaG9lczJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU2hvZXMyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgODkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDQ1XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg3KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA5MCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzJdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZFNob2VzM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTaG9lczMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA5MSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgfSxcbn0pO1xuXG5DbGFyaW5ldC50ZXN0KHtcbiAgbmFtZTogJ0FjcXVpc2l0aW9uIGNhc2UnLFxuICBhc3luYyBmbihjaGFpbjogQ2hhaW4sIGFjY291bnRzOiBNYXA8c3RyaW5nLCBBY2NvdW50Pikge1xuICAgIGNvbnN0IGFkbWluID0gYWNjb3VudHMuZ2V0KCdkZXBsb3llcicpITtcblxuICAgIC8vIG1pbnQgMVxuXG4gICAgbGV0IGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgxNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSB3b29kZW5Td29yZDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5Td29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoNDApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgd29vZGVuU3dvcmQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDIwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGlyb25Td29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludChpcm9uU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDUwMCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMTEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDExKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGVuaGFuY2VkU3dvcmQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMildLCBhZG1pbi5hZGRyZXNzKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA1XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoMTUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlbkFybW9yMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDExKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA2XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoNTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDE3KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSB3b29kZW5Bcm1vcjNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgN1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDIwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSBpcm9uQXJtb3IyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoaXJvbkFybW9yMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA4XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoNDAwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgxMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMTIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGVuaGFuY2VkQXJtb3IyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludChlbmhhbmNlZEFybW9yMildLCBhZG1pbi5hZGRyZXNzKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgOVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDE1MCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgd29vZGVuU2hpZWxkM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlblNoaWVsZDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTBcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgyMzApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGlyb25TaGllbGQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoaXJvblNoaWVsZDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCg2NzApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGVuaGFuY2VkU2hpZWxkMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTaGllbGQyKV0sIGFkbWluLmFkZHJlc3MpLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDE1MCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgd29vZGVuSGVsbWV0M1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlbkhlbG1ldDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgyMzApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGlyb25IZWxtZXQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTRcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgzNzApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGVuaGFuY2VkSGVsbWV0MVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRIZWxtZXQxKV0sIGFkbWluLmFkZHJlc3MpLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxNVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDI1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzMCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSB3b29kZW5TaG9lczJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5TaG9lczIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTZcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgxMjApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlblNob2VzM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlblNob2VzMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxN1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSBpcm9uU2hvZXMyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoaXJvblNob2VzMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDM1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICB9LFxufSk7XG5cbkNsYXJpbmV0LnRlc3Qoe1xuICBuYW1lOiAnQ3JhZnRpbmcgd2l0aCBtb3JlIHJlc291cmNlcyBjYXNlJyxcbiAgYXN5bmMgZm4oY2hhaW46IENoYWluLCBhY2NvdW50czogTWFwPHN0cmluZywgQWNjb3VudD4pIHtcbiAgICBjb25zdCBhZG1pbiA9IGFjY291bnRzLmdldCgnZGVwbG95ZXInKSE7XG5cbiAgICAvLyBtaW50IHBoYXNlXG5cbiAgICBsZXQgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDk5OTkpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoOTk5OSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoOTk5OSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoOTk5OSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgNCk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbiBzd29yZCAxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb24gc3dvcmQgMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGlyb25Td29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuIGFybW9yIDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgaXJvbiBhcm1vciAxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvbkFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCB3b29kZW4gc2hpZWxkIDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5TaGllbGQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNyk7XG5cbiAgICAvLyBjcmFmdCBpcm9uIHNoaWVsZCAxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvblNoaWVsZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuSGVsbWV0MVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlbkhlbG1ldDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgaXJvbkhlbG1ldDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uSGVsbWV0MSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuU2hvZXMxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuU2hvZXMxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uU2hvZXMxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvblNob2VzMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgbGV0IGJhbGFuY2VHb2xkID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUVuZXJneSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUlyb24gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGxldCBiYWxhbmNlV29vZCA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kZW5Td29yZDEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VJcm9uU3dvcmQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZVdvb2RlbkFybW9yMSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUlyb25Bcm1vcjEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGxldCBiYWxhbmNlV29vZGVuU2hpZWxkMSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlblNoaWVsZDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VJcm9uU2hpZWxkMSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25TaGllbGQxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGxldCBiYWxhbmNlV29vZGVuSGVsbWV0MSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlbkhlbG1ldDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VJcm9uSGVsbWV0MSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25IZWxtZXQxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGxldCBiYWxhbmNlV29vZGVuU2hvZXMxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU2hvZXMxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGxldCBiYWxhbmNlSXJvblNob2VzMSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25TaG9lczEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG5cbiAgICBiYWxhbmNlR29sZC5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDk5OTkpO1xuICAgIGJhbGFuY2VFbmVyZ3kucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCg5OTk5KTtcbiAgICBiYWxhbmNlSXJvbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDk5ODYpO1xuICAgIGJhbGFuY2VXb29kLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoOTk4Nik7XG4gICAgYmFsYW5jZVdvb2RlblN3b3JkMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VJcm9uU3dvcmQxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VJcm9uQXJtb3IxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgYmFsYW5jZVdvb2RlblNoaWVsZDEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcbiAgICBiYWxhbmNlSXJvblNoaWVsZDEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcbiAgICBiYWxhbmNlV29vZGVuSGVsbWV0MS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VJcm9uSGVsbWV0MS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VXb29kZW5TaG9lczEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcbiAgICBiYWxhbmNlSXJvblNob2VzMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICB9LFxufSk7XG5cbkNsYXJpbmV0LnRlc3Qoe1xuICBuYW1lOiAnTGV2ZWwgdXAgd2l0aCBtb3JlIHJlc291cmNlcyBjYXNlICcsXG4gIGFzeW5jIGZuKGNoYWluOiBDaGFpbiwgYWNjb3VudHM6IE1hcDxzdHJpbmcsIEFjY291bnQ+KSB7XG4gICAgY29uc3QgYWRtaW4gPSBhY2NvdW50cy5nZXQoJ2RlcGxveWVyJykhO1xuXG4gICAgLy8gbWludCBwaGFzZVxuXG4gICAgbGV0IGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCg5OTk5KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDk5OTkpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDk5OTkpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDk5OTkpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDQpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCB3b29kZW5Td29yZDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5Td29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgd29vZGVuU3dvcmQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5Td29yZDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWx1cCB3b29kZW5Td29yZDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uU3dvcmQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvblN3b3JkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uU3dvcmQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25Td29yZDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25Td29yZDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gaW50ZXJtZWRpYXRlIGJhbGFuY2UgY2hlY2tcblxuICAgIGxldCBiYWxhbmNlV29vZGVuU3dvcmQzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Td29yZDMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIGxldCBiYWxhbmNlSXJvblN3b3JkMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Td29yZDMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIGNyYWZ0IGVuaGFuY2VkU3dvcmQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTd29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRTd29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZFN3b3JkM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTd29yZDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbkFybW9yMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgd29vZGVuQXJtb3IyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5Bcm1vcjIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsdXAgd29vZGVuQXJtb3IzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25Bcm1vcjFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uQXJtb3IyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uQXJtb3IyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uQXJtb3IzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uQXJtb3IzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBpbnRlcm1lZGlhdGUgYmFsYW5jZSBjaGVja1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5Bcm1vcjMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uQXJtb3IzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkFybW9yMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvbkFybW9yMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gLy8gY3JhZnQgZW5oYW5jZWRBcm1vcjFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChlbmhhbmNlZEFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRBcm1vcjJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkQXJtb3IyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZEFybW9yM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRBcm1vcjMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlblNoaWVsZDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5TaGllbGQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCB3b29kZW5TaGllbGQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5TaGllbGQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbHVwIHdvb2RlblNoaWVsZDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KHdvb2RlblNoaWVsZDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25TaGllbGQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvblNoaWVsZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25TaGllbGQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU2hpZWxkMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgaXJvblNoaWVsZDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25TaGllbGQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBpbnRlcm1lZGlhdGUgYmFsYW5jZSBjaGVja1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5TaGllbGQzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU2hpZWxkMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuU2hpZWxkMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uU2hpZWxkMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25TaGllbGQzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uU2hpZWxkMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gY3JhZnQgZW5oYW5jZWRTaGllbGQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTaGllbGQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZFNoaWVsZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU2hpZWxkMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRTaGllbGQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChlbmhhbmNlZFNoaWVsZDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbkhlbG1ldDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5IZWxtZXQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCB3b29kZW5IZWxtZXQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5IZWxtZXQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbHVwIHdvb2RlbkhlbG1ldDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KHdvb2RlbkhlbG1ldDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25IZWxtZXQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25IZWxtZXQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uSGVsbWV0MildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDM0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgaXJvbkhlbG1ldDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25IZWxtZXQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBpbnRlcm1lZGlhdGUgYmFsYW5jZSBjaGVja1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5IZWxtZXQzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuSGVsbWV0MyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuSGVsbWV0My5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uSGVsbWV0MyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25IZWxtZXQzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uSGVsbWV0My5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gY3JhZnQgZW5oYW5jZWRIZWxtZXQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRIZWxtZXQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZEhlbG1ldDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkSGVsbWV0MildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDM3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRIZWxtZXQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChlbmhhbmNlZEhlbG1ldDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlblNob2VzMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlblNob2VzMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDM5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgd29vZGVuU2hvZXMyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5TaG9lczIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0MCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsdXAgd29vZGVuU2hvZXMzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5TaG9lczMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0MSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25TaG9lczFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uU2hvZXMxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uU2hvZXMyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU2hvZXMyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uU0hvZXMzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU2hvZXMzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBpbnRlcm1lZGlhdGUgYmFsYW5jZSBjaGVja1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5TaG9lczMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5TaG9lczMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblNob2VzMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uU2hvZXMzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblNob2VzMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblNob2VzMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gY3JhZnQgZW5oYW5jZWRTaG9lczFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChlbmhhbmNlZFNob2VzMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQ1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRTaG9lczJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU2hvZXMyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZFNob2VzM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTaG9lczMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0Nyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgfSxcbn0pO1xuXG5DbGFyaW5ldC50ZXN0KHtcbiAgbmFtZTogJ0FjcXVpc2l0aW9uIHdpdGggbW9yZSByZXNvdXJjZXMgY2FzZScsXG4gIGFzeW5jIGZuKGNoYWluOiBDaGFpbiwgYWNjb3VudHM6IE1hcDxzdHJpbmcsIEFjY291bnQ+KSB7XG4gICAgY29uc3QgYWRtaW4gPSBhY2NvdW50cy5nZXQoJ2RlcGxveWVyJykhO1xuXG4gICAgLy8gbWludCAxXG5cbiAgICBsZXQgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDk5OTkpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoOTk5OSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoOTk5OSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoOTk5OSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgNCk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSB3b29kZW5Td29yZDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5Td29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlblN3b3JkMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgaXJvblN3b3JkMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KGlyb25Td29yZDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGVuaGFuY2VkU3dvcmQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMildLCBhZG1pbi5hZGRyZXNzKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlbkFybW9yMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgd29vZGVuQXJtb3IzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSBpcm9uQXJtb3IyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoaXJvbkFybW9yMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgZW5oYW5jZWRBcm1vcjJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkQXJtb3IyKV0sIGFkbWluLmFkZHJlc3MpLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlblNoaWVsZDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5TaGllbGQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgaXJvblNoaWVsZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludChpcm9uU2hpZWxkMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGVuaGFuY2VkU2hpZWxkMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTaGllbGQyKV0sIGFkbWluLmFkZHJlc3MpLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlbkhlbG1ldDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5IZWxtZXQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgaXJvbkhlbG1ldDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludChpcm9uSGVsbWV0MildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGVuaGFuY2VkSGVsbWV0MVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRIZWxtZXQxKV0sIGFkbWluLmFkZHJlc3MpLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlblNob2VzMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlblNob2VzMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlblNob2VzM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlblNob2VzMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGlyb25TaG9lczJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludChpcm9uU2hvZXMyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gIH0sXG59KTtcblxuQ2xhcmluZXQudGVzdCh7XG4gIG5hbWU6ICdDcmFmdGluZyB3aXRoIGxlc3MgcmVzb3VyY2VzIGNhc2UnLFxuICBhc3luYyBmbihjaGFpbjogQ2hhaW4sIGFjY291bnRzOiBNYXA8c3RyaW5nLCBBY2NvdW50Pikge1xuICAgIGNvbnN0IGFkbWluID0gYWNjb3VudHMuZ2V0KCdkZXBsb3llcicpITtcblxuICAgIC8vIE5PIE1JTlQgPT0gTk8gUkVTT1VSQ0UgQVQgQUxMXG5cbiAgICBsZXQgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RFcnIoKS5leHBlY3RVaW50KGVycm9ySW5zdWZmaWNpZW50QmFsYW5jZSk7XG5cbiAgICAvLyBNSU5UIE9ORSBSRVNPVVJDRSBOT1QgRU5PVUdIXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb24gc3dvcmQgMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGlyb25Td29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0RXJyKCkuZXhwZWN0VWludChlcnJvckluc3VmZmljaWVudEJhbGFuY2UpO1xuXG4gICAgLy8gTUlOVCBPTkUgUkVTT1VSQ0UgTk9ORSBPRiBUSEUgT1RIRVJTXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQzKSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gdHJ5IGNyYWZ0aW5nIGVuaGFuY2VkIHN3b3JkIDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RFcnIoKS5leHBlY3RVaW50KGVycm9ySW5zdWZmaWNpZW50QmFsYW5jZSk7XG5cbiAgICAvLyBtaW50XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbiBhcm1vciAxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uIGFybW9yIDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBNSU5UIFRXTyBSRVNPVVJDRVMgTk9ORSBPRiBUSEUgVEhJUkRcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb25Bcm1vcjMpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDExKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyB0cnkgY3JhZnRpbmcgZW5oYW5jZWQgYXJtb3IgMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RFcnIoKS5leHBlY3RVaW50KGVycm9ySW5zdWZmaWNpZW50QmFsYW5jZSk7XG5cbiAgICAvLyBtaW50IDVcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbiBzaGllbGRcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5TaGllbGQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTQpO1xuXG4gICAgLy8gbWludCA2XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uIHNoaWVsZFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGlyb25TaGllbGQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDdcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbkhlbG1ldFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlbkhlbG1ldDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgOFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgaXJvbkhlbG1ldFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGlyb25IZWxtZXQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDlcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlblNob2VzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuU2hvZXMxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDEwXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uU2hvZXNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uU2hvZXMxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICBsZXQgYmFsYW5jZUlyb24gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGxldCBiYWxhbmNlV29vZCA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kZW5Td29yZDEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VJcm9uU3dvcmQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUVuaGFuY2VkU3dvcmQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZW5oYW5jZWRTd29yZDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kZW5Bcm1vcjEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VJcm9uQXJtb3IxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkFybW9yMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUVuaGFuY2VkQXJtb3IxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZW5oYW5jZWRBcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kZW5TaGllbGQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU2hpZWxkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUlyb25TaGllbGQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblNoaWVsZDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kZW5IZWxtZXQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuSGVsbWV0MSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBsZXQgYmFsYW5jZUlyb25IZWxtZXQxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VXb29kZW5TaG9lczEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5TaG9lczEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgbGV0IGJhbGFuY2VJcm9uU2hvZXMxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblNob2VzMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcblxuICAgIGJhbGFuY2VJcm9uLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMik7XG4gICAgYmFsYW5jZVdvb2QucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcbiAgICBiYWxhbmNlV29vZGVuU3dvcmQxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG4gICAgYmFsYW5jZUlyb25Td29yZDEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcbiAgICBiYWxhbmNlRW5oYW5jZWRTd29yZDEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgYmFsYW5jZUlyb25Bcm1vcjEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcbiAgICBiYWxhbmNlRW5oYW5jZWRBcm1vcjEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcbiAgICBiYWxhbmNlV29vZGVuU2hpZWxkMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VJcm9uU2hpZWxkMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VXb29kZW5IZWxtZXQxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgYmFsYW5jZUlyb25IZWxtZXQxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgYmFsYW5jZVdvb2RlblNob2VzMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGJhbGFuY2VJcm9uU2hvZXMxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gIH0sXG59KTtcblxuQ2xhcmluZXQudGVzdCh7XG4gIG5hbWU6ICdMZXZlbCB1cCB3aXRoIGxlc3MgcmVzb3VyY2VzIGNhc2UnLFxuICBhc3luYyBmbihjaGFpbjogQ2hhaW4sIGFjY291bnRzOiBNYXA8c3RyaW5nLCBBY2NvdW50Pikge1xuICAgIGNvbnN0IGFkbWluID0gYWNjb3VudHMuZ2V0KCdkZXBsb3llcicpITtcblxuICAgIC8vIE5PIE1JTlQgPT0gTk8gUkVTT1VSQ0VcblxuICAgIC8vIGNyYWZ0IHdvb2RlblN3b3JkMVxuXG4gICAgbGV0IGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5Td29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0RXJyKCkuZXhwZWN0VWludChlcnJvckluc3VmZmljaWVudEJhbGFuY2UpO1xuXG4gICAgLy8gTUlOVCBPTkUgUkVTT1VSQ0UgTk9ORSBPRiBUSEUgT1RIRVIgMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCB3b29kZW5Td29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RFcnIoKS5leHBlY3RVaW50KGVycm9ySW5zdWZmaWNpZW50QmFsYW5jZSk7XG5cbiAgICAvLyBNSU5UIFRXTyBSRVNPVVJDRVMgTk9ORSBPRiBUSEUgT1RIRVJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgxMCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbHVwIHdvb2RlblN3b3JkM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdEVycigpLmV4cGVjdFVpbnQoZXJyb3JJbnN1ZmZpY2llbnRCYWxhbmNlKTtcblxuICAgIC8vIE1JTlQgT05FIFJFU09VUkNFIE5PVCBFTk9VR0hcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgaXJvblN3b3JkMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGlyb25Td29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0RXJyKCkuZXhwZWN0VWludChlcnJvckluc3VmZmljaWVudEJhbGFuY2UpO1xuXG4gICAgLy8gbWludCA1XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uU3dvcmQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RFcnIoKS5leHBlY3RVaW50KGVycm9ySW5zdWZmaWNpZW50QmFsYW5jZSk7XG5cbiAgICAvLyBtaW50IDZcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgxMCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgaXJvblN3b3JkM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoaXJvblN3b3JkMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0RXJyKCkuZXhwZWN0VWludChlcnJvckluc3VmZmljaWVudEJhbGFuY2UpO1xuXG4gICAgLy8gaW50ZXJtZWRpYXRlIGJhbGFuY2UgY2hlY2tcblxuICAgIGxldCBiYWxhbmNlV29vZGVuU3dvcmQzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Td29yZDMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcbiAgICBsZXQgYmFsYW5jZUlyb25Td29yZDMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uU3dvcmQzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uU3dvcmQzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICAvLyBtaW50IDdcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDMpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDMpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg3KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGVuaGFuY2VkU3dvcmQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTd29yZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgOFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDgpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDgpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoOCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1syXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRTd29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDlcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgxMCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMl0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGVuaGFuY2VkU3dvcmQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxMFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuQXJtb3IxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDExXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgd29vZGVuQXJtb3IyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5Bcm1vcjIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgxMCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWx1cCB3b29kZW5Bcm1vcjNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgaXJvbkFybW9yMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGlyb25Bcm1vcjEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTRcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uQXJtb3IyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uQXJtb3IyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDE1XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25Bcm1vcjNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25Bcm1vcjMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGludGVybWVkaWF0ZSBiYWxhbmNlIGNoZWNrXG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlbkFybW9yMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgbGV0IGJhbGFuY2VJcm9uQXJtb3IzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkFybW9yMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvbkFybW9yMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gbWludCAxNlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyAvLyBjcmFmdCBlbmhhbmNlZEFybW9yMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDE3XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoOCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoOCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg4KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzJdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZEFybW9yMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRBcm1vcjIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMThcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgxMCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDM2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMl0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGVuaGFuY2VkQXJtb3IzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChlbmhhbmNlZEFybW9yMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDM3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxOVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDM4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuU2hpZWxkMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlblNoaWVsZDEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMjBcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCB3b29kZW5TaGllbGQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5TaGllbGQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDIxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0Mik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWx1cCB3b29kZW5TaGllbGQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5TaGllbGQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDIyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uU2hpZWxkMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGlyb25TaGllbGQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDIzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0Nik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgaXJvblNoaWVsZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25TaGllbGQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDI0XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0OCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgaXJvblNoaWVsZDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25TaGllbGQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNDkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBpbnRlcm1lZGlhdGUgYmFsYW5jZSBjaGVja1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5TaGllbGQzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU2hpZWxkMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuU2hpZWxkMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICAgIGxldCBiYWxhbmNlSXJvblNoaWVsZDMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uU2hpZWxkMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblNoaWVsZDMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIG1pbnQgMjVcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDUwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgZW5oYW5jZWRTaGllbGQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTaGllbGQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNTEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDI2XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1Mik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzJdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZFNoaWVsZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU2hpZWxkMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDUzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAyN1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNTQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1syXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRTaGllbGQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChlbmhhbmNlZFNoaWVsZDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1NSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMjhcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1Nik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbkhlbG1ldDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5IZWxtZXQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNTcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDI5XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1OCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgd29vZGVuSGVsbWV0MlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuSGVsbWV0MildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDU5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAzMFxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNjApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsdXAgd29vZGVuSGVsbWV0M1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuSGVsbWV0MyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYxKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAzMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgaXJvbkhlbG1ldDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uSGVsbWV0MSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAzMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNjQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25IZWxtZXQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uSGVsbWV0MildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDY1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAzM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNjYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25IZWxtZXQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uSGVsbWV0MyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDY3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gaW50ZXJtZWRpYXRlIGJhbGFuY2UgY2hlY2tcblxuICAgIGxldCBiYWxhbmNlV29vZGVuSGVsbWV0MyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlbkhlbG1ldDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkhlbG1ldDMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcbiAgICBsZXQgYmFsYW5jZUlyb25IZWxtZXQzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25IZWxtZXQzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG5cbiAgICAvLyBtaW50IDM0XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2OCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGVuaGFuY2VkSGVsbWV0MVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkSGVsbWV0MSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDY5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAzNVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNzApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1syXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgZW5oYW5jZWRIZWxtZXQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChlbmhhbmNlZEhlbG1ldDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3MSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMzZcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDcyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMl0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGVuaGFuY2VkSGVsbWV0M1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRIZWxtZXQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNzMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDM3XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNzQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCB3b29kZW5TaG9lczFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludCh3b29kZW5TaG9lczEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3NSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMzhcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDc2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCB3b29kZW5TaG9lczJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KHdvb2RlblNob2VzMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDc3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAzOVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNzgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsdXAgd29vZGVuU2hvZXMzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5TaG9lczMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3OSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNDBcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4MCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25TaG9lczFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uU2hvZXMxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgODEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDQxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4Mik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgaXJvblNob2VzMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoaXJvblNob2VzMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDgzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA0MlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgODQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25TSG9lczNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25TaG9lczMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4NSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGludGVybWVkaWF0ZSBiYWxhbmNlIGNoZWNrXG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlblNob2VzMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlblNob2VzMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuU2hvZXMzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gICAgbGV0IGJhbGFuY2VJcm9uU2hvZXMzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblNob2VzMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblNob2VzMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gbWludCA0M1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgODYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBlbmhhbmNlZFNob2VzMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU2hvZXMxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgODcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDQ0XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4OCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzJdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBlbmhhbmNlZFNob2VzMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRTaG9lczIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4OSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNDVcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDkwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMl0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGVuaGFuY2VkU2hvZXMzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChlbmhhbmNlZFNob2VzMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDkxKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICB9LFxufSk7XG5cbkNsYXJpbmV0LnRlc3Qoe1xuICBuYW1lOiAnQWNxdWlzaXRpb24gd2l0aCBsZXNzIHJlc291cmNlcyBjYXNlJyxcbiAgYXN5bmMgZm4oY2hhaW46IENoYWluLCBhY2NvdW50czogTWFwPHN0cmluZywgQWNjb3VudD4pIHtcbiAgICBjb25zdCBhZG1pbiA9IGFjY291bnRzLmdldCgnZGVwbG95ZXInKSE7XG5cbiAgICAvLyBOTyBNSU5UID09IE5PIFJFU09VUkNFXG5cbiAgICAvLyBidXkgd29vZGVuU3dvcmQxXG5cbiAgICBsZXQgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQxKV0sIGFkbWluLmFkZHJlc3MpLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RFcnIoKS5leHBlY3RVaW50KGVycm9ySW5zdWZmaWNpZW50QmFsYW5jZSk7XG5cbiAgICAvLyBNSU5UIE9ORSBSRVNPVVJDRSBOT1QgVEhFIE9USEVSXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSB3b29kZW5Td29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5Td29yZDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0RXJyKCkuZXhwZWN0VWludChlcnJvckluc3VmZmljaWVudEJhbGFuY2UpO1xuXG4gICAgLy8gTUlOVCAyIFJFU09VUkNFIEVBQ0ggT05FIE5PVCBFTk9VR0hcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgxOSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGlyb25Td29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludChpcm9uU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdEVycigpLmV4cGVjdFVpbnQoZXJyb3JJbnN1ZmZpY2llbnRCYWxhbmNlKTtcblxuICAgIC8vIE1JTlQgT05FIFJFU09VUkNFIE5PTkUgT0YgVEhFIE9USEVSIDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCg1MDApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgZW5oYW5jZWRTd29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RFcnIoKS5leHBlY3RVaW50KGVycm9ySW5zdWZmaWNpZW50QmFsYW5jZSk7XG5cbiAgICAvLyBNSU5UXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoMTUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgd29vZGVuQXJtb3IxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDZcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCg1MCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMTcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDExKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlbkFybW9yM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA3XG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDIwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSBpcm9uQXJtb3IyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoaXJvbkFybW9yMildLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gTUlOVCBUV08gUkVTT1VSQ0VTIE5PTkUgT0YgVEhFIE9USEVSXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoNDAwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgxMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSBlbmhhbmNlZEFybW9yMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRBcm1vcjIpXSwgYWRtaW4uYWRkcmVzcyksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RFcnIoKS5leHBlY3RVaW50KGVycm9ySW5zdWZmaWNpZW50QmFsYW5jZSk7XG5cbiAgICAvLyBtaW50IDlcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgxNTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlblNoaWVsZDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5TaGllbGQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDEwXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoMjMwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSBpcm9uU2hpZWxkMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KGlyb25TaGllbGQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDExXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoNjcwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg3KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg3KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzJdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgZW5oYW5jZWRTaGllbGQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludChlbmhhbmNlZFNoaWVsZDIpXSwgYWRtaW4uYWRkcmVzcyksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDEyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoMTUwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlbkhlbG1ldDNcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5IZWxtZXQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDEzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoMjMwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IGlyb25IZWxtZXQyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQoaXJvbkhlbG1ldDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTRcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgzNzApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMl0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSBlbmhhbmNlZEhlbG1ldDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkSGVsbWV0MSldLCBhZG1pbi5hZGRyZXNzKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTVcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgyNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSB3b29kZW5TaG9lczJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5TaG9lczIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzMCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTZcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgxMjApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMxKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgd29vZGVuU2hvZXMzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQod29vZGVuU2hvZXMzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDE3XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMTApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgaXJvblNob2VzMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KGlyb25TaG9lczIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAzNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgfSxcbn0pO1xuXG5DbGFyaW5ldC50ZXN0KHtcbiAgbmFtZTogJ0dldHRlciByZWFkIG9ubHkgZnVuY3Rpb25zIHRlc3QnLFxuICBhc3luYyBmbihjaGFpbjogQ2hhaW4sIGFjY291bnRzOiBNYXA8c3RyaW5nLCBBY2NvdW50Pikge1xuICAgIGNvbnN0IGFkbWluID0gYWNjb3VudHMuZ2V0KCdkZXBsb3llcicpITtcblxuICAgIGxldCBjcmFmdGluZ05vbmVMaXN0ID0gW1xuICAgICAgNiwgNywgOSwgMTAsIDEyLCAxMywgMTUsIDE2LCAxOCwgMTksIDIxLCAyMiwgMjQsIDI1LCAyNywgMjgsIDMwLCAzMSwgMzMsIDM0LCAzNiwgMzcsIDM5LCA0MCwgNDIsIDQzLCA0NSwgNDYsIDQ4LFxuICAgICAgNDksXG4gICAgXTtcbiAgICBsZXQgbGV2ZWx1cE5vbmVMaXN0ID0gWzUsIDgsIDExLCAxNCwgMTcsIDIwLCAyMywgMjYsIDI5LCAzMiwgMzUsIDM4LCA0MSwgNDQsIDQ3XTtcbiAgICBsZXQgYWNxdWlzaXRpb25Ob25lTGlzdCA9IFtcbiAgICAgIDcsIDgsIDEwLCAxMSwgMTMsIDE1LCAxNywgMTksIDIwLCAyMiwgMjMsIDI0LCAyNiwgMjgsIDI5LCAzMSwgMzIsIDMzLCAzNSwgMzcsIDM5LCA0MCwgNDEsIDQ0LCA0NiwgNDcsIDQ4LCA0OSxcbiAgICBdO1xuICAgIGZvciAobGV0IGkgPSA1OyBpIDwgNTA7IGkrKykge1xuICAgICAgbGV0IGNyYWZ0aW5nUmVzb3VyY2VzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oY29udHJhY3ROYW1lLCBnZXRDcmFmdGluZ1Jlc291cmNlcywgW3R5cGVzLnVpbnQoaSldLCBhZG1pbi5hZGRyZXNzKTtcbiAgICAgIGxldCBsZXZlbFVwUmVzb3VyY2VzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oY29udHJhY3ROYW1lLCBnZXRMZXZlbFVwUmVzb3VyY2VzLCBbdHlwZXMudWludChpKV0sIGFkbWluLmFkZHJlc3MpO1xuICAgICAgbGV0IGFjcXVpc2l0aW9uUmVzb3VyY2VzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgZ2V0QWNxdWlzaXRpb25SZXNvdXJjZXMsXG4gICAgICAgIFt0eXBlcy51aW50KGkpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKTtcbiAgICAgIGlmIChjcmFmdGluZ05vbmVMaXN0LmluZGV4T2YoaSkgPiAtMSkge1xuICAgICAgICBjcmFmdGluZ1Jlc291cmNlcy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3ROb25lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcmFmdGluZ1Jlc291cmNlcy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RTb21lKCk7XG4gICAgICB9XG4gICAgICBpZiAobGV2ZWx1cE5vbmVMaXN0LmluZGV4T2YoaSkgPiAtMSkge1xuICAgICAgICBsZXZlbFVwUmVzb3VyY2VzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdE5vbmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsVXBSZXNvdXJjZXMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0U29tZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGFjcXVpc2l0aW9uTm9uZUxpc3QuaW5kZXhPZihpKSA+IC0xKSB7XG4gICAgICAgIGFjcXVpc2l0aW9uUmVzb3VyY2VzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdE5vbmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjcXVpc2l0aW9uUmVzb3VyY2VzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFNvbWUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG59KTtcblxuQ2xhcmluZXQudGVzdCh7XG4gIG5hbWU6ICdUcmFuc2ZlciByZXNvdXJjZXMgdGVzdCcsXG4gIGFzeW5jIGZuKGNoYWluOiBDaGFpbiwgYWNjb3VudHM6IE1hcDxzdHJpbmcsIEFjY291bnQ+KSB7XG4gICAgY29uc3QgYWRtaW4gPSBhY2NvdW50cy5nZXQoJ2RlcGxveWVyJykhO1xuICAgIGNvbnN0IHVzZXIxID0gYWNjb3VudHMuZ2V0KCd3YWxsZXRfMScpITtcbiAgICBjb25zdCB1c2VyMiA9IGFjY291bnRzLmdldCgnd2FsbGV0XzInKSE7XG4gICAgY29uc3QgdXNlcjMgPSBhY2NvdW50cy5nZXQoJ3dhbGxldF8zJykhO1xuICAgIGNvbnN0IHVzZXI0ID0gYWNjb3VudHMuZ2V0KCd3YWxsZXRfNCcpITtcblxuICAgIC8vIG1pbnQgcmVzb3VyY2VzXG4gICAgbGV0IGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgxMDAwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDEwMDApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDEwMDApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDEwMDApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDQpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1syXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzNdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyB0cmFuc2ZlciAxMDAgZ29sZCBmcm9tIGFkbWluIHRvIHVzZXIgMVxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgxMDApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMS5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgMXN0IHRyYW5zZmVyXG4gICAgbGV0IGJhbGFuY2VJcm9uQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCg5MDApO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uVXNlcjEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIxLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIxLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uVXNlcjEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxMDApO1xuXG4gICAgLy8gdHJhbnNmZXIgMjAwIGVuZXJneSBmcm9tIGFkbWluIHRvIHVzZXIgMlxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDIwMCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIyLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciAybmQgdHJhbnNmZXJcbiAgICBsZXQgYmFsYW5jZUVuZXJneUFkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VFbmVyZ3lBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDgwMCk7XG5cbiAgICBsZXQgYmFsYW5jZUlyb25Vc2VyNCA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnByaW5jaXBhbCh1c2VyMi5hZGRyZXNzKV0sXG4gICAgICB1c2VyMi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblVzZXI0LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMjAwKTtcblxuICAgIC8vIHRyYW5zZmVyIDMwMCB3b29kIGZyb20gYWRtaW4gdG8gdXNlclxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCgzMDApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMy5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgM3JkIHRyYW5zZmVyXG4gICAgYmFsYW5jZUlyb25BZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25BZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDcwMCk7XG5cbiAgICBiYWxhbmNlSXJvblVzZXI0ID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnByaW5jaXBhbCh1c2VyMy5hZGRyZXNzKV0sXG4gICAgICB1c2VyMS5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblVzZXI0LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMzAwKTtcblxuICAgIC8vIHRyYW5zZmVyIDQwMCBpcm9uIGZyb20gYWRtaW4gdG8gdXNlciA0XG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIHRyYW5zZmVyRm4sXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDQwMCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI0LmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA0dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlSXJvbkFkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvbkFkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoNjAwKTtcblxuICAgIGJhbGFuY2VJcm9uVXNlcjQgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI0LmFkZHJlc3MpXSxcbiAgICAgIHVzZXIxLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uVXNlcjQucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCg0MDApO1xuXG4gICAgLy8gdHJhbnNmZXIgNTAgZW5lcmd5IGZyb20gdXNlcjIgdG8gdXNlcjRcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg1MCksIHR5cGVzLnByaW5jaXBhbCh1c2VyMi5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI0LmFkZHJlc3MpXSxcbiAgICAgICAgdXNlcjIuYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA1dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlSXJvbkFkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCg4MDApO1xuXG4gICAgYmFsYW5jZUlyb25Vc2VyNCA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnByaW5jaXBhbCh1c2VyMi5hZGRyZXNzKV0sXG4gICAgICB1c2VyMS5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblVzZXI0LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMTUwKTtcblxuICAgIGxldCBiYWxhbmNlRW5lcmd5VXNlcjQgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyldLFxuICAgICAgdXNlcjQuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUVuZXJneVVzZXI0LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoNTApO1xuXG4gICAgLy8gdHJhbnNmZXIgNTAgZ29sZCBmcm9tIHVzZXIxIHRvIHVzZXIyXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIHRyYW5zZmVyRm4sXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDUwKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIxLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjIuYWRkcmVzcyldLFxuICAgICAgICB1c2VyMS5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBiYWxhbmNlIGFmdGVyIDZ0aCB0cmFuc2ZlclxuICAgIGJhbGFuY2VJcm9uQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCg5MDApO1xuXG4gICAgYmFsYW5jZUlyb25Vc2VyMSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy5wcmluY2lwYWwodXNlcjEuYWRkcmVzcyldLFxuICAgICAgdXNlcjEuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Vc2VyMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDUwKTtcblxuICAgIGJhbGFuY2VJcm9uVXNlcjQgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIyLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIyLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uVXNlcjQucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCg1MCk7XG5cbiAgICAvLyB0cmFuc2ZlciA1MCB3b29kIGZyb20gdXNlcjMgdG8gdXNlcjFcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNTApLCB0eXBlcy5wcmluY2lwYWwodXNlcjMuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMS5hZGRyZXNzKV0sXG4gICAgICAgIHVzZXIzLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgNnRoIHRyYW5zZmVyXG4gICAgYmFsYW5jZUlyb25BZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25BZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDcwMCk7XG5cbiAgICBiYWxhbmNlSXJvblVzZXIxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnByaW5jaXBhbCh1c2VyMS5hZGRyZXNzKV0sXG4gICAgICB1c2VyMS5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblVzZXIxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoNTApO1xuXG4gICAgYmFsYW5jZUlyb25Vc2VyNCA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy5wcmluY2lwYWwodXNlcjMuYWRkcmVzcyldLFxuICAgICAgdXNlcjMuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Vc2VyNC5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDI1MCk7XG5cbiAgICAvLyB0cmFuc2ZlciA1MCBpcm9uIGZyb20gdXNlcjQgdG8gdXNlcjNcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNTApLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMy5hZGRyZXNzKV0sXG4gICAgICAgIHVzZXI0LmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBiYWxhbmNlIGFmdGVyIDZ0aCB0cmFuc2ZlclxuICAgIGJhbGFuY2VJcm9uQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCg2MDApO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uVXNlcjMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIzLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uVXNlcjMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCg1MCk7XG5cbiAgICBiYWxhbmNlSXJvblVzZXI0ID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnByaW5jaXBhbCh1c2VyNC5hZGRyZXNzKV0sXG4gICAgICB1c2VyNC5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblVzZXI0LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMzUwKTtcbiAgfSxcbn0pO1xuXG5DbGFyaW5ldC50ZXN0KHtcbiAgbmFtZTogJ1RyYW5zZmVyIGNyYWZ0ZWQgaXRlbXMgdGVzdCcsXG4gIGFzeW5jIGZuKGNoYWluOiBDaGFpbiwgYWNjb3VudHM6IE1hcDxzdHJpbmcsIEFjY291bnQ+KSB7XG4gICAgY29uc3QgYWRtaW4gPSBhY2NvdW50cy5nZXQoJ2RlcGxveWVyJykhO1xuICAgIGNvbnN0IHVzZXIxID0gYWNjb3VudHMuZ2V0KCd3YWxsZXRfMScpITtcbiAgICBjb25zdCB1c2VyMiA9IGFjY291bnRzLmdldCgnd2FsbGV0XzInKSE7XG4gICAgY29uc3QgdXNlcjMgPSBhY2NvdW50cy5nZXQoJ3dhbGxldF8zJykhO1xuICAgIGNvbnN0IHVzZXI0ID0gYWNjb3VudHMuZ2V0KCd3YWxsZXRfNCcpITtcbiAgICBjb25zdCB1c2VyNSA9IGFjY291bnRzLmdldCgnd2FsbGV0XzUnKSE7XG4gICAgY29uc3QgdXNlcjYgPSBhY2NvdW50cy5nZXQoJ3dhbGxldF82JykhO1xuXG4gICAgLy8gbWludCAxXG5cbiAgICBsZXQgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCB3b29kZW4gc3dvcmQgMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgd29vZGVuIHN3b3JkIDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uU3dvcmQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDQpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCB3b29kZW4gYXJtb3IgMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDRcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgaXJvbiBhcm1vciAxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvbkFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDVcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDMpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDMpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1syXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gY3JhZnQgZW5oYW5jZWRTd29yZDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDExKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA2XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uQXJtb3IzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMl0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGVuaGFuY2VkQXJtb3IxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoZW5oYW5jZWRBcm1vcjEpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgd29vZGVuU3dvcmQxIGZyb20gYWRtaW4gdG8gdXNlciAxXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIHRyYW5zZmVyRm4sXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIxLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgMXN0IHRyYW5zZmVyXG4gICAgbGV0IGJhbGFuY2VXb29kZW5Td29yZDFBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuU3dvcmQxQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGxldCBiYWxhbmNlV29vZGVuU3dvcmQxVXNlcjEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjEuYWRkcmVzcyldLFxuICAgICAgdXNlcjEuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblN3b3JkMVVzZXIxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG5cbiAgICAvLyB0cmFuc2ZlciAxIGlyb25Td29yZDEgZnJvbSBhZG1pbiB0byB1c2VyIDIgeHh4XG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIHRyYW5zZmVyRm4sXG4gICAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDEpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBiYWxhbmNlIGFmdGVyIDJuZCB0cmFuc2ZlclxuICAgIGxldCBiYWxhbmNlSXJvblN3b3JkMUFkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblN3b3JkMUFkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZUlyb25Td29yZDFVc2VyMiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjIuYWRkcmVzcyldLFxuICAgICAgdXNlcjIuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Td29yZDFVc2VyMi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSBlbmhhbmNlZFN3b3JkMSBmcm9tIGFkbWluIHRvIHVzZXIzXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIHRyYW5zZmVyRm4sXG4gICAgICAgIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQxKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjMuYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE2KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciAzcmQgdHJhbnNmZXJcbiAgICBsZXQgYmFsYW5jZUVuaGFuY2VkU3dvcmQxQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlRW5oYW5jZWRTd29yZDFBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgbGV0IGJhbGFuY2VFbmhhbmNlZFN3b3JkMVVzZXIzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZW5oYW5jZWRTd29yZDEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjMuYWRkcmVzcyldLFxuICAgICAgdXNlcjMuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUVuaGFuY2VkU3dvcmQxVXNlcjMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgd29vZGVuQXJtb3IxIGZyb20gYWRtaW4gdG8gdXNlciA0XG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIHRyYW5zZmVyRm4sXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMSksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI0LmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgNHRoIHRyYW5zZmVyXG4gICAgbGV0IGJhbGFuY2VXb29kZW5Bcm1vcjFBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IxQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGxldCBiYWxhbmNlV29vZGVuQXJtb3IxVXNlcjQgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyldLFxuICAgICAgdXNlcjQuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yMVVzZXI0LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG5cbiAgICAvLyB0cmFuc2ZlciAxIGlyb25Bcm1vcjEgZnJvbSBhZG1pbiB0byB1c2VyIDVcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbkFybW9yMSksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI1LmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgNXRoIHRyYW5zZmVyXG4gICAgbGV0IGJhbGFuY2VJcm9uQXJtb3IxQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uQXJtb3IxQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGxldCBiYWxhbmNlSXJvbkFybW9yMVVzZXI1ID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkFybW9yMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyNS5hZGRyZXNzKV0sXG4gICAgICB1c2VyNS5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvbkFybW9yMVVzZXI1LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG5cbiAgICAvLyB0cmFuc2ZlciAxIGVuaGFuY2VkQXJtb3IgZnJvbSBhZG1pbiB0byB1c2VyIDZcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5oYW5jZWRBcm1vcjEpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyNi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBiYWxhbmNlIGFmdGVyIDZ0aCB0cmFuc2ZlclxuICAgIGxldCBiYWxhbmNlRW5oYW5jZWRBcm1vcjFBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGVuaGFuY2VkQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VFbmhhbmNlZEFybW9yMUFkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZUVuaGFuY2VkQXJtb3IxVXNlcjYgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChlbmhhbmNlZEFybW9yMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyNi5hZGRyZXNzKV0sXG4gICAgICB1c2VyNi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlRW5oYW5jZWRBcm1vcjFVc2VyNi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSB3b29kZW5Td29yZDEgZnJvbSB1c2VyMSB0byB1c2VyM1xuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDEpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjEuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMy5hZGRyZXNzKV0sXG4gICAgICAgIHVzZXIxLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBiYWxhbmNlIGFmdGVyIDd0aCB0cmFuc2ZlclxuICAgIGJhbGFuY2VXb29kZW5Td29yZDFBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuU3dvcmQxQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGJhbGFuY2VXb29kZW5Td29yZDFVc2VyMSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyMS5hZGRyZXNzKV0sXG4gICAgICB1c2VyMS5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuU3dvcmQxVXNlcjEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGxldCBiYWxhbmNlV29vZGVuU3dvcmQxVXNlcjMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjMuYWRkcmVzcyldLFxuICAgICAgdXNlcjMuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblN3b3JkMVVzZXIzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG5cbiAgICAvLyB0cmFuc2ZlciAxIGlyb25Td29yZDEgZnJvbSB1c2VyMiB0byB1c2VyNFxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChpcm9uU3dvcmQxKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIyLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyldLFxuICAgICAgICB1c2VyMi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIxKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA4dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlSXJvblN3b3JkMUFkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblN3b3JkMUFkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBiYWxhbmNlSXJvblN3b3JkMVVzZXIyID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyMi5hZGRyZXNzKV0sXG4gICAgICB1c2VyMi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblN3b3JkMVVzZXIyLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZUlyb25Td29yZDFVc2VyNCA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyldLFxuICAgICAgdXNlcjQuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Td29yZDFVc2VyNC5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSBlbmhhbmNlZFN3b3JkMSBmcm9tIHVzZXIzIHRvIHVzZXI1XG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIHRyYW5zZmVyRm4sXG4gICAgICAgIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQxKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjUuYWRkcmVzcyldLFxuICAgICAgICB1c2VyMy5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA5dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlRW5oYW5jZWRTd29yZDFBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VFbmhhbmNlZFN3b3JkMUFkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBiYWxhbmNlRW5oYW5jZWRTd29yZDFVc2VyMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIzLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VFbmhhbmNlZFN3b3JkMVVzZXIzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZUVuaGFuY2VkU3dvcmQxVXNlcjUgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyNS5hZGRyZXNzKV0sXG4gICAgICB1c2VyNS5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlRW5oYW5jZWRTd29yZDFVc2VyNS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSB3b29kZW5Bcm1vcjEgZnJvbSB1c2VyNCB0byB1c2VyNlxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyNi5hZGRyZXNzKV0sXG4gICAgICAgIHVzZXI0LmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBiYWxhbmNlIGFmdGVyIDEwdGggdHJhbnNmZXJcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IxQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yMUFkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBiYWxhbmNlV29vZGVuQXJtb3IxVXNlcjQgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyldLFxuICAgICAgdXNlcjQuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yMVVzZXI0LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlbkFybW9yMVVzZXI2ID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI2LmFkZHJlc3MpXSxcbiAgICAgIHVzZXI2LmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Bcm1vcjFVc2VyNi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSBpcm9uQXJtb3IxIGZyb20gdXNlcjUgdG8gdXNlcjFcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbkFybW9yMSksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyNS5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIxLmFkZHJlc3MpXSxcbiAgICAgICAgdXNlcjUuYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgMTF0aCB0cmFuc2ZlclxuICAgIGJhbGFuY2VJcm9uQXJtb3IxQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uQXJtb3IxQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGJhbGFuY2VJcm9uQXJtb3IxVXNlcjUgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI1LmFkZHJlc3MpXSxcbiAgICAgIHVzZXI1LmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uQXJtb3IxVXNlcjUucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGxldCBiYWxhbmNlSXJvbkFybW9yMVVzZXIxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkFybW9yMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyMS5hZGRyZXNzKV0sXG4gICAgICB1c2VyMS5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvbkFybW9yMVVzZXIxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG5cbiAgICAvLyB0cmFuc2ZlciAxIGVuaGFuY2VkQXJtb3IgZnJvbSB1c2VyNiB0byB1c2VyMlxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChlbmhhbmNlZEFybW9yMSksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyNi5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIyLmFkZHJlc3MpXSxcbiAgICAgICAgdXNlcjYuYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgMTJ0aCB0cmFuc2ZlclxuICAgIGJhbGFuY2VFbmhhbmNlZEFybW9yMUFkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZW5oYW5jZWRBcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUVuaGFuY2VkQXJtb3IxQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGJhbGFuY2VFbmhhbmNlZEFybW9yMVVzZXI2ID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZW5oYW5jZWRBcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjYuYWRkcmVzcyldLFxuICAgICAgdXNlcjYuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUVuaGFuY2VkQXJtb3IxVXNlcjYucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGxldCBiYWxhbmNlRW5oYW5jZWRBcm1vcjFVc2VyMiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGVuaGFuY2VkQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIyLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIyLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VFbmhhbmNlZEFybW9yMVVzZXIyLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG4gIH0sXG59KTtcblxuQ2xhcmluZXQudGVzdCh7XG4gIG5hbWU6ICdUcmFuc2ZlciBsZXZlbC11cCBpdGVtcyB0ZXN0JyxcbiAgYXN5bmMgZm4oY2hhaW46IENoYWluLCBhY2NvdW50czogTWFwPHN0cmluZywgQWNjb3VudD4pIHtcbiAgICBjb25zdCBhZG1pbiA9IGFjY291bnRzLmdldCgnZGVwbG95ZXInKSE7XG4gICAgY29uc3QgdXNlcjEgPSBhY2NvdW50cy5nZXQoJ3dhbGxldF8xJykhO1xuICAgIGNvbnN0IHVzZXIyID0gYWNjb3VudHMuZ2V0KCd3YWxsZXRfMicpITtcbiAgICBjb25zdCB1c2VyMyA9IGFjY291bnRzLmdldCgnd2FsbGV0XzMnKSE7XG4gICAgY29uc3QgdXNlcjQgPSBhY2NvdW50cy5nZXQoJ3dhbGxldF80JykhO1xuICAgIGNvbnN0IHVzZXI1ID0gYWNjb3VudHMuZ2V0KCd3YWxsZXRfNScpITtcbiAgICBjb25zdCB1c2VyNiA9IGFjY291bnRzLmdldCgnd2FsbGV0XzYnKSE7XG5cbiAgICAvLyBtaW50IDFcblxuICAgIGxldCBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlblN3b3JkMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDQpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIHdvb2RlblN3b3JkMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsdXAgd29vZGVuU3dvcmQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5Td29yZDMpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA0XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgOCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IGlyb25Td29yZDFcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBjcmFmdGluZ0ZuLCBbdHlwZXMudWludChpcm9uU3dvcmQxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgOSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25Td29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25Td29yZDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgNlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbCB1cCBpcm9uU3dvcmQzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludChpcm9uU3dvcmQzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDdcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludCh3b29kKSwgdHlwZXMudWludCg0KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGNyYWZ0IHdvb2RlbkFybW9yMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGNyYWZ0aW5nRm4sIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA4XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCgyKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgd29vZGVuQXJtb3IyXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgbGV2ZWxVcEZuLCBbdHlwZXMudWludCh3b29kZW5Bcm1vcjIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgOVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KHdvb2QpLCB0eXBlcy51aW50KDEwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChlbmVyZ3kpLCB0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzFdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBsZXZlbHVwIHdvb2RlbkFybW9yM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IzKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDEwXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoNCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBjcmFmdCBpcm9uQXJtb3IxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgY3JhZnRpbmdGbiwgW3R5cGVzLnVpbnQoaXJvbkFybW9yMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIxKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAxMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGlyb24pLCB0eXBlcy51aW50KDYpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGVuZXJneSksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjIpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMV0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGxldmVsIHVwIGlyb25Bcm1vcjJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBsZXZlbFVwRm4sIFt0eXBlcy51aW50KGlyb25Bcm1vcjIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMyk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIG1pbnQgMTJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgxMCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZW5lcmd5KSwgdHlwZXMudWludCg2KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcbiAgICBibG9jay5yZWNlaXB0c1sxXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbGV2ZWwgdXAgaXJvbkFybW9yM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGxldmVsVXBGbiwgW3R5cGVzLnVpbnQoaXJvbkFybW9yMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSB3b29kZW5Td29yZDMgZnJvbSBhZG1pbiB0byB1c2VyM1xuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDMpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMy5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMjYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBiYWxhbmNlIGFmdGVyIDFzdCB0cmFuc2ZlclxuICAgIGxldCBiYWxhbmNlV29vZGVuU3dvcmQzQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblN3b3JkM0FkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlblN3b3JkM1VzZXIzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIzLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Td29yZDNVc2VyMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSB3b29kZW5Bcm1vcjMgZnJvbSBhZG1pbiB0byB1c2VyIDZcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjYuYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciAybmQgdHJhbnNmZXJcbiAgICBsZXQgYmFsYW5jZVdvb2RlbkFybW9yM0FkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Bcm1vcjNBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5Bcm1vcjNVc2VyNiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMyksIHR5cGVzLnByaW5jaXBhbCh1c2VyNi5hZGRyZXNzKV0sXG4gICAgICB1c2VyNi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IzVXNlcjYucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgaXJvblN3b3JkMyBmcm9tIGFkbWluIHRvIHVzZXIgMlxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChpcm9uU3dvcmQzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjIuYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciAzcmQgdHJhbnNmZXJcbiAgICBsZXQgYmFsYW5jZUlyb25Td29yZDNBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Td29yZDNBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uU3dvcmQzVXNlcjIgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uU3dvcmQzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIyLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIyLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uU3dvcmQzVXNlcjIucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgaXJvbkFybW9yMyBmcm9tIGFkbWluIHRvIHVzZXIgM1xuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChpcm9uQXJtb3IzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjMuYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDI5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA0dGggdHJhbnNmZXJcbiAgICBsZXQgYmFsYW5jZUlyb25Bcm1vcjNBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Bcm1vcjMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Bcm1vcjNBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uQXJtb3IzVXNlcjMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uQXJtb3IzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIzLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uQXJtb3IzVXNlcjMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgd29vZGVuU3dvcmQzIGZyb20gdXNlcjMgdG8gdXNlcjFcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjEuYWRkcmVzcyldLFxuICAgICAgICB1c2VyMy5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMwKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA1dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlV29vZGVuU3dvcmQzQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblN3b3JkM0FkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBiYWxhbmNlV29vZGVuU3dvcmQzVXNlcjMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDMpLCB0eXBlcy5wcmluY2lwYWwodXNlcjMuYWRkcmVzcyldLFxuICAgICAgdXNlcjMuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblN3b3JkM1VzZXIzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlblN3b3JkM1VzZXIxID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIxLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIxLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Td29yZDNVc2VyMS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSB3b29kZW5Bcm1vcjMgZnJvbSB1c2VyNiB0byB1c2VyMlxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjYuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMi5hZGRyZXNzKV0sXG4gICAgICAgIHVzZXI2LmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMzEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBiYWxhbmNlIGFmdGVyIDZ0aCB0cmFuc2ZlclxuICAgIGJhbGFuY2VXb29kZW5Bcm1vcjNBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IzQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGJhbGFuY2VXb29kZW5Bcm1vcjNVc2VyNiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMyksIHR5cGVzLnByaW5jaXBhbCh1c2VyNi5hZGRyZXNzKV0sXG4gICAgICB1c2VyNi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IzVXNlcjYucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGxldCBiYWxhbmNlV29vZGVuQXJtb3IzVXNlcjIgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpLCB0eXBlcy5wcmluY2lwYWwodXNlcjIuYWRkcmVzcyldLFxuICAgICAgdXNlcjIuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yM1VzZXIyLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG5cbiAgICAvLyB0cmFuc2ZlciAxIGlyb25Td29yZDMgZnJvbSB1c2VyMiB0byB1c2VyNFxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChpcm9uU3dvcmQzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIyLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyldLFxuICAgICAgICB1c2VyMi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA3dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlSXJvblN3b3JkM0FkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblN3b3JkMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblN3b3JkM0FkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBiYWxhbmNlSXJvblN3b3JkM1VzZXIyID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvblN3b3JkMyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMi5hZGRyZXNzKV0sXG4gICAgICB1c2VyMi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvblN3b3JkM1VzZXIyLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZUlyb25Td29yZDNVc2VyNCA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDMpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyldLFxuICAgICAgdXNlcjQuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Td29yZDNVc2VyNC5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSBpcm9uQXJtb3IzIGZyb20gdXNlcjMgdG8gdXNlcjUgWFhYWFhYWFhYWFhYWFxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChpcm9uQXJtb3IzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjUuYWRkcmVzcyldLFxuICAgICAgICB1c2VyMy5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA0dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlSXJvbkFybW9yM0FkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkFybW9yMyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvbkFybW9yM0FkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBiYWxhbmNlSXJvbkFybW9yM1VzZXIzID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoaXJvbkFybW9yMyksIHR5cGVzLnByaW5jaXBhbCh1c2VyMy5hZGRyZXNzKV0sXG4gICAgICB1c2VyMy5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlSXJvbkFybW9yM1VzZXIzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZUlyb25Bcm1vcjNVc2VyNSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Bcm1vcjMpLCB0eXBlcy5wcmluY2lwYWwodXNlcjUuYWRkcmVzcyldLFxuICAgICAgdXNlcjUuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Bcm1vcjNVc2VyNS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICB9LFxufSk7XG5cbkNsYXJpbmV0LnRlc3Qoe1xuICBuYW1lOiAnVHJhbnNmZXIgYWNxdWlzaXRpb24gaXRlbXMgdGVzdCcsXG4gIGFzeW5jIGZuKGNoYWluOiBDaGFpbiwgYWNjb3VudHM6IE1hcDxzdHJpbmcsIEFjY291bnQ+KSB7XG4gICAgY29uc3QgYWRtaW4gPSBhY2NvdW50cy5nZXQoJ2RlcGxveWVyJykhO1xuICAgIGNvbnN0IHVzZXIxID0gYWNjb3VudHMuZ2V0KCd3YWxsZXRfMScpITtcbiAgICBjb25zdCB1c2VyMiA9IGFjY291bnRzLmdldCgnd2FsbGV0XzInKSE7XG4gICAgY29uc3QgdXNlcjMgPSBhY2NvdW50cy5nZXQoJ3dhbGxldF8zJykhO1xuICAgIGNvbnN0IHVzZXI0ID0gYWNjb3VudHMuZ2V0KCd3YWxsZXRfNCcpITtcbiAgICBjb25zdCB1c2VyNSA9IGFjY291bnRzLmdldCgnd2FsbGV0XzUnKSE7XG4gICAgY29uc3QgdXNlcjYgPSBhY2NvdW50cy5nZXQoJ3dhbGxldF82JykhO1xuXG4gICAgLy8gbWludCAxXG5cbiAgICBsZXQgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgVHguY29udHJhY3RDYWxsKFxuICAgICAgICBjb250cmFjdE5hbWUsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIFt0eXBlcy51aW50KGdvbGQpLCB0eXBlcy51aW50KDE1KSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlblN3b3JkMVxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDMpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCg0MCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoNyksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgNCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJ1eSB3b29kZW5Td29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtUeC5jb250cmFjdENhbGwoY29udHJhY3ROYW1lLCBhY3F1aXNpdGlvbkZuLCBbdHlwZXMudWludCh3b29kZW5Td29yZDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCAzXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvbiksIHR5cGVzLnVpbnQoMjApLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDYpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgaXJvblN3b3JkMlxuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KGlyb25Td29yZDIpXSwgYWRtaW4uYWRkcmVzcyldKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCA3KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gbWludCA0XG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQoZ29sZCksIHR5cGVzLnVpbnQoNTAwKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChpcm9uKSwgdHlwZXMudWludCgxMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMTEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDMpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDgpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgZW5oYW5jZWRTd29yZDJcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQyKV0sIGFkbWluLmFkZHJlc3MpLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDkpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDVcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCgxNSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTApO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBidXkgd29vZGVuQXJtb3IxXG5cbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbVHguY29udHJhY3RDYWxsKGNvbnRyYWN0TmFtZSwgYWNxdWlzaXRpb25GbiwgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKV0sIGFkbWluLmFkZHJlc3MpXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTEpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBtaW50IDZcblxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICBtaW50LFxuICAgICAgICBbdHlwZXMudWludChnb2xkKSwgdHlwZXMudWludCg1MCksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgbWludCxcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZCksIHR5cGVzLnVpbnQoMTcpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDIpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYnV5IHdvb2RlbkFybW9yM1xuXG4gICAgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1R4LmNvbnRyYWN0Q2FsbChjb250cmFjdE5hbWUsIGFjcXVpc2l0aW9uRm4sIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMyldLCBhZG1pbi5hZGRyZXNzKV0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDEzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSB3b29kZW5Td29yZDEgZnJvbSBhZG1pbiB0byB1c2VyIDFcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQxKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjEuYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE0KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciAxc3QgdHJhbnNmZXJcbiAgICBsZXQgYmFsYW5jZVdvb2RlblN3b3JkMUFkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Td29yZDFBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5Td29yZDFVc2VyMSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlblN3b3JkMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyMS5hZGRyZXNzKV0sXG4gICAgICB1c2VyMS5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuU3dvcmQxVXNlcjEucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgaXJvblN3b3JkMiBmcm9tIGFkbWluIHRvIHVzZXIgMlxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChpcm9uU3dvcmQyKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjIuYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE1KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciAybmQgdHJhbnNmZXJcbiAgICBsZXQgYmFsYW5jZUlyb25Td29yZDJBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Td29yZDJBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uU3dvcmQyVXNlcjIgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uU3dvcmQyKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIyLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIyLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uU3dvcmQyVXNlcjIucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgZW5oYW5jZWRTd29yZDIgZnJvbSBhZG1pbiB0byB1c2VyM1xuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMiksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpXSxcbiAgICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAxNik7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgM3JkIHRyYW5zZmVyXG4gICAgbGV0IGJhbGFuY2VFbmhhbmNlZFN3b3JkMkFkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZW5oYW5jZWRTd29yZDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUVuaGFuY2VkU3dvcmQyQWRtaW4ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgwKTtcblxuICAgIGxldCBiYWxhbmNlRW5oYW5jZWRTd29yZDJVc2VyMyA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGVuaGFuY2VkU3dvcmQyKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIzLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VFbmhhbmNlZFN3b3JkMlVzZXIzLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMSk7XG5cbiAgICAvLyB0cmFuc2ZlciAxIHdvb2RlbkFybW9yMSBmcm9tIGFkbWluIHRvIHVzZXIgNFxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpLCB0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh1c2VyNC5hZGRyZXNzKV0sXG4gICAgICAgIGFkbWluLmFkZHJlc3NcbiAgICAgICksXG4gICAgXSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLnJlY2VpcHRzLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMTcpO1xuICAgIGJsb2NrLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdEJvb2wodHJ1ZSk7XG5cbiAgICAvLyBiYWxhbmNlIGFmdGVyIDR0aCB0cmFuc2ZlclxuICAgIGxldCBiYWxhbmNlV29vZGVuQXJtb3IxQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yMUFkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlbkFybW9yMVVzZXI0ID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI0LmFkZHJlc3MpXSxcbiAgICAgIHVzZXI0LmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Bcm1vcjFVc2VyNC5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSB3b29kZW5Bcm1vcjMgZnJvbSBhZG1pbiB0byB1c2VyIDVcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjUuYWRkcmVzcyldLFxuICAgICAgICBhZG1pbi5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE4KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA1dGggdHJhbnNmZXJcbiAgICBsZXQgYmFsYW5jZVdvb2RlbkFybW9yM0FkbWluID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IzKSwgdHlwZXMucHJpbmNpcGFsKGFkbWluLmFkZHJlc3MpXSxcbiAgICAgIGFkbWluLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Bcm1vcjNBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgbGV0IGJhbGFuY2VXb29kZW5Bcm1vcjNVc2VyNSA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KHdvb2RlbkFybW9yMyksIHR5cGVzLnByaW5jaXBhbCh1c2VyNS5hZGRyZXNzKV0sXG4gICAgICB1c2VyNS5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IzVXNlcjUucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgd29vZGVuU3dvcmQxIGZyb20gdXNlcjEgdG8gdXNlcjJcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQxKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIxLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjIuYWRkcmVzcyldLFxuICAgICAgICB1c2VyMS5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDE5KTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA2dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlV29vZGVuU3dvcmQxQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblN3b3JkMUFkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBiYWxhbmNlV29vZGVuU3dvcmQxVXNlcjEgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Td29yZDEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjEuYWRkcmVzcyldLFxuICAgICAgdXNlcjEuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlblN3b3JkMVVzZXIxLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlblN3b3JkMVVzZXIyID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuU3dvcmQxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIyLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIyLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Td29yZDFVc2VyMi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSBpcm9uU3dvcmQyIGZyb20gdXNlcjIgdG8gdXNlcjNcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQoaXJvblN3b3JkMiksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyMi5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpXSxcbiAgICAgICAgdXNlcjIuYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMCk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgN3RoIHRyYW5zZmVyXG4gICAgYmFsYW5jZUlyb25Td29yZDJBZG1pbiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDIpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Td29yZDJBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgYmFsYW5jZUlyb25Td29yZDJVc2VyMiA9IGNoYWluLmNhbGxSZWFkT25seUZuKFxuICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgZ2V0QmFsYW5jZSxcbiAgICAgIFt0eXBlcy51aW50KGlyb25Td29yZDIpLCB0eXBlcy5wcmluY2lwYWwodXNlcjIuYWRkcmVzcyldLFxuICAgICAgdXNlcjIuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUlyb25Td29yZDJVc2VyMi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgbGV0IGJhbGFuY2VJcm9uU3dvcmQyVXNlcjMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChpcm9uU3dvcmQyKSwgdHlwZXMucHJpbmNpcGFsKHVzZXIzLmFkZHJlc3MpXSxcbiAgICAgIHVzZXIzLmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VJcm9uU3dvcmQyVXNlcjMucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgZW5oYW5jZWRTd29yZDIgZnJvbSB1c2VyMyB0byB1c2VyNFxuICAgIGJsb2NrID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgIFR4LmNvbnRyYWN0Q2FsbChcbiAgICAgICAgY29udHJhY3ROYW1lLFxuICAgICAgICB0cmFuc2ZlckZuLFxuICAgICAgICBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMiksIHR5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbCh1c2VyMy5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI0LmFkZHJlc3MpXSxcbiAgICAgICAgdXNlcjMuYWRkcmVzc1xuICAgICAgKSxcbiAgICBdKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnRFcXVhbHMoYmxvY2suaGVpZ2h0LCAyMSk7XG4gICAgYmxvY2sucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0Qm9vbCh0cnVlKTtcblxuICAgIC8vIGJhbGFuY2UgYWZ0ZXIgOHRoIHRyYW5zZmVyXG4gICAgYmFsYW5jZUVuaGFuY2VkU3dvcmQyQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMiksIHR5cGVzLnByaW5jaXBhbChhZG1pbi5hZGRyZXNzKV0sXG4gICAgICBhZG1pbi5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlRW5oYW5jZWRTd29yZDJBZG1pbi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgYmFsYW5jZUVuaGFuY2VkU3dvcmQyVXNlcjMgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludChlbmhhbmNlZFN3b3JkMiksIHR5cGVzLnByaW5jaXBhbCh1c2VyMy5hZGRyZXNzKV0sXG4gICAgICB1c2VyMy5hZGRyZXNzXG4gICAgKTtcbiAgICBiYWxhbmNlRW5oYW5jZWRTd29yZDJVc2VyMy5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDApO1xuXG4gICAgbGV0IGJhbGFuY2VFbmhhbmNlZFN3b3JkMlVzZXI0ID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQoZW5oYW5jZWRTd29yZDIpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyldLFxuICAgICAgdXNlcjQuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZUVuaGFuY2VkU3dvcmQyVXNlcjQucmVzdWx0LmV4cGVjdE9rKCkuZXhwZWN0VWludCgxKTtcblxuICAgIC8vIHRyYW5zZmVyIDEgd29vZGVuQXJtb3IxIGZyb20gdXNlcjQgdG8gdXNlcjVcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI0LmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjUuYWRkcmVzcyldLFxuICAgICAgICB1c2VyNC5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIyKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA5dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IxQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yMUFkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBiYWxhbmNlV29vZGVuQXJtb3IxVXNlcjQgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjEpLCB0eXBlcy5wcmluY2lwYWwodXNlcjQuYWRkcmVzcyldLFxuICAgICAgdXNlcjQuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yMVVzZXI0LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlbkFybW9yMVVzZXI1ID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI1LmFkZHJlc3MpXSxcbiAgICAgIHVzZXI1LmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Bcm1vcjFVc2VyNS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuXG4gICAgLy8gdHJhbnNmZXIgMSB3b29kZW5Bcm1vcjMgZnJvbSB1c2VyNSB0byB1c2VyNiBYWFhYWFhYWFhYWFhYWFhYWFhYWFhcbiAgICBibG9jayA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICBUeC5jb250cmFjdENhbGwoXG4gICAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgICAgdHJhbnNmZXJGbixcbiAgICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IzKSwgdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI1LmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwodXNlcjYuYWRkcmVzcyldLFxuICAgICAgICB1c2VyNS5hZGRyZXNzXG4gICAgICApLFxuICAgIF0pO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5yZWNlaXB0cy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydEVxdWFscyhibG9jay5oZWlnaHQsIDIzKTtcbiAgICBibG9jay5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RCb29sKHRydWUpO1xuXG4gICAgLy8gYmFsYW5jZSBhZnRlciA1dGggdHJhbnNmZXJcbiAgICBiYWxhbmNlV29vZGVuQXJtb3IzQWRtaW4gPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpLCB0eXBlcy5wcmluY2lwYWwoYWRtaW4uYWRkcmVzcyldLFxuICAgICAgYWRtaW4uYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yM0FkbWluLnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBiYWxhbmNlV29vZGVuQXJtb3IzVXNlcjUgPSBjaGFpbi5jYWxsUmVhZE9ubHlGbihcbiAgICAgIGNvbnRyYWN0TmFtZSxcbiAgICAgIGdldEJhbGFuY2UsXG4gICAgICBbdHlwZXMudWludCh3b29kZW5Bcm1vcjMpLCB0eXBlcy5wcmluY2lwYWwodXNlcjUuYWRkcmVzcyldLFxuICAgICAgdXNlcjUuYWRkcmVzc1xuICAgICk7XG4gICAgYmFsYW5jZVdvb2RlbkFybW9yM1VzZXI1LnJlc3VsdC5leHBlY3RPaygpLmV4cGVjdFVpbnQoMCk7XG5cbiAgICBsZXQgYmFsYW5jZVdvb2RlbkFybW9yM1VzZXI2ID0gY2hhaW4uY2FsbFJlYWRPbmx5Rm4oXG4gICAgICBjb250cmFjdE5hbWUsXG4gICAgICBnZXRCYWxhbmNlLFxuICAgICAgW3R5cGVzLnVpbnQod29vZGVuQXJtb3IzKSwgdHlwZXMucHJpbmNpcGFsKHVzZXI2LmFkZHJlc3MpXSxcbiAgICAgIHVzZXI2LmFkZHJlc3NcbiAgICApO1xuICAgIGJhbGFuY2VXb29kZW5Bcm1vcjNVc2VyNi5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEpO1xuICB9LFxufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxRQUFRLEVBQUUsRUFBRSxFQUFrQixLQUFLLFFBQVEsOENBQThDLENBQUM7QUFDbkcsU0FBUyxZQUFZLFFBQVEsaURBQWlELENBQUM7QUFDL0UsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLEFBQUM7QUFDbkMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEFBQUM7QUFDN0IsTUFBTSxZQUFZLEdBQUcscUJBQXFCLEFBQUM7QUFDM0MsTUFBTSxVQUFVLEdBQUcsVUFBVSxBQUFDO0FBQzlCLE1BQU0sVUFBVSxHQUFHLFlBQVksQUFBQztBQUNoQyxNQUFNLFNBQVMsR0FBRyxVQUFVLEFBQUM7QUFDN0IsTUFBTSxhQUFhLEdBQUcsVUFBVSxBQUFDO0FBQ2pDLE1BQU0sVUFBVSxHQUFHLGFBQWEsQUFBQztBQUNqQyxNQUFNLG9CQUFvQixHQUFHLHdCQUF3QixBQUFDO0FBQ3RELE1BQU0sbUJBQW1CLEdBQUcsd0JBQXdCLEFBQUM7QUFDckQsTUFBTSx1QkFBdUIsR0FBRywyQkFBMkIsQUFBQztBQUM1RCxNQUFNLElB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RSxLQUFLLENBQUMsT0FBTyxDQUNkO1NBQ0YsQ0FBQyxBQUFDO1FBQ0gsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCx1QkFBdUI7UUFFdkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUU7Z0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FBQyxDQUFDLENBQUM7UUFDaEgsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxxQkFBcUI7UUFFckIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUU7Z0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FBQyxDQUFDLENBQUM7UUFDOUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCx1QkFBdUI7UUFFdkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUU7Z0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FBQyxDQUFDLENBQUM7UUFDaEgsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxxQkFBcUI7UUFFckIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUU7Z0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FBQyxDQUFDLENBQUM7UUFDOUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCx3QkFBd0I7UUFFeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7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QUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQy9HLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsdUJBQXVCO1FBRXZCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQy9HLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsbUJBQW1CO1FBRW5CLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzlHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzdHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzdHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsNkJBQTZCO1FBRTdCLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FDNUMsWUFBWSxFQUNaLFVBQVUsRUFDVjtZQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsRUFDMUQsS0FBSyxDQUFDLE9BQU8sQ0FDZCxBQUFDO1FBQ0YsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRCxJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxjQUFjLENBQzFDLFlBQVksRUFDWixVQUFVLEVBQ1Y7WUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUFDLEVBQ3hELEtBQUssQ0FBQyxPQUFPLENBQ2QsQUFBQztRQUNGLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEQsdUJBQXVCO1FBRXZCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2xILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsMEJBQTBCO1FBRTFCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2pILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsMEJBQTBCO1FBRTFCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2pILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQscUJBQXFCO1FBRXJCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2hILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsd0JBQXdCO1FBRXhCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQy9HLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsdUJBQXVCO1FBRXZCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQy9HLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsbUJBQW1CO1FBRW5CLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzlHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzdHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzdHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsNkJBQTZCO1FBRTdCLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FDNUMsWUFBWSxFQUNaLFVBQVUsRUFDVjtZQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsRUFDMUQsS0FBSyxDQUFDLE9BQU8sQ0FDZCxBQUFDO1FBQ0YsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRCxJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxjQUFjLENBQzFDLFlBQVksRUFDWixVQUFVLEVBQ1Y7WUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUFDLEVBQ3hELEtBQUssQ0FBQyxPQUFPLENBQ2QsQUFBQztRQUNGLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEQsMEJBQTBCO1FBRTFCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2xILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsMEJBQTBCO1FBRTFCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2pILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsMEJBQTBCO1FBRTFCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2pILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2pILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQseUJBQXlCO1FBRXpCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2hILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMs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QUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsMkJBQTJCO1FBRTNCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2xILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2pILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQseUJBQXlCO1FBRXpCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2hILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsd0JBQXdCO1FBRXhCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2hILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsb0JBQW9CO1FBRXBCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQy9HLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsdUJBQXVCO1FBRXZCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzlHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsdUJBQXVCO1FBRXZCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzlHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsNkJBQTZCO1FBRTdCLElBQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FDN0MsWUFBWSxFQUNaLFVBQVUsRUFDVjtZQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsRUFDM0QsS0FBSyxDQUFDLE9BQU8sQ0FDZCxBQUFDO1FBQ0Ysb0JBQW9CLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRCxJQUFJLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxjQUFjLENBQzNDLFlBQVksRUFDWixVQUFVLEVBQ1Y7WUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUFDLEVBQ3pELEtBQUssQ0FBQyxPQUFPLENBQ2QsQUFBQztRQUNGLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsd0JBQXdCO1FBRXhCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ25ILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsMkJBQTJCO1FBRTNCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2xILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsMkJBQTJCO1FBRTNCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2xILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQscUJBQXFCO1FBRXJCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2hILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsd0JBQXdCO1FBRXhCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQy9HLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsdUJBQXVCO1FBRXZCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQy9HLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsbUJBQW1CO1FBRW5CLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzlHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzdHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQzdHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsNkJBQTZCO1FBRTdCLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FDNUMsWUFBWSxFQUNaLFVBQVUsRUFDVjtZQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsRUFDMUQsS0FBSyxDQUFDLE9BQU8sQ0FDZCxBQUFDO1FBQ0YsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRCxJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxjQUFjLENBQzFDLFlBQVksRUFDWixVQUFVLEVBQ1Y7WUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUFDLEVBQ3hELEtBQUssQ0FBQyxPQUFPLENBQ2QsQUFBQztRQUNGLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEQsdUJBQXVCO1FBRXZCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2xILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsMEJBQTBCO1FBRTFCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2pILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsMEJBQTBCO1FBRTFCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUMsQ0FBQyxDQUFDO1FBQ2pILFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEQ7Q0FDRixDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ1osSUFBSSxFQUFFLHNDQUFzQztJQUM1QyxNQUFNLEVBQUUsRUFBQyxLQUFZLEVBQUUsUUFBOEIsRUFBRTtRQUNyRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxBQUFDLEFBQUM7UUFFeEMsU0FBUztRQUVULElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDMUIsRUFBRSxDQUFDLFlBQVksQ0FDYixZQUFZLEVBQ1osSUFBSSxFQUNKO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUFDLEVBQ3BFLEtBQUssQ0FBQyxPQUFPLENBQ2Q7WUFDRCxFQUFFLENBQUMsWUFBWSxDQUNiLFlBQVksRUFDWixJQUFJLEVBQ0o7Z0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQUMsRUFDdEUsS0FBSyxDQUFDLE9BQU8sQ0FDZDtZQUNELEVBQUUsQ0FBQyxZQUFZLENBQ2IsWUFBWSxFQUNaLElBQUksRUFDSjtnQkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFBQyxFQUNwRSxLQUFLLENBQUMsT0FBTyxDQUNkO1lBQ0QsRUFBRSxDQUFDLFlBQVksQ0FDYixZQUFZLEVBQ1osSUFBSSxFQUNKO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUFDLEVBQ3BFLEtBQUssQ0FBQyxPQUFPLENBQ2Q7U0FDRixDQUFDLEFBQUM7UUFDSCxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELG1CQUFtQjtRQUVuQixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRTtnQkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUFDLENBQUMsQ0FBQztRQUNuSCxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELG1CQUFtQjtRQUVuQixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRTtnQkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUFDLENBQUMsQ0FBQztRQUNuSCxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELGlCQUFpQjtRQUVqQixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRTtnQkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUFDLENBQUMsQ0FBQztRQUNqSCxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELHFCQUFxQjtRQUVyQixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUN0QixFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUU7Z0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7YUFBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FDMUYsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxtQkFBbUI7UUFFbkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUU7Z0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FBQyxDQUFDLENBQUM7UUFDbkgsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxtQkFBbUI7UUFFbkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUU7Z0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FBQyxDQUFDLENBQUM7UUFDbkgsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLENBQUMs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