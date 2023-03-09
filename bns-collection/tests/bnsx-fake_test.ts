import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.4.2/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: 'Set primary name for deployer to btc namespace',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const name = 'deployer';
    const namespace = 'btc';
    const tx = [
      types.principal(deployer.address),
      types.tuple({
        name: types.buff(name),
        namespace: types.buff(namespace),
      }),
    ];

    let block = chain.mineBlock([
      Tx.contractCall(
        'bnsx-fake',
        'set-primary-name',
        [types.principal(deployer.address), types.tuple({ name: types.buff(name), namespace: types.buff(namespace) })],
        deployer.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    console.log(block.receipts[0].result);
    block.receipts[0].result.expectOk().expectBool(true);

    let call = chain.callReadOnlyFn(
      'bnsx-fake',
      'get-primary-name',
      [types.principal(deployer.address)],
      deployer.address
    );
    let response = call.result.expectSome().expectTuple();
    console.log('this is ' + response);
    response['name'].expectBuff(name);
    response['namespace'].expectBuff(namespace);
  },
});
