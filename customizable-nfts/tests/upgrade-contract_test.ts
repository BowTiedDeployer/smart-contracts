

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
const DEGEN_NFT_CONTRACT = 'degens';
const DEGEN_NFT_MINT_URI = 'mint-uri';
const BACKGROUND_CONTRACT = 'backgrounds';
const CAR_CONTRACT = 'cars';
const RIM_CONTRACT = 'rims';
const HEAD_CONTRACT = 'heads';

const COMPONENT_GET_OWNER = 'get-owner';

//errors
const ERR_INVALID = 300;
const ERR_TOO_MANY_DISASSEMBLE = 200;
const ERR_NOT_OWNER = 100;
const ERR_COMPONENT_TYPE_INVALID = 501;

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
Clarinet.test({
    name: "upgrade-contract_add-disassemble-work-in-queue_address_tokenOwned_ok",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const receiver = accounts.get('wallet_1')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                receiver.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsmint `, block.receipts[0].events);
        // console.log(`eventsadd `, block.receipts[1].events);

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            deployer.address
        );
        
        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];
        
        //verify transaction was successful and correct
        //fees applied to user
        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 2);
        block.receipts[1].result.expectOk().expectBool(true);
        assertEquals(block.receipts[1].events[0]['stx_transfer_event']['amount'], '10000');
        assertEquals(block.receipts[1].events[1]['nft_burn_event']['value'], token_id);

        //verify token was correctly added to queue
        assertEquals(
            queue_head.result,
            `(ok (some {member: ${receiver.address}, token-id: ${token_id}}))`
        );
    },
});

Clarinet.test({
    name: "upgrade-contract_add-disassemble-work-in-queue_deployer_tokenOwned_ok",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                deployer.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsmint `, block.receipts[0].events);
        // console.log(`eventsadd `, block.receipts[1].events);

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];

        //verify transaction was successful and correct
        //no fees applied to deployer
        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 2);
        block.receipts[1].result.expectOk().expectBool(true);
        assertEquals(block.receipts[1].events[0]['nft_burn_event']['value'], token_id);

        //verify token was correctly added to queue
        assertEquals(
            queue_head.result,
            `(ok (some {member: ${deployer.address}, token-id: ${token_id}}))`
        );
    },
});

Clarinet.test({
    name: "upgrade-contract_add-disassemble-work-in-queue_address_tokenNotOwned_error",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const receiver = accounts.get('wallet_1')!;
        const notOwner = accounts.get('wallet_2')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                notOwner.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsmint `, block.receipts[0].events);
        // console.log(`eventsadd `, block.receipts[1].events);

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [],
            deployer.address
        );
                
        //verify transaction was unsuccessful
        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 2);
        block.receipts[1].result.expectErr().expectUint(ERR_NOT_OWNER);

        //verify token was not added to queue
        assertEquals(
            queue_head.result,
            `(ok none)`
        );
    },
});

Clarinet.test({
    name: "upgrade-contract_add-disassemble-work-in-queue_deployer_tokenNotOwned_error",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const receiver = accounts.get('wallet_1')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                deployer.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsmint `, block.receipts[0].events);
        // console.log(`eventsadd `, block.receipts[1].events);

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [],
            deployer.address
        );
                
        //verify transaction was unsuccessful
        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 2);
        block.receipts[1].result.expectErr().expectUint(ERR_NOT_OWNER);

        //verify token was not added to queue
        assertEquals(
            queue_head.result,
            `(ok none)`
        );
    },
});

Clarinet.test({
    name: "upgrade-contract_add-disassemble-work-in-queue_address_tokenOwned_addedTwice_error",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const receiver = accounts.get('wallet_1')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                receiver.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                receiver.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsmint `, block.receipts[0].events);
        // console.log(`eventsadd `, block.receipts[1].events);

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];
        
        //verify first transaction was successful and correct
        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 3);
        block.receipts[1].result.expectOk().expectBool(true);
        assertEquals(block.receipts[1].events[0]['stx_transfer_event']['amount'], '10000');
        assertEquals(block.receipts[1].events[1]['nft_burn_event']['value'], token_id);

        //verify second transaction unsuccessful
        block.receipts[2].result.expectErr().expectUint(ERR_NOT_OWNER);

        //verify token was correctly added to queue
        assertEquals(
            queue_head.result,
            `(ok (some {member: ${receiver.address}, token-id: ${token_id}}))`
        );

        // const queue = chain.callReadOnlyFn(
        //     CONTRACT_NAME,
        //     GET_DISASSEMBLE_WORK_QUEUE,
        //     [
        //     ],
        //     deployer.address
        // );

        // console.log(`queue `, queue);
    },
});

Clarinet.test({
    name: "upgrade-contract_add-disassemble-work-in-queue_deployer_tokenOwned_addedTwice_error",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                deployer.address
            ),
        ]);

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];
        
        //verify first transaction was successful and correct
        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 3);
        block.receipts[1].result.expectOk().expectBool(true);
        assertEquals(block.receipts[1].events[0]['nft_burn_event']['value'], token_id);

        //verify second transaction unsuccessful
        block.receipts[2].result.expectErr().expectUint(ERR_NOT_OWNER);

        //verify token was correctly added to queue
        assertEquals(
            queue_head.result,
            `(ok (some {member: ${deployer.address}, token-id: ${token_id}}))`
        );
    },
});

Clarinet.test({
    name: "upgrade-contract_add-disassemble-work-in-queue_address_add5Tokens_error",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const receiver = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';
        const degen2 = 'urlNiceDegen2';
        const degen3 = 'urlNiceDegen3';
        const degen4 = 'urlNiceDegen4';
        const degen5 = 'urlNiceDegen5';
        const degen6 = 'urlNiceDegen6';


        let block_mint = chain.mineBlock([
            //mint degens for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(degen3)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(degen4)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(degen5)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(degen6)
                ],
                deployer.address
            ),
        ]);

        let block_disassemble = chain.mineBlock([
            //add tokens in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                receiver.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(2)
                ],
                receiver.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(3)
                ],
                receiver.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(4)
                ],
                receiver.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(5)
                ],
                receiver.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(6)
                ],
                receiver.address
            ),
        ]);
        
        const token_id1 = block_mint.receipts[0].events[0]['nft_mint_event']['value'];
        const token_id5 = block_mint.receipts[4].events[0]['nft_mint_event']['value'];
        const token_id6 = block_mint.receipts[5].events[0]['nft_mint_event']['value'];

        //verify transaction was successful and correct
        assertEquals(block_disassemble.height, 3);
        assertEquals(block_disassemble.receipts.length, 6);

        block_disassemble.receipts[0].result.expectOk().expectBool(true);
        assertEquals(block_disassemble.receipts[0].events[0]['stx_transfer_event']['amount'], '10000');
        assertEquals(block_disassemble.receipts[0].events[1]['nft_burn_event']['value'], token_id1);

        block_disassemble.receipts[4].result.expectOk().expectBool(true);
        assertEquals(block_disassemble.receipts[4].events[0]['stx_transfer_event']['amount'], '10000');
        assertEquals(block_disassemble.receipts[4].events[1]['nft_burn_event']['value'], token_id5);
        
        block_disassemble.receipts[5].result.expectErr().expectUint(ERR_TOO_MANY_DISASSEMBLE);
    },
});


Clarinet.test({
    name: "upgrade-contract_add-disassemble-work-in-queue_deployer_add5Tokens_error",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const degen1 = 'urlNiceDegen1';
        const degen2 = 'urlNiceDegen2';
        const degen3 = 'urlNiceDegen3';
        const degen4 = 'urlNiceDegen4';
        const degen5 = 'urlNiceDegen5';
        const degen6 = 'urlNiceDegen6';


        let block_mint = chain.mineBlock([
            //mint degens for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen3)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen4)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen5)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen6)
                ],
                deployer.address
            ),
        ]);

        let block_disassemble = chain.mineBlock([
            //add tokens in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(2)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(3)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(4)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(5)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(6)
                ],
                deployer.address
            ),
        ]);
        
        const token_id1 = block_mint.receipts[0].events[0]['nft_mint_event']['value'];
        const token_id5 = block_mint.receipts[4].events[0]['nft_mint_event']['value'];
        const token_id6 = block_mint.receipts[5].events[0]['nft_mint_event']['value'];

        //verify transaction was successful and correct
        assertEquals(block_disassemble.height, 3);
        assertEquals(block_disassemble.receipts.length, 6);

        block_disassemble.receipts[0].result.expectOk().expectBool(true);
        assertEquals(block_disassemble.receipts[0].events[0]['nft_burn_event']['value'], token_id1);

        block_disassemble.receipts[4].result.expectOk().expectBool(true);
        assertEquals(block_disassemble.receipts[4].events[0]['nft_burn_event']['value'], token_id5);
        
        block_disassemble.receipts[5].result.expectErr().expectUint(ERR_TOO_MANY_DISASSEMBLE);
    },
});


//get-disassemble-work-queue
Clarinet.test({
    name: "upgrade-contract_get-disassemble-work-queue_address_emptyQueue",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const member = accounts.get('wallet_1')!;

        const queue = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_WORK_QUEUE,
            [
            ],
            member.address
        );

        assertEquals(queue.result, `(ok [])`);
    },
});

Clarinet.test({
    name: "upgrade-contract_get-disassemble-work-queue_address_singleElement",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                member.address
            ),
        ]);

        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];

        const queue = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_WORK_QUEUE,
            [
            ],
            member.address
        );

        assertEquals(
            queue.result, 
            `(ok [{member: ${member.address}, token-id: ${token_id}}])`
        );
    },
});

Clarinet.test({
    name: "upgrade-contract_get-disassemble-work-queue_deployer_singleElement",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                deployer.address
            ),
        ]);

        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];

        const queue = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        assertEquals(
            queue.result, 
            `(ok [{member: ${deployer.address}, token-id: ${token_id}}])`
        );
    },
});

Clarinet.test({
    name: "upgrade-contract_get-disassemble-work-queue_address_multipleElements",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';
        const degen2 = 'urlNiceDegen2';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                member.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(2)
                ],
                member.address
            ),
        ]);

        const token_id1 = block.receipts[0].events[0]['nft_mint_event']['value'];
        const token_id2 = block.receipts[1].events[0]['nft_mint_event']['value'];

        const queue = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_WORK_QUEUE,
            [
            ],
            member.address
        );

        // assertEquals(
        //     queue.result, 
        //     `(ok [{member: ${member.address}, token-id: ${token_id}}])`
        // );
    },
});

Clarinet.test({
    name: "upgrade-contract_get-disassemble-work-queue_deployer_multipleElements",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const degen1 = 'urlNiceDegen1';
        const degen2 = 'urlNiceDegen2';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(2)
                ],
                deployer.address
            ),
        ]);

        const token_id1 = block.receipts[0].events[0]['nft_mint_event']['value'];
        const token_id2 = block.receipts[1].events[0]['nft_mint_event']['value'];

        const queue = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        // console.log(`queue `, queue);
        //todo: get list from response
    }
});


//get-disassemble-head-work-queue
Clarinet.test({
    name: "upgrade-contract_get-disassemble-head-work-queue_address_emptyQueue",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const member = accounts.get('wallet_1')!;

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            member.address
        );

        assertEquals(queue_head.result,`(ok none)`);
    },
});

Clarinet.test({
    name: "upgrade-contract_get-disassemble-head-work-queue_address_singleElement",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const receiver = accounts.get('wallet_1')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(receiver.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                receiver.address
            ),
        ]);

        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            receiver.address
        );

        //verify token was correctly added to queue
        assertEquals(
            queue_head.result,
            `(ok (some {member: ${receiver.address}, token-id: ${token_id}}))`
        );

    },
});

Clarinet.test({
    name: "upgrade-contract_get-disassemble-head-work-queue_deployer_singleElement",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const url = 'urlNiceDegen';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                deployer.address
            ),
        ]);

        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        //verify token was correctly added to queue
        assertEquals(
            queue_head.result,
            `(ok (some {member: ${deployer.address}, token-id: ${token_id}}))`
        );

    },
});

Clarinet.test({
    name: "upgrade-contract_get-disassemble-head-work-queue_address_multipleElements",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';
        const degen2 = 'urlNiceDegen2';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                member.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(2)
                ],
                member.address
            ),
        ]);

        const token_id1 = block.receipts[0].events[0]['nft_mint_event']['value'];

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            member.address
        );

        assertEquals(
            queue_head.result,
            `(ok (some {member: ${member.address}, token-id: ${token_id1}}))`
        );
    },
});

Clarinet.test({
    name: "upgrade-contract_get-disassemble-head-work-queue_deployer_multipleElements",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const degen1 = 'urlNiceDegen1';
        const degen2 = 'urlNiceDegen2';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(deployer.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(2)
                ],
                deployer.address
            ),
        ]);

        const token_id1 = block.receipts[0].events[0]['nft_mint_event']['value'];

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        assertEquals(
            queue_head.result,
            `(ok (some {member: ${deployer.address}, token-id: ${token_id1}}))`
        );
    },
});


//is-disassemble-first-element
Clarinet.test({
    name: "upgrade-contract_is-disassemble-first-element_deployer_emptyQueue_true",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
        ]);

        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];

        block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                IS_DISASSEMBLE_GET_FIRST_ELEMENT,
                [
                    types.tuple({'token-id':token_id, 'member':types.principal(member.address)})
                ],
                deployer.address
            ),
        ]);

        assertEquals(block.height, 3);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);
    },
});

Clarinet.test({
    name: "upgrade-contract_is-disassemble-first-element_deployer_firstElement_false",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                member.address
            ),
        ]);

        const token_id = block.receipts[0].events[0]['nft_mint_event']['value'];

        block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                IS_DISASSEMBLE_GET_FIRST_ELEMENT,
                [
                    types.tuple({'token-id':token_id, 'member':types.principal(member.address)})
                ],
                deployer.address
            ),
        ]);

        assertEquals(block.height, 3);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(false);
    },
});

Clarinet.test({
    name: "upgrade-contract_is-disassemble-first-element_deployer_notFirstElement_true",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';
        const degen2 = 'urlNiceDegen2';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                member.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(2)
                ],
                member.address
            ),
        ]);

        const token_id2 = block.receipts[1].events[0]['nft_mint_event']['value'];

        block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                IS_DISASSEMBLE_GET_FIRST_ELEMENT,
                [
                    types.tuple({'token-id':token_id2, 'member':types.principal(member.address)})
                ],
                deployer.address
            ),
        ]);

        assertEquals(block.height, 3);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);
    },
});


//pop-disassemble-work-queue
Clarinet.test({
    name: "upgrade-contract_pop-disassemble-work-queue_deployer_emptyQueue_true",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                POP_DISASSEMBLE_WORK_QUEUE,
                [
                ],
                deployer.address
            ),
        ]);

        //verify successful transaction
        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 2);
        block.receipts[1].result.expectOk().expectBool(true);

        const queue = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        //verify queue is indeed empty
        assertEquals(queue.result, `(ok [])`);
    },
});

Clarinet.test({
    name: "upgrade-contract_pop-disassemble-work-queue_deployer_singleElement_true",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                member.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                POP_DISASSEMBLE_WORK_QUEUE,
                [
                ],
                deployer.address
            ),
        ]);

        //verify successful transaction
        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 3);
        block.receipts[2].result.expectOk().expectBool(true);

        const queue = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        //verify queue remains empty
        assertEquals(queue.result, `(ok [])`);
    },
});

Clarinet.test({
    name: "upgrade-contract_pop-disassemble-work-queue_deployer_multipleElements_true",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';
        const degen2 = 'urlNiceDegen2';

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                member.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(2)
                ],
                member.address
            ),
        ]);

        const token_id2 = block.receipts[1].events[0]['nft_mint_event']['value'];

        block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                POP_DISASSEMBLE_WORK_QUEUE,
                [
                ],
                deployer.address
            ),
        ]);

        //verify successful transaction
        assertEquals(block.height, 3);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        //verfiy head of queue is the second added element
        assertEquals(
            queue_head.result,
            `(ok (some {member: ${member.address}, token-id: ${token_id2}}))`
        );
    },
});


//disassemble-finalize
Clarinet.test({
    name: "upgrade-contract_disassemble-finalize_address_error",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const url = 'urlNiceDegen';
        const background_name = "DarkPurple";
        const body_name = "BentleyBlack";
        const rim_name = "ClassyCream";
        const head_name = "Miami_Syringe_Cigar";

        let block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                DISASSEMBLE_FINALIZE,
                [
                    types.uint(1),
                    types.principal(member.address),
                    types.ascii(background_name),
                    types.ascii(body_name),
                    types.ascii(rim_name),
                    types.ascii(head_name)
                ],
                member.address
            ),
        ]);

        // console.log(`block `, block);

        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectErr().expectUint(ERR_INVALID);
    },
});

Clarinet.test({
    name: "upgrade-contract_disassemble-finalize_deployer_tokenNotHeadQueue_error",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const url = 'urlNiceDegen';
        const background_name = "DarkPurple";
        const body_name = "BentleyBlack";
        const rim_name = "ClassyCream";
        const head_name = "Miami_Syringe_Cigar";

        let block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                DISASSEMBLE_FINALIZE,
                [
                    types.uint(1),
                    types.principal(member.address),
                    types.ascii(background_name),
                    types.ascii(body_name),
                    types.ascii(rim_name),
                    types.ascii(head_name)
                ],
                deployer.address
            ),
        ]);

        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectErr().expectUint(ERR_INVALID);
    },
});

Clarinet.test({
    name: "upgrade-contract_disassemble-finalize_deployer_tokenHeadQueue_ok",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const member = accounts.get('wallet_1')!;
        const degen1 = 'urlNiceDegen1';
        const degen2 = 'urlNiceDegen2';
        const background_name = "DarkPurple";
        const car_name = "BentleyBlack";
        const rim_name = "ClassyCream";
        const head_name = "Miami_Syringe_Cigar";

        let block = chain.mineBlock([
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URI,
                [
                    types.principal(member.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            //add token in queue for disassembling
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(1)
                ],
                member.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                ADD_DISASSEMBLE_WORK_IN_QUEUE,
                [
                    types.uint(2)
                ],
                member.address
            ),
            Tx.contractCall(
                CONTRACT_NAME,
                DISASSEMBLE_FINALIZE,
                [
                    types.uint(1),
                    types.principal(member.address),
                    types.ascii(background_name),
                    types.ascii(car_name),
                    types.ascii(rim_name),
                    types.ascii(head_name)
                ],
                deployer.address
            ),
        ]);

        // console.log(`block `, block);
        // console.log(`eventsmint `, block.receipts[0].events);
        // console.log(`eventsadd `, block.receipts[1].events);
        // console.log(`events-disassemble `, block.receipts[2].events);

        const token_id2 = block.receipts[1].events[0]['nft_mint_event']['value'];

        assertEquals(block.height, 2);
        assertEquals(block.receipts.length, 5);
        block.receipts[4].result.expectOk().expectBool(true);

        const background_id = block.receipts[4].events[0]['nft_mint_event']['value'].split('u')[1];
        const car_id = block.receipts[4].events[1]['nft_mint_event']['value'].split('u')[1];
        const rim_id = block.receipts[4].events[2]['nft_mint_event']['value'].split('u')[1];
        const head_id = block.receipts[4].events[3]['nft_mint_event']['value'].split('u')[1];

        assertEquals(block.receipts[4].events[0]['nft_mint_event']['recipient'], member.address);
        assertEquals(block.receipts[4].events[1]['nft_mint_event']['recipient'], member.address);
        assertEquals(block.receipts[4].events[2]['nft_mint_event']['recipient'], member.address);
        assertEquals(block.receipts[4].events[3]['nft_mint_event']['recipient'], member.address);

        const background_owner = chain.callReadOnlyFn(
            BACKGROUND_CONTRACT,
            COMPONENT_GET_OWNER,
            [
                types.uint(background_id)
            ],
            deployer.address
        );

        const body_owner = chain.callReadOnlyFn(
            CAR_CONTRACT,
            COMPONENT_GET_OWNER,
            [
                types.uint(car_id)
            ],
            deployer.address
        );

        const rim_owner = chain.callReadOnlyFn(
            RIM_CONTRACT,
            COMPONENT_GET_OWNER,
            [
                types.uint(rim_id)
            ],
            deployer.address
        );

        const head_owner = chain.callReadOnlyFn(
            HEAD_CONTRACT,
            COMPONENT_GET_OWNER,
            [
                types.uint(head_id)
            ],
            deployer.address
        );

        assertEquals(background_owner.result, `(ok (some ${member.address}))`);
        assertEquals(body_owner.result, `(ok (some ${member.address}))`);
        assertEquals(rim_owner.result, `(ok (some ${member.address}))`);
        assertEquals(head_owner.result, `(ok (some ${member.address}))`);

        const queue_head = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_DISASSEMBLE_HEAD_WORK_QUEUE,
            [
            ],
            deployer.address
        );

        //verfiy head of queue is the second added element
        assertEquals(
            queue_head.result,
            `(ok (some {member: ${member.address}, token-id: ${token_id2}}))`
        );
    },
});