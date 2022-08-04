

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
const DEGEN_NFT_CONTRACT = 'degen-nft';
const DEGEN_NFT_MINT_URL = 'mint-url';

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
        const url = 'urlNiceDegen'

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
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
        const url = 'urlNiceDegen'

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
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

        console.log(`block `, block);
        console.log(`eventsmint `, block.receipts[0].events);
        console.log(`eventsadd `, block.receipts[1].events);

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
        const url = 'urlNiceDegen'

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
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
        const url = 'urlNiceDegen'

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
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
        const url = 'urlNiceDegen'

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
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
        const url = 'urlNiceDegen'

        let block = chain.mineBlock([
            //mint degen for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
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
        const degen1 = 'urlNiceDegen1'
        const degen2 = 'urlNiceDegen2'
        const degen3 = 'urlNiceDegen3'
        const degen4 = 'urlNiceDegen4'
        const degen5 = 'urlNiceDegen5'
        const degen6 = 'urlNiceDegen6'


        let block_mint = chain.mineBlock([
            //mint degens for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(receiver.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(receiver.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(receiver.address),
                    types.ascii(degen3)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(receiver.address),
                    types.ascii(degen4)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(receiver.address),
                    types.ascii(degen5)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
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

        // console.log(`blockmint `, block_mint);
        // console.log(`eventsmint `, block_mint.receipts[0].events);
        // console.log(`block `, block_disassemble);
        // console.log(`eventsadd `, block_disassemble.receipts[0].events);
        // console.log(`eventsadd `, block_disassemble.receipts[4].events);
        // console.log(`eventsadd `, block_disassemble.receipts[5].events);
        
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
        const degen1 = 'urlNiceDegen1'
        const degen2 = 'urlNiceDegen2'
        const degen3 = 'urlNiceDegen3'
        const degen4 = 'urlNiceDegen4'
        const degen5 = 'urlNiceDegen5'
        const degen6 = 'urlNiceDegen6'


        let block_mint = chain.mineBlock([
            //mint degens for address of receiver
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(deployer.address),
                    types.ascii(degen1)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(deployer.address),
                    types.ascii(degen2)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(deployer.address),
                    types.ascii(degen3)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(deployer.address),
                    types.ascii(degen4)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
                [
                    types.principal(deployer.address),
                    types.ascii(degen5)
                ],
                deployer.address
            ),
            Tx.contractCall(
                DEGEN_NFT_CONTRACT,
                DEGEN_NFT_MINT_URL,
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

        // console.log(`blockmint `, block_mint);
        // console.log(`eventsmint `, block_mint.receipts[0].events);
        // console.log(`block `, block_disassemble);
        // console.log(`eventsadd `, block_disassemble.receipts[0].events);
        // console.log(`eventsadd `, block_disassemble.receipts[4].events);
        // console.log(`eventsadd `, block_disassemble.receipts[5].events);
        
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
