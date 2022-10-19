import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.31.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

const CONVERT_CONTRACT = 'conversions';
const BUFF_TO_UINT8 = 'buff-to-u8';
const UINT8_TO_ASCII = 'uint-to-ascii';
const BUFF_TO_ASCII = 'buff-to-ascii';
const CONCAT_STRING = 'concat-string';
const CONVERT_WORD_HEXA_TO_ASCII = 'convert-word-hexa-to-ascii';

Clarinet.test({
  name: 'Ensure that <...>',
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

// (define-private (concat-string (a (string-ascii 20)) (b (string-ascii 20)))

// (define-read-only (convert-word-hexa-to-ascii (byte (buff 20)))

// ;; from base 16 to base 10
// (define-read-only (buff-to-u8 (byte (buff 1))) ;; buff = 1 byte = 2 hex characters
// Clarinet.test({
//   name: 'Ensure that converts right evey buff to uint',
//   async fn(chain: Chain, accounts: Map<string, Account>) {
//     const deployer = accounts.get('deployer')!;
//     for (let i = 1; i < 255; i++) {
//       // TODO: convert int to hexa equivalent like 0x+int
//       console.log(parseInt('0x' + i.toString(16)));
//       const buffy = types.buff(i.toString(16));
//       console.log(buffy);
//       console.log(
//         chain.callReadOnlyFn(CONVERT_CONTRACT, BUFF_TO_UINT8, [buffy], deployer.address)
//         // .result.expectSome()
//         // .expectUint(3);
//       );
//     }
//   },
// });
Clarinet.test({
  name: 'Ensure that converts right evey buff to uint',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    // for (let i = 0; i < 255; i++) {
    //   const buffy = ('0' + i).slice(-2);
    //   console.log(buffy);
    //   console.log(
    //     chain.callReadOnlyFn(CONVERT_CONTRACT, BUFF_TO_UINT8, [buffy], deployer.address)
    //     // .result.expectSome()
    //     // .expectUint(3);
    //   );
    // }
    // console.log('char code ', types.buff((0).toString(16)));
  },
});

// ;; from base 10 to string-ascii
// (define-read-only (uint-to-ascii (index uint))
Clarinet.test({
  name: 'Ensure that converts right evey uint to ascii',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const ascii_codes =
      '                                             -  0123456789       ABCDEFGHIJKLMNOPQRSTUVWXYZ    _ abcdefghijklmnopqrstuvwxyz    ';
    for (let i = 0; i < 123; i++) {
      const buffy = types.uint(i);
      assertEquals(
        chain.callReadOnlyFn(CONVERT_CONTRACT, UINT8_TO_ASCII, [types.uint(i)], deployer.address).result,
        `"${ascii_codes[i]}"`
      );
    }
  },
});

// ;; from base 16 to string-ascii
// (define-read-only (buff-to-ascii (byte (buff 1)))
Clarinet.test({
  name: 'Ensure that converts right evey base 16 to string-ascii',
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
