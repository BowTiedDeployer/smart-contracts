import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.2.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

const CONVERT_CONTRACT = 'conversions';
const BUFF_TO_UINT8 = 'buff-to-u8';
const UINT8_TO_ASCII = 'uint-to-ascii';
const BUFF_TO_ASCII = 'buff-to-ascii';
const UINT_TO_STRING = 'uint-to-string';
const CONVERT_WORD_HEX_TO_ASCII = 'convert-word-hex-to-ascii';
const CONCAT_NAME = 'concat-name';
const RESOLVE_PRINCIPAL_TO_ASCII = 'resolve-principal-to-ascii';

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

// (define-read-only (convert-word-hex-to-ascii (byte (buff 20)))

// ;; from base 16 to base 10
// (define-read-only (buff-to-u8 (byte (buff 1))) ;; buff = 1 byte = 2 hex characters
// Clarinet.test({
//   name: 'Ensure that converts right evey buff to uint',
//   async fn(chain: Chain, accounts: Map<string, Account>) {
//     const deployer = accounts.get('deployer')!;
//     for (let i = 1; i < 255; i++) {
//       // TODO: convert int to hex equivalent like 0x+int
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
  name: 'Ensure that converts right evey buff to string-ascii',
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
  name: 'Ensure that converts any uint used to string',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    for (let i = 1; i < 420; i++) {
      // 420 nfts, needs the convertion till 420
      assertEquals(
        chain.callReadOnlyFn(CONVERT_CONTRACT, UINT_TO_STRING, [types.uint(i)], deployer.address).result,
        `"${i}"`
      );
    }
  },
});

Clarinet.test({
  name: 'Ensure that converts word from hex to ascii using concat-string',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    assertEquals(
      chain.callReadOnlyFn(
        CONVERT_CONTRACT,
        CONVERT_WORD_HEX_TO_ASCII,
        [types.buff('abcdefghijklmn')],
        deployer.address
      ).result,
      '"abcdefghijklmn"'
    );
    assertEquals(
      chain.callReadOnlyFn(CONVERT_CONTRACT, CONVERT_WORD_HEX_TO_ASCII, [types.buff('opqrstuvwxyz')], deployer.address)
        .result,
      '"opqrstuvwxyz"'
    );
  },
});

Clarinet.test({
  name: 'Ensure that concat names works as expected',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    assertEquals(
      chain.callReadOnlyFn(
        CONVERT_CONTRACT,
        CONCAT_NAME,
        // [types.buff('abcdefghijklmn, opqrstuvwxyz')],
        [types.buff('bowtieddeployer'), types.buff('btc')],
        deployer.address
      ).result,
      '"bowtieddeployer.btc"'
    );
    assertEquals(
      chain.callReadOnlyFn(
        CONVERT_CONTRACT,
        CONCAT_NAME,
        // [types.buff('abcdefghijklmn, opqrstuvwxyz')],
        [types.buff('abcdefghijklmnopqrst'), types.buff('uvwxyz123')],
        deployer.address
      ).result,
      '"abcdefghijklmnopqrst.uvwxyz123"'
    );
    assertEquals(
      chain.callReadOnlyFn(
        CONVERT_CONTRACT,
        CONCAT_NAME,
        // [types.buff('abcdefghijklmn, opqrstuvwxyz')],
        [types.buff('bowtieddeployer'), types.buff('id')],
        deployer.address
      ).result,
      '"bowtieddeployer.id"'
    );
  },
});

Clarinet.test({
  name: 'Ensure that resolve-principal to ascii works as expected',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    // less than 20 characters name, 10 characters namespace
    assertEquals(
      chain
        .callReadOnlyFn(
          CONVERT_CONTRACT,
          RESOLVE_PRINCIPAL_TO_ASCII,
          [types.tuple({ name: types.buff('bowtieddeployer'), namespace: types.buff('btc') })],
          deployer.address
        )
        .result.expectOk(),
      '"bowtieddeployer.btc"'
    );
    assertEquals(
      chain
        .callReadOnlyFn(
          CONVERT_CONTRACT,
          RESOLVE_PRINCIPAL_TO_ASCII,
          [types.tuple({ name: types.buff('abcdefghijklmnopqrst'), namespace: types.buff('uvwxyz123') })],
          deployer.address
        )
        .result.expectOk(),
      '"abcdefghijklmnopqrst.uvwxyz123"'
    );
    assertEquals(
      chain
        .callReadOnlyFn(
          CONVERT_CONTRACT,
          RESOLVE_PRINCIPAL_TO_ASCII,
          [types.tuple({ name: types.buff('bowtieddeployer'), namespace: types.buff('id') })],
          deployer.address
        )
        .result.expectOk(),
      '"bowtieddeployer.id"'
    );
  },
});
