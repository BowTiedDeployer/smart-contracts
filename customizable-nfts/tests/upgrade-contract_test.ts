

import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.31.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

const CONTRACT_NAME = 'upgrade-contract';
const GET_DISASSEMBLE_WORK_QUEUE = 'get-disassemble-work-queue';
const GET_DISASSEMBLE_HEAD_WORK_QUEUE = 'get-disassemble-head-work-queue';
const POP_DISASSEMBLE_WORK_QUEUE = 'pop-disassemble-work-queue-public';
const IS_DISASSEMBLE_GET_FIRST_ELEMENT = 'is-disassemble-first-element-public';
const IS_DISASSEMBLE_VALUE_FOR_PRINCIPAL = 'is-disassemble-value-for-principal-public';
const FEE_PROCESSING = 'fee-processing-public';
const ADD_DISASSEMBLE_WORK_IN_QUEUE = 'add-disassemble-work-in-queue';
const DISASSEMBLE_FINALIZE = 'disassemble-finalize';

Clarinet.test({
    name: "Ensure that <...>",
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

//DISASSEMBLE
//is-disassemble-value-for-principal
Clarinet.test({
    name: "upgrade-contract_is-disassemble-value-for-principal_deployer_deployer_true",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;

        let block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                IS_DISASSEMBLE_VALUE_FOR_PRINCIPAL,
                [
                    types.tuple({'token-id':types.uint(1), 'member':types.principal(deployer.address)})
                ],
                deployer.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsd `, block.receipts[0].events);

        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);
    },
});

Clarinet.test({
    name: "upgrade-contract_is-disassemble-value-for-principal_deployer_address_false",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                IS_DISASSEMBLE_VALUE_FOR_PRINCIPAL,
                [
                    types.tuple({'token-id':types.uint(1), 'member':types.principal(member.address)})
                ],
                deployer.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsm `, block.receipts[0].events);

        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(false);
    },
});

Clarinet.test({
    name: "upgrade-contract_is-disassemble-value-for-principal_address_address_true",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const member = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                IS_DISASSEMBLE_VALUE_FOR_PRINCIPAL,
                [
                    types.tuple({'token-id':types.uint(1), 'member':types.principal(member.address)})
                ],
                member.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsa `, block.receipts[0].events);

        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);
    },
});


//fee-processing
Clarinet.test({
    name: "upgrade-contract_fee-processing_address_ok",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                FEE_PROCESSING,
                [
                ],
                member.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsa `, block.receipts[0].events);

        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);
        assertEquals(block.receipts[0].events[0]['stx_transfer_event']['amount'], '10000');
    },
});

Clarinet.test({
    name: "upgrade-contract_fee-processing_deployer_error",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;

        let block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                FEE_PROCESSING,
                [
                ],
                deployer.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsa `, block.receipts[0].events);

        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectErr().expectUint(2);
    },
});

//add-disassemble-work-in-queue


