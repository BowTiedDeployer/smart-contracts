import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.31.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

const CONTRACT_NAME = 'vrf-in-depth';
const SET_BLOCK_HEIGHT = 'set-block-height-id';
const GET_BLOCK_HEIGHT = 'get-block-height-id';
const GET_VRF_SEED = 'get-vrf-seed-id';

Clarinet.test({
  name: 'Ensure that vrf works after one block',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    let block = chain.mineBlock([Tx.contractCall(CONTRACT_NAME, SET_BLOCK_HEIGHT, [types.uint(1)], deployer.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    let vrf_seed = chain.callReadOnlyFn(CONTRACT_NAME, GET_VRF_SEED, [types.uint(1)], deployer.address);
    vrf_seed.result.expectOk().expectNone();
    block = chain.mineBlock([]);
    assertEquals(block.receipts.length, 0);
    assertEquals(block.height, 3);
    vrf_seed = chain.callReadOnlyFn(CONTRACT_NAME, GET_VRF_SEED, [types.uint(1)], deployer.address);
    assertEquals(
      vrf_seed.result.expectOk().expectSome(),
      '0x18539e8755a439d1c4a09c77f6f4bb48c233edcb6938052b680a338d62e2e6f2'
    );
  },
});
