
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.31.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

const CONTRACT_NAME = 'backgrounds';
const MINT_URL_FNC = 'mint-url';
const GET_TOKEN_URI = 'get-token-uri';
const ERR_OWNER_ONLY = `(err ${types.uint(100)})`;
const URL_NO_LINK = 'no-link';

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

Clarinet.test({
    name: 'Ensure that owner can mint a custom url background for himself and others',
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet_1 = accounts.get('wallet_1')!;
        const url = 'custom-url-link';
        // console.log(deployer)
        
        // general: mine two transactions in a block
        // exactly: mint url function for two addresses by the contract owner wallet
        let block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                MINT_URL_FNC,
                [
                    types.principal(deployer.address),
                    types.ascii(url)
                ],
                deployer.address
            ),Tx.contractCall(
                CONTRACT_NAME,
                MINT_URL_FNC,
                [
                    types.principal(wallet_1.address),
                    types.ascii(url)
                ],
                deployer.address
            ),
        ]);
        // verify that the results of the transactions is as expected
        block.receipts[0].result.expectOk().expectBool(true);
        block.receipts[1].result.expectOk().expectBool(true);
        // console.log(`block `, block)

        // call the read-only funcitons to get the uri of the specific nfts minted and check if the link is as expected
        const tx = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_TOKEN_URI,
            [
                types.uint(1),
            ],
            deployer.address
        );
        // console.log(`tx `, tx);
        assertEquals(
            tx.result,
            `(ok (some "${url}"))`
        )
        const tx2 = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_TOKEN_URI,
            [
                types.uint(2),
            ],
            deployer.address
        );
        // console.log(`tx2 `, tx2);
        assertEquals(
            tx2.result,
            `(ok (some "${url}"))`
        )
    }
})


Clarinet.test({
    name: 'Ensure that other addresses than the owner cannot mint a custom url background',
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const wallet_1 = accounts.get('wallet_1')!;
        const wallet_2 = accounts.get('wallet_2')!;
        const url = 'custom-url-link';
        // console.log(deployer)
        
        // calls mint url function and checks if it throws the error for not having the contract owner address when calling
        let block = chain.mineBlock([
            Tx.contractCall(
                CONTRACT_NAME,
                MINT_URL_FNC,
                [
                    types.principal(wallet_1.address),
                    types.ascii(url)
                ],
                wallet_1.address
            ),
        ]);
        assertEquals(block.receipts[0].result, '(err u100)');
        // console.log(`block `, block.receipts[0].result);
        

        const tx = chain.callReadOnlyFn(
            CONTRACT_NAME,
            GET_TOKEN_URI,
            [
                types.uint(1),
            ],
            wallet_1.address
        );
        // console.log(`tx `, tx);
        assertEquals(
            tx.result,
            `(ok (some "${URL_NO_LINK}"))`
        )
    }
})

