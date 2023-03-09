;;
;; BITCOIN DEGENS
;; powered by STACKS DEGENS
;;

(impl-trait .nft-trait.nft-trait)

(define-non-fungible-token bitcoin-degen uint)

;; define errors
(define-constant err-owner-only (err u100))
(define-constant err-no-rights (err u101))

(define-constant err-bns-convert (err u200))
(define-constant err-bnsx-convert (err u201))
(define-constant err-bns-size (err u202))

(define-constant err-mint-disabled (err u300))
(define-constant err-whitelist-only (err u301))
(define-constant err-full-mint-reached (err u302))

;; price 69 stx
(define-constant price u69000000)
(define-constant total-amount u1000)

;; define variables
;; Store the last issues token ID
(define-data-var last-id uint u0)
(define-data-var contract-owner principal tx-sender)
(define-data-var mint-enabled bool true)
(define-data-var only-whitelisted bool false)
(define-data-var uri-root (string-ascii 80) "https://stacksdegens.com/bitcoin-degens/jsons/")

;; define maps
;; for each id keep in the map the name of the bns his owner has ( if one is present )
(define-map degen-name uint (string-ascii 30))

;; whitelist system
;; every address has a number of whitelist spots
(define-map whitelist-spots principal uint)

;; whitelist functions
;; set the whitelist addresses and number of whitelists directly in the smart contract

(define-read-only (is-mint-enabled) 
  (var-get mint-enabled))

(define-read-only (is-whitelist-enabled) 
  (var-get only-whitelisted))

(define-public (set-mint-enabler (bool-value bool))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (ok (var-set mint-enabled bool-value))))

(define-read-only (is-whitelisted (address principal)) 
  (let ((spots (map-get? whitelist-spots address))) 
    (if (and (is-some spots) (> (unwrap-panic spots) u0))  true false )))

(define-private (can-mint-and-update-spots (address principal)) 
  (if (is-eq false (var-get only-whitelisted)) 
    (ok true)
    (if (is-eq true (is-whitelisted address)) 
      (begin
        (map-set whitelist-spots address (- (unwrap-panic (map-get? whitelist-spots address)) u1))
        (ok true))
      (ok false))))

;; if address does not have map-get or is 0 => no whitelist spot allocated
(define-read-only (get-whitelist-spots (address principal)) 
  (map-get? whitelist-spots address))

;; only contract owner can set whitelist
(define-public (set-whitelist-spots (address principal) (spots uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (ok (map-set whitelist-spots address spots))))

;; convert to string-ascii version the buff[] of name and namecheap
(define-read-only (get-address-bns-name (bns {name: (buff 20), namespace: (buff 9)}))
  (unwrap-panic (contract-call? .conversions resolve-principal-to-ascii bns)))

;; SIP009: Transfer token to a specified principal
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-no-rights)
    ;; SP000000000000000000002Q6VF78.bns
    (let ((address-bns-name (contract-call? .bns resolve-principal recipient)) 
      ;; SP1JTCR202ECC6333N7ZXD7MK7E3ZTEEE1MJ73C60.bnsx-registry
      (address-bnsx-name (contract-call? .bnsx-fake get-primary-name recipient)))
      (if (not (is-err address-bns-name))  
        (let 
          ((complete-bns-name (unwrap! address-bns-name err-bns-convert))
            (bns-name (as-max-len? (get name complete-bns-name) u20))
            (bns-namespace (as-max-len? (get namespace complete-bns-name) u9)))
          (if (and (is-some bns-name)  (is-some bns-namespace)) 
            ;; bns address respects the criterias
            (set-nft-name token-id 
              (get-address-bns-name 
                {name: (unwrap-panic bns-name),
                namespace: (unwrap-panic bns-namespace)}))
            (set-nft-name token-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string token-id)))))
        (if (is-some address-bnsx-name) 
          (let 
            ((complete-bnsx-name (unwrap! address-bnsx-name err-bnsx-convert))
              (bnsx-name (as-max-len? (get name complete-bnsx-name) u20))
              (bnsx-namespace (as-max-len? (get namespace complete-bnsx-name) u9)))
            (if (and (is-some bnsx-name)  (is-some bnsx-namespace)) 
              ;; bnsx address respects the criterias
              (set-nft-name token-id 
                (get-address-bns-name 
                  {name: (unwrap-panic bnsx-name),
                  namespace: (unwrap-panic bnsx-namespace)}))
              (set-nft-name token-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string token-id)))))
          ;; does not have bns address
          (set-nft-name token-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string token-id)))))
    (nft-transfer? bitcoin-degen token-id sender recipient))))

(define-public (transfer-memo (token-id uint) (sender principal) (recipient principal) (memo (buff 34)))
  (begin 
    (try! (transfer token-id sender recipient))
    (print memo)
    (ok true)))

;; SIP009: Get the owner of the specified token ID
(define-read-only (get-owner (token-id uint))
  ;; Make sure to replace bitcoin-degen
  (ok (nft-get-owner? bitcoin-degen token-id)))

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-id)))

;; SIP009: Get the token URI. You can set it to any other URI
(define-read-only (get-token-uri (token-id uint))
  (ok (some (concat (concat (var-get uri-root) "$TOKEN_ID") ".json"))))


;; Internal - Mint new NFT
(define-private (mint (new-owner principal))
  (begin 
    (asserts! (var-get mint-enabled) err-mint-disabled)
    (let 
      ((next-id (+ u1 (var-get last-id)))
        ;; SP000000000000000000002Q6VF78.bns
        (address-bns-name (contract-call? .bns resolve-principal new-owner))
        ;; SP1JTCR202ECC6333N7ZXD7MK7E3ZTEEE1MJ73C60.bnsx-registry
        (address-bnsx-name (contract-call? .bnsx-fake get-primary-name new-owner))) 
      (asserts! (<= next-id total-amount) err-full-mint-reached)
      (if (not (is-err address-bns-name))  
        (let 
          ((complete-bns-name (unwrap! address-bns-name err-bns-convert))
            (bns-name (as-max-len? (get name complete-bns-name) u20))
            (bns-namespace (as-max-len? (get namespace complete-bns-name) u9)))
          (if (and (is-some bns-name)  (is-some bns-namespace)) 
            ;; bns address respects the criterias
            (set-nft-name next-id 
              (get-address-bns-name 
                {name: (unwrap-panic bns-name),
                namespace: (unwrap-panic bns-namespace)}))
            (set-nft-name next-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string next-id)))))
        (if (is-some address-bnsx-name) 
          (let 
            ((complete-bnsx-name (unwrap! address-bnsx-name err-bnsx-convert))
              (bnsx-name (as-max-len? (get name complete-bnsx-name) u20))
              (bnsx-namespace (as-max-len? (get namespace complete-bnsx-name) u9)))
            (if (and (is-some bnsx-name)  (is-some bnsx-namespace)) 
              ;; bnsx address respects the criterias
              (set-nft-name next-id 
                (get-address-bns-name 
                  {name: (unwrap-panic bnsx-name),
                  namespace: (unwrap-panic bnsx-namespace)}))
              (set-nft-name next-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string next-id)))))
          ;; does not have bns address
          (set-nft-name next-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string next-id)))))
      (var-set last-id next-id)
      (nft-mint? bitcoin-degen next-id new-owner))))

(define-read-only (get-nft-name (id uint)) 
  (map-get? degen-name id )) 


(define-read-only (get-contract-owner) 
  (var-get contract-owner))

(define-public (set-contract-owner (new-contract-owner principal)) 
  (begin 
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (ok (var-set contract-owner new-contract-owner))))

(define-read-only (get-batch-nft-name (token-id-list (list 50 uint))) 
  (map get-nft-name token-id-list))

(define-private (set-nft-name (id uint) (name (string-ascii 30)))
  (map-set degen-name id name))

(define-public (claim) 
  (begin    
    ;; verify can mint
    (asserts! (is-eq (can-mint-and-update-spots tx-sender) (ok true)) err-whitelist-only)
    (if (not (is-eq tx-sender (var-get contract-owner))) 
      (try! (stx-transfer? price tx-sender (var-get contract-owner)))
      false)
    (ok (try! (mint tx-sender)))))

(define-public (claim-5) 
  (begin 
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (ok (try! (claim)))))

(define-public (claim-10) 
  (begin 
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (ok (try! (claim)))))

;; Burn a token
(define-public (burn-token (token-id uint))
	(begin     
		(asserts! (is-eq (some tx-sender) (nft-get-owner? bitcoin-degen token-id)) err-no-rights)
		(nft-burn? bitcoin-degen token-id tx-sender)))

(define-public (set-only-whitelisted (value bool)) 
  (begin 
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (var-set only-whitelisted value)
    (ok value)))

;; whitelist instantiation
;; (map-set whitelist-spots 'SP398XE371G08T84A99TCBD8XKWY3S7VVX6JKJWKY u5)
;; (map-set whitelist-spots 'SPMN66053GAWH9EWEKWV9BVZ4HR3JEBN4HKGBWK8 u5)
;; (map-set whitelist-spots 'SP1DPNP3RRD6JG1557SP6JMX68W5BV6R2Z74BQEXV u5)
;; (map-set whitelist-spots 'SP3ADSJYZXJ6XNHCHZVWV5K5JJ2WCBK4NVCY8FWBR u5)
;; (map-set whitelist-spots 'SP3Z7511VWR5WG9J3MAKER3NRZYKWT83K2XTP36EV u5)
;; (map-set whitelist-spots 'SP3ARDZK04R2TYREPBDC1WFMFA38Y706G7D2EV149 u5)
;; (map-set whitelist-spots 'SP3AZD0R8FW6XWTHZRY06KCJ5MHRAVJGMH6QTT4YP u5)
;; (map-set whitelist-spots 'SP3XJTH5TJ3PEE67T02AA4DSBC89A80S028SQS769 u5)
;; (map-set whitelist-spots 'SP3X9696B2ZKFMBHEJF1RBWMYDQ2YGXDA11GFYTE5 u5)
;; (map-set whitelist-spots 'SPM1Q7YG18378H6W254YN8PABEVRPT38ZCY01SJD u5)
;; (map-set whitelist-spots 'SP3X4PH6ZSHJ2T3E360AD5K91QJX6CJS2QM8ZF0XA u5)
;; (map-set whitelist-spots 'SP3CV98G6W9B2NPDX3XT7V96BBYKKJ004GYSJAFY0 u5)
;; (map-set whitelist-spots 'SP1E4798MP7RNHPVSBM954MSS5EJNM1AC3R53DC31 u5)
;; (map-set whitelist-spots 'SP3D5EHK8SMJ3MMJWYCAKWJ2H4F1JQX85E33ZJDB9 u5)
;; (map-set whitelist-spots 'SP3D5KMRB3YMJM4R2Q8YDN3XQ82KXGMACDVRT9MV2 u5)
;; (map-set whitelist-spots 'SP1E57Z5HCWT49K63MA6KJRPAWNEPWJ7EEC964H3T u5)
;; (map-set whitelist-spots 'SP3E8K8333G3QCEXWZBMCKJDFXSQJGD2E749BM4PQ u5)
;; (map-set whitelist-spots 'SP3EPS563XJNK170J902C78ZPDPNXVZFWWCN7DGWH u5)
;; (map-set whitelist-spots 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE u5)
;; (map-set whitelist-spots 'SP3FQA6S5WF255DC67DY85Y6H5FFPWNBSQRK0W7Y4 u5)
;; (map-set whitelist-spots 'SP3VCX5NFQ8VCHFS9M6N40ZJNVTRT4HZ62WFH5C4Q u5)
;; (map-set whitelist-spots 'SP1E7DEJG95E0EBZFFGEFGE0QX6Y0CR5V79615FB2 u5)
;; (map-set whitelist-spots 'SP3GE39H9Q9SRZEGM8DQVR0Q01NKY2YD8TG7GKX1K u5)
;; (map-set whitelist-spots 'SP3GRJ1FJT7QC7N51PQGR6PZXMXZH5SKQ8B4JRW1D u5)
;; (map-set whitelist-spots 'SP3GT6YMNTGNZ50RBFAPR5WWJMQ2XKJCJAY6KQTFD u5)
;; (map-set whitelist-spots 'SP3H2JP9T026CVK8FFE8THYQBA0DVPQN48RXJ7SRT u5)
;; (map-set whitelist-spots 'SP3V8TCVWMY9BP0Z3D2JEMMMASMSBSM317E02X8WY u5)
;; (map-set whitelist-spots 'SP3TZ3BCB16A0W0PPFYMGTTWTT3DVWTQEP8DFRAG1 u5)
;; (map-set whitelist-spots 'SP3J0Z8YSJD20TGEBE6M992CWFDG18VB0PR599VY9 u5)
;; (map-set whitelist-spots 'SP3TYACVPAPXP7Q0QTQQRSW8Q67VECJQ536MGKNWT u5)
;; (map-set whitelist-spots 'SP3JD4KSXYDSQQS9T43JSGAWTFKE7QH7CA2CEDWP u5)
;; (map-set whitelist-spots 'SP3JKZ87BZ1C11M7HJ22ZEDXFP7KCXMDWQGTKGAWM u5)
;; (map-set whitelist-spots 'SP3JMPP4S5CZBC68XEV2DPWEFTXHDFFHQYJXHM119 u5)
;; (map-set whitelist-spots 'SP3JPZ24AT6QHPY40Z1V9P4HYH1PNHBWKGJMKG6F1 u5)
;; (map-set whitelist-spots 'SP3K142VCVFHD38X6HBZGBY3NJXHWYE087SNQPQ59 u5)
;; (map-set whitelist-spots 'SPKDKYWGT1P3DHYVRMAB9T7EZVY7KGN8JTWKED08 u5)
;; (map-set whitelist-spots 'SPXXVB57WQJ8MVTAGXH0CE75DGMWV513Q8KB35BC u5)
;; (map-set whitelist-spots 'SP3KZ1XDJT57BK81JWX1VFT3V70DYSZA8SQYQPAK u5)
;; (map-set whitelist-spots 'SP3M5HQJH19J6AKFME7N5BN3NWBXQGBVXKXS5WPRF u5)
;; (map-set whitelist-spots 'SP3TF26QFS3YMYHC9N3ZZTZQKCM4AFYMVW1WMFRTT u5)
;; (map-set whitelist-spots 'SP1FV3SN48RVHHQF7456N62G5NW768B8YM44M3AV1 u5)
;; (map-set whitelist-spots 'SP3S0KVK1YNQ2WDN9WMFDJ3VZZVBMNAWK033ZBGX u5)
;; (map-set whitelist-spots 'SP1FXCKY6E03H7HYKWX8Z0DGJ54YDK5CQH1EDSAJM u5)
;; (map-set whitelist-spots 'SP3R8C0JYZP1ET9VCQMK393YWHY4Z8EG6XPSCFHJE u5)
;; (map-set whitelist-spots 'SP3P1TCXN3FP3V79YWXC49F5X2HYKS39CMCP5FEHN u5)
;; (map-set whitelist-spots 'SP3PZGB6ZXH1G9K158H56A6TF26X7K1GGMAGMW0M3 u5)
;; (map-set whitelist-spots 'SP06QC626XTXDQ2D6X6SV2E5SVMNKHNRHYSAMN4M u5)
;; (map-set whitelist-spots 'SPK0XHWF090MQP228C6Z24ZDQHEN88ZGEXK3RVM3 u5)
;; (map-set whitelist-spots 'SP3QQZQF09GA87CYRFZPZP13N9PCECWMHEACX44YJ u5)
;; (map-set whitelist-spots 'SPWKDKPZ3QDPQGDADWJ3EWPAP14CB1N1HDQ897W5 u5)
;; (map-set whitelist-spots 'SP3R4CT6FKSE76H0ZKNDHFP8XNARB53Z5JBRGQAVE u5)
;; (map-set whitelist-spots 'SP3R5TCK97NMBS1V1MARCK0YTDFWG1FKJ94EFQTF4 u5)
;; (map-set whitelist-spots 'SPJY0GQ2GZWVJ5PF92HRDC4X3KQG2Y0Q5NCCERAX u5)
;; (map-set whitelist-spots 'SP1H6SQ5825ZP4EYGA9Q79DYSZB46SB7T7CRMB4Q0 u5)
;; (map-set whitelist-spots 'SP1HRK5ZWS3DC0KVSKK7GF32KYJ0TGDE90KXDFC3H u5)
;; (map-set whitelist-spots 'SP1HRWQ1NB3QP80AWCSNFP7HV7MC9T0D85MTFXJRW u5)
;; (map-set whitelist-spots 'SP1J26MGNB0TEH4J6G2TVR5TKABDEWHW88SRE5QVQ u5)
;; (map-set whitelist-spots 'SP1J3ZEZ9SV6Y4BHQ5JAG2CT5F9EVPTZNF8MVCKJD u5)
;; (map-set whitelist-spots 'SP1J5W1FN3P80XV1YK14BKC6A912WWFGJSW9M92HA u5)
;; (map-set whitelist-spots 'SP1JT14AAXH7N3TYRX118GB7ZPMH4Q341TS0HM0VB u5)
;; (map-set whitelist-spots 'SPJT6K44GJG1QF2JN7TY19V5CB6N7E0P9AR0W1SQ u5)
;; (map-set whitelist-spots 'SPWGT7NX8AD9G1KA1TX07QRZST6GC85CMF3SBC7 u5)
;; (map-set whitelist-spots 'SPJSCF7CYKQETN42SXRTM7PT5MYCKQF7V8Z7XBX3 u5)
;; (map-set whitelist-spots 'SP1MHYF45ZRE9QCG4SRHB72W65K89Q48FSQR4PDNK u5)
;; (map-set whitelist-spots 'SP1MKKX1CDRYNRGSA1E1BE4C2Q63FK27K5ZWMATYE u5)
;; (map-set whitelist-spots 'SP1MKM54044H7323201NP14ZKX0AKJ1X8MQ1VM11Z u5)
;; (map-set whitelist-spots 'SPJG7KK60G45VG2M51JNHDHN2TWBCK45V9F8KAVH u5)
;; (map-set whitelist-spots 'SPHWY482ANTWNTW2618HYHQSDY1WCW7P20BW5F7Y u5)
;; (map-set whitelist-spots 'SP1NKZ6ZRRV56EBBP5MSQFBC6552REETXT7VZ0B5G u5)
;; (map-set whitelist-spots 'SP1NW8Q0CTAP9BDCBB0KWC1K5Q0W4JDDS674RGRCR u5)
;; (map-set whitelist-spots 'SPSX317MQWBPGD6PR343XEV09Y7X6M6DBPP2S1WK u5)
;; (map-set whitelist-spots 'SPHWCHVHRY2Q4884XNNSV8B3J1T41PBN0GQE16A9 u5)
;; (map-set whitelist-spots 'SP1PB8DM99TT12C76T1VEN6GM5ZK1NB7M45EM5WHX u5)
;; (map-set whitelist-spots 'SPHRYBJ1YQEA90HHN174SHSJCA53YVCRVWNSHQH5 u5)
;; (map-set whitelist-spots 'SP12E5REG9ZPB91V61A8V4P8XJ63EK3VT058YWZAS u5)
;; (map-set whitelist-spots 'SP1PPYF6ADS1BADN04X97TZV4ZCVD3BDKNFM446WA u5)
;; (map-set whitelist-spots 'SP1PWMYX45402ZTT5K9TJT1N6W0N3JC5YJ9CMSKG9 u5)
;; (map-set whitelist-spots 'SPHKPJXTXJ67E195R4Q7R5XWY4AJFNGW7300F5SP u5)
;; (map-set whitelist-spots 'SP1QJDCZ0J9NRPPPZ9186GGBFQZEZM86VKCE19D4T u5)
;; (map-set whitelist-spots 'SP1QRFVDS76WFV5XCDHAR7FQYTSNM4M1P4TGFZRK1 u5)
;; (map-set whitelist-spots 'SP1R5E7KH6TY435R20GQBJTCVPBEF61WXX62VQJ38 u5)
;; (map-set whitelist-spots 'SPG3303TZ19QMRYHT2QK87CHXWSDZXVG2M4RVKGB u5)
;; (map-set whitelist-spots 'SP1RW77610RHZ5FHBBCX37PXEG05C5T2BA7657WWM u5)
;; (map-set whitelist-spots 'SP1SBTRXDJP4N825PY69B1MKTQ4MSPB0DW9JCQHKE u5)
;; (map-set whitelist-spots 'SPFERFF3QKF0Q6WBC4Y2Y6RQWEGN3DTDD5Y7S0NY u5)
;; (map-set whitelist-spots 'SP1ST9NA85RZQX2D3P5VEXDKE9WXDZRGKHB88A5CF u5)
;; (map-set whitelist-spots 'SPF53R3X4MZ9QT394M31HA900GXHD7DC0WE4032N u5)
;; (map-set whitelist-spots 'SP1TXGE9FX8JG75QXGADJKSDQFENTVAMJ5JM6YD5G u5)
;; (map-set whitelist-spots 'SPS8DW12PFNR295A4FQV269HV1WT4VWXMVHMM5QM u5)
;; (map-set whitelist-spots 'SPEJ2JKG5SVZD793CEWFZQ0VDPEGZ6QVP39QFAHM u5)
;; (map-set whitelist-spots 'SP12VBET3KMFJN4KMGX76C8MR3QXDH0Z4WWMSZT6H u5)
;; (map-set whitelist-spots 'SP1XPCCJE4NR82X6D8PX32NF1KAYYM36B5T83J6GP u5)
;; (map-set whitelist-spots 'SP1XPG9QFX5M95G36SGN9R8YJ4KJ0JB7ZXNH892N6 u5)
;; (map-set whitelist-spots 'SP1Y60B0GCM1P040N7Y0QD9R93Y5EZRJ8YH2BV5NW u5)
;; (map-set whitelist-spots 'SP1YCKMYRQ38RX7ZXTMX9EZZWNGXJ1QB8A5YR9Z6Q u5)
;; (map-set whitelist-spots 'SP1YMHHM5HZEA7W4NQF2WK5SK79RAWNJEBRVYTRVF u5)
;; (map-set whitelist-spots 'SP1YT6QRRHPGJVDKQY89MSGGFHYAETD4FKVTBRH1P u5)
;; (map-set whitelist-spots 'SP1386044X5N01AJAGN50NGKE87K4Q72P7DHVXF3F u5)
;; (map-set whitelist-spots 'SP1ZZQN755ERF5S47XKQYTTRBKMT1K1QBR6S5MAA9 u5)
;; (map-set whitelist-spots 'SP13BWBVYRV8ARXPX0VMQ6VR5N671AASS4ZZZ2N6Y u5)
;; (map-set whitelist-spots 'SP208XD20NAHGXA2KE0442F9F03GY23MHEBC60C2K u5)
;; (map-set whitelist-spots 'SP212MTKCMQAAG4QNK83E9DX5HE9PHE0YBJ09SMT6 u5)
;; (map-set whitelist-spots 'SP214A1B3PWZBDARSHBAXNMX4F2WA4A4TCW66TEM6 u5)
;; (map-set whitelist-spots 'SP21665394YPPDZ40SMC8F6NX9R5KZKF0YSRFGX8C u5)
;; (map-set whitelist-spots 'SP216YJTD76S81ZXKVHEBTJT77PSVR33AZ57548V3 u5)
;; (map-set whitelist-spots 'SP21A89VNFKAHRFGN0KBXWC97T0EFKXWBH4MJP6MQ u5)
;; (map-set whitelist-spots 'SP13EZ58DXARG85WFX41KKSPZ9G8BTADRZCTZEZMM u5)
;; (map-set whitelist-spots 'SP21VSK5D238A9MJ61MC49RQKEJK9666ZXS5GNFAB u5)
;; (map-set whitelist-spots 'SPDAN38PRX7F4RZFQYSCZS3Y1QQZF1AG6B7YBVSM u5)
;; (map-set whitelist-spots 'SP22DYPXDN4KZBH2RNKC7ZK1XCPDGGE7CEACS0E81 u5)
;; (map-set whitelist-spots 'SP231B3BBKR4N70B4K3Y5FVHZ4QH8VG0FRENZ6MZF u5)
;; (map-set whitelist-spots 'SP2410YCCWEFF99XHCNGSBDC60WBWXFC8B5433C56 u5)
;; (map-set whitelist-spots 'SP24Q2ZEFZ07EBFN5N3T007D4GJKSG2JYZ0230CM1 u5)
;; (map-set whitelist-spots 'SPCJ0Y4B5314SVDVYV00024T1EBZ4N8HWD1169JH u5)
;; (map-set whitelist-spots 'SP25JVS4EYSAZAC64PCRWM29GM111F4RWA210DJ8J u5)
;; (map-set whitelist-spots 'SP25N1G801VAPDT2N8HEAS6XQN56C24AE63BE6NSE u5)
;; (map-set whitelist-spots 'SP14PFCYJ7MJ6W78WGAC14M8PTBCFJ8QSJP1RS44Q u5)
;; (map-set whitelist-spots 'SP26C9TWJYK6DTCD4T6HKBC76DPMK2DXXRNWS3E2D u5)
;; (map-set whitelist-spots 'SP26N3ZTBGGGPC0DYW9KF13KBNBWT3RK0X9CDF686 u5)
;; (map-set whitelist-spots 'SP26QVHEYMTX6MAZB46S1MG91ZYMVMPX0NYDFNSDR u5)
;; (map-set whitelist-spots 'SP26YMK7WF22147T2KFV55EY856Z67H855JZAJ7TM u5)
;; (map-set whitelist-spots 'SPCH9HWZJ73ZE9MY4A77YM5ABHG09RYCVEQZNK1W u5)
;; (map-set whitelist-spots 'SPB2VP5GVD980MERQS4J4H479RGKP1TKSF24BHTM u5)
;; (map-set whitelist-spots 'SP274C9SKTRQV06W86GVVC0MGSNJ1EMXYK8E46PXT u5)
;; (map-set whitelist-spots 'SP27E2CYZ9P9W6BWM5BSJS7TFSES4F232RB7NYM8A u5)
;; (map-set whitelist-spots 'SP27SD3H5TTZXPBFXHN1ZNMFJ3HNE2070QWHH3BXX u5)
;; (map-set whitelist-spots 'SP285SM64XFAC89A58TBVC7QNCES9B6KT5579HQF0 u5)
;; (map-set whitelist-spots 'SPRJQY3E6ZV9KG4HQW5HQAXK1NG5B2CW2PVFNEBZ u5)
;; (map-set whitelist-spots 'SP29SFB03X2KN1WG2WNJAXPQC57865FFDGN7W8XMM u5)
;; (map-set whitelist-spots 'SP29VWA66ZWAR1XQWYNDX9TJTYKFX1ER5MYEF4H4K u5)
;; (map-set whitelist-spots 'SP2A665S3H6FVMZSY4VJ17ESXX21CGS0A32984B1H u5)
;; (map-set whitelist-spots 'SP2ACM4ECBGRAPJH3Q86VAQ4YRBK5G1C7F4VYJ500 u5)
;; (map-set whitelist-spots 'SP2AY25VAR3TJFWEZFGG0KHPVE7WP0RWQYW5CJDW4 u5)
;; (map-set whitelist-spots 'SP16W3XFR4M82JYCZQJN2GDPG4MKNA8Q7R6R5GZFS u5)
;; (map-set whitelist-spots 'SP1003BKTJYFY7CZYBT8XY56VZMFTWH9P7HFC47PC u5)
;; (map-set whitelist-spots 'SP2BEFSB43KR4M6C9117SA2A6T4SA6H0X1XDZF716 u5)
;; (map-set whitelist-spots 'SP174VCG73VGZKW1TQ3ZDJQVDVT70S2XDHE4DE5B5 u5)
;; (map-set whitelist-spots 'SP17EV8YSY8MJ9J0ZDHVHXG5YKKX53Q2KKJD2YYX4 u5)
;; (map-set whitelist-spots 'SP2D79VQYTRYHCQZDV66Z8DG5PZJ6HMN7XRK2X6Q7 u5)
;; (map-set whitelist-spots 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0 u5)
;; (map-set whitelist-spots 'SP2DP1DV0R099CGRYZRAMV4GGXA14TXDW0BK3VMEA u5)
;; (map-set whitelist-spots 'SP2DSFDF1SR18ZKKBMST124Z0CPKBKXE6VG3PNR78 u5)
;; (map-set whitelist-spots 'SP2ERT3QFK9Y53R65RBSA9SXY6MDM1K44999XCS71 u5)
;; (map-set whitelist-spots 'SP10KJKG77CPDXRTG41ZRVDD24TDZX1P8GGQAFXP8 u5)
;; (map-set whitelist-spots 'SP17Z76Y7AEVDMV12RP6WC1CMG79M3ZA6R1J5EN4Z u5)
;; (map-set whitelist-spots 'SPAT6CDQN977Y6RC5M294GX63QQBSD8BMMX3DJZF u5)
;; (map-set whitelist-spots 'SP2FJ5TKSCAE1VEEJ8DT64FT2GQJAVVA8X9J1FWYD u5)
;; (map-set whitelist-spots 'SP2FXRX486F3F4S261YFYCNF9T8FAMSM7PKXN3PPR u5)
;; (map-set whitelist-spots 'SP2FYPZ8NX755K2HQF8M2M7N2EFMD65YZFFCZRYT4 u5)
;; (map-set whitelist-spots 'SP2G270MNWJQVT3R5HM25SFJTV7YDQXMSTFB36BTP u5)
;; (map-set whitelist-spots 'SP2GP6R0JZJ846506J5Z0XDM8YAXAZ7RQMR17SMK6 u5)
;; (map-set whitelist-spots 'SPR50TAVGFX778RNPK2H0AFHA8Z93NV8GH0Q8EZF u5)
;; (map-set whitelist-spots 'SPQY88E87FNMP1NTY2YQ7X5DPTVY810PS8T6D2Y3 u5)
;; (map-set whitelist-spots 'SP9J6BTSPCXGQ5HC066NRYQPK43S48V7K299PTQX u5)
;; (map-set whitelist-spots 'SP2M5YGRBM1WD9PNFCS0SX2S15PAVEGN9B8VAAR0J u5)
;; (map-set whitelist-spots 'SP2M601PTNWDAKNHA8RJ4KDCBKPYSHMMM5N30D65K u5)
;; (map-set whitelist-spots 'SP2M6Q8A9YKDRABAN5YY6ZHEN3PJ1PSGZ20AR9BSD u5)
;; (map-set whitelist-spots 'SP2MANB3ZJ6BE6QC6YK6A8ASMR5ADBSW4SWP066RZ u5)
;; (map-set whitelist-spots 'SP2MJ2T4H49B6ZCRFBGNTFBW8M0NDMF630SXN23FB u5)
;; (map-set whitelist-spots 'SP9EEKH01FDGCECXB649JB4T2Y8Q6CM5XYXFMTAD u5)
;; (map-set whitelist-spots 'SP2MQV129Z7CZASBDK8TDZ9MN87J6RNV7WY2FZ788 u5)
;; (map-set whitelist-spots 'SP2NR2625HB0YFFRFBD9VHVYESNY83VTMKZXMV6H0 u5)
;; (map-set whitelist-spots 'SP2NYHBSG5BTQQHJW7P7A6DK4A1ZXRJ5T7TWYAFJF u5)
;; (map-set whitelist-spots 'SP18D4EMA2SX9Y2926Q8NF1BE5WBPGT979M5DN298 u5)
;; (map-set whitelist-spots 'SP1934QK1ZXGCEBB3MN9Y0FNR20GMDWM3Y5P5VV5 u5)
;; (map-set whitelist-spots 'SP2QCE19FX7WEK90YC3HEYW5185T2C170QS31CN7F u5)
;; (map-set whitelist-spots 'SP2QDMH88MEZ8FFAYHW4B0BTXJRTHX8XBD54FE7HJ u5)
;; (map-set whitelist-spots 'SP2QP8258WH32PK7HH1DNNEYXMKVFXNR7W1409R4N u5)
;; (map-set whitelist-spots 'SP19CFFFPNJXXPEBPDJXKJJ2TQT11WEK1M5GJN5W7 u5)
;; (map-set whitelist-spots 'SP9748CXTYEWCSTAQRQ1KHDV08AC37JCNW95NKMJ u5)
;; (map-set whitelist-spots 'SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS u5)
;; (map-set whitelist-spots 'SP2RTH5XEXXPD0ZF639WAM43G6YV0PT31K2KEFM5W u5)
;; (map-set whitelist-spots 'SP2S0SYS1H48MW83690T5G5XVA5CYQYWYF55CRXRY u5)
;; (map-set whitelist-spots 'SP8YR0J11AF8SNKH8F28V1YWJKJRW8YAFP0NSYAY u5)
;; (map-set whitelist-spots 'SP2S65F2V0HGHXRSW1AFSB0C1R4ACWXP3363FJJ67 u5)
;; (map-set whitelist-spots 'SP2S872HVH23Q1M1VQ6Z55VM11V8Z7YG8V3TZTR96 u5)
;; (map-set whitelist-spots 'SP2SFZX1WJSKT1GA2STDT6E5NWDX44GW4BB8DW4DJ u5)
;; (map-set whitelist-spots 'SP8V4KVVN0H2Y483T8XAK74Y3K2EFA6FMMHAT9WC u5)
;; (map-set whitelist-spots 'SP2TGN9DJWTV02B9HRGX6Z43Y7052DTZW6FZVZH0S u5)
;; (map-set whitelist-spots 'SP2TZBMHPE6C37PAG6VPA1AGT310HCDGBF5GRCH6C u5)
;; (map-set whitelist-spots 'SP8PAXVRRJDS9VC1HT95EW451T17TP977JXK204S u5)
;; (map-set whitelist-spots 'SP2VG7S0R4Z8PYNYCAQ04HCBX1MH75VT11VXCWQ6G u5)
;; (map-set whitelist-spots 'SPZNABG4GB3Z62R66V08WDWSQ4KPYRQ6EENKCYP2 u5)
;; (map-set whitelist-spots 'SPQV5QCYKBGYG8AHB2ZPT5RJCWXNWSGMJKXYG5JK u5)
;; (map-set whitelist-spots 'SPQCAMFRAXV93WNZHWXSDHSZGZ72G9RJPHXQ8CXN u5)
;; (map-set whitelist-spots 'SP7SF84GQZVTS0HD33NKCHWNK2JSQHGKKN4F0VSX u5)
;; (map-set whitelist-spots 'SP2Y07HKV529M09HTD8N452RBW8ZYK3C0ZDW5X9G3 u5)
;; (map-set whitelist-spots 'SP7NHV7JG5H61HD6RHM1E82X1P2AXXXB1PGCXR4C u5)
;; (map-set whitelist-spots 'SPQ34GN2WE12D61BQV63FKWR9FQ6X4JYA7WG6F0Y u5)
;; (map-set whitelist-spots 'SP2YH9A4K2EH3ZE4JCBH8NREHP5DT49HK812AH6G6 u5)
;; (map-set whitelist-spots 'SP2YT64CG2Y0JERQ4YSJV4DHFQEBF4Y0K35G4D51V u5)
;; (map-set whitelist-spots 'SP2ZR3MD6VBM689M1ZHQT495ZNX4EZ36P4WT8JANY u5)
;; (map-set whitelist-spots 'SP6YAN6MV4SS2YJRMA3HQ2PYVQGVHV4W08D8HZ3V u5)
;; (map-set whitelist-spots 'SP30AGJWYXQZQKVA62PKQYGTGQZWJ9X6ZAW5NJF4G u5)
;; (map-set whitelist-spots 'SP30H7S10NK42C2AYJXV6RDVE4AM93BJMEBXD3GHF u5)
;; (map-set whitelist-spots 'SP1C6WQ9KTV3769S8X8YNAWBXKDG2Y65P5EEDRWR6 u5)
;; (map-set whitelist-spots 'SP31DB0CCWE8SDN1TDPZ4Q2DE05DNEN8F8A6DGDPY u5)
;; (map-set whitelist-spots 'SP31ER8WTA6RM08Z0GNTY786T4PW6SYKFTNMTPRSV u5)
;; (map-set whitelist-spots 'SP1CAWJM18ZXJ7BRJ6W7NKCSE00TD4QYCKFY7XW5G u5)
;; (map-set whitelist-spots 'SP6VV2AFXM7ZMT5V3ZAE8M6JXK9EA5N1GPFHJC4M u5)
;; (map-set whitelist-spots 'SP5TQYPJSBVHV757PJZ0KMXGT8SHCNSDTB2PNY0Z u5)
;; (map-set whitelist-spots 'SP32G5NZH2KJ7P0SDFC7MEG06MGR6ZJB8FJT449SJ u5)
;; (map-set whitelist-spots 'SP32HN7ASZ45RGXM4SAEE2K5557P8CGAATP6NBEVX u5)
;; (map-set whitelist-spots 'SP33M793WRK2Q7CKV8T93JRB942KPJGXQ0H1DA9J3 u5)
;; (map-set whitelist-spots 'SP345EHH82Z84XC19DM33PT9MYY9ESQ5B3TQFPH94 u5)
;; (map-set whitelist-spots 'SPMNTTDYV0Q03Y28PM3KVPPBK83VGZFK18Z7RC2R u5)
;; (map-set whitelist-spots 'SP355N7XZRWPV0AT7Y0ZY3VBHQK1W5Z8337JMZY7Z u5)
;; (map-set whitelist-spots 'SP356400A5XM1ZKNXCQ7BJRE8PXXG1EJHV3954Z27 u5)
;; (map-set whitelist-spots 'SP364J7EDJXRE1FPDZDABP9M58HPY4G88BFCP2HD0 u5)
;; (map-set whitelist-spots 'SP36MCQHXPP0DZ2KPC1KEY6ERC8GKB6QVCAK0PQYG u5)
;; (map-set whitelist-spots 'SP378TZED8SQDJMVSW173VW53B9A9E9GJZJX9WZ8W u5)
;; (map-set whitelist-spots 'SP37XZWB0DWXNKMT0172HHMWCK35VBBEK19DN2YYT u5)
;; (map-set whitelist-spots 'SP5MJB2231XSTW82MEX7S7HRHAAM918CVJETR0K4 u5)
;; (map-set whitelist-spots 'SP50EJJ624T2XCAT1N9ESGXY0NSXGBCKJE2MG8PV u5)
;; (map-set whitelist-spots 'SP4QA0NHP03T3T9GJKR5KEA7VQ2KNSXRK5JC74NG u5)
;; (map-set whitelist-spots 'SP1CG8MHZB2QZ0GAKZ5P9BXWWRTG74D1PZE097667 u5)
;; (map-set whitelist-spots 'SP4JRVAABXMXVNSA023C4KW3MEHND6BGRPQK51NB u5)
;; (map-set whitelist-spots 'SP4CGQHE7CHWA9WPJGE45Z0PWV7VYKHX6A3P6ANB u5)
;; (map-set whitelist-spots 'SP3E3FWG7HCZ0ZQANBY0EB5PV2RXMQG18NG08MGW9 u10)
;; (map-set whitelist-spots 'SP10WX7YZBTRA5C8PK1RCNZWWB9QXZZCAZRYNKKD9 u10)
;; (map-set whitelist-spots 'SP16WMXHMX3BZZ4Q0E1BT8E794WVYPXNCBZQBCXE1 u10)
;; (map-set whitelist-spots 'SP17JEQ44J7AHRE54X3RX2BT1TEM06YSEJYBR2AT6 u10)
;; (map-set whitelist-spots 'SP17MF5SZF5MSY8TQXK01SZB3VAJTC61QK78WFPHC u10)
;; (map-set whitelist-spots 'SP19WSDJWTH4CW3YG554XS5CAXJJGAN83P8CFZ4K1 u10)
;; (map-set whitelist-spots 'SP1FCVMBP2XWJFXJ2VJJ5P2MBD4PKK9R5SPG87EB8 u10)
;; (map-set whitelist-spots 'SP1G5YJTM2DT6S3V54334PPDBRXE0QDT7B619C900 u10)
;; (map-set whitelist-spots 'SP1GHMBR6NKXC8HMWWMPKGRZJ6WTZXX1SYJJNJZJA u10)
;; (map-set whitelist-spots 'SP1KYADNQFZBR5FNPN0PQV85TN54577MZX84B971W u10)
;; (map-set whitelist-spots 'SP1P397R7RQHBQH3PMNX8M0F05NETNXAR4SMQBGPR u10)
;; (map-set whitelist-spots 'SP1PKK6KJPM826D0X6AMCJ63KEH2M456M4T22WAPQ u10)
;; (map-set whitelist-spots 'SP1V50HFY8CRC7N65HFH6S778CJEW5GQRBH3YW7BK u10)
;; (map-set whitelist-spots 'SP1VWZ87JH5QVYB1FZ9274Q597XR1ZAQ99KGCTEFS u10)
;; (map-set whitelist-spots 'SP1ZQSWQ9QNNW388VFG45HYX1H592147V2FZZJY8V u10)
;; (map-set whitelist-spots 'SP201VQDZD54J2RM07N8283D80X7SY15ZBGCMRB8T u10)
;; (map-set whitelist-spots 'SP21K1RWW54ZTYJB3ANR580NVY787CHTTXF7PDF5K u10)
;; (map-set whitelist-spots 'SP25VMQ9FT1MFGES0ZD3X8BS4CQ0WEK33PD3SJ2E0 u10)
;; (map-set whitelist-spots 'SP28R593JKNFH8PTWNECR84A83EESKC3CC5P826R5 u10)
;; (map-set whitelist-spots 'SP2BAPW5YCZMYZ37X6BQY4YXSG6AY3PYMB1PSBK4F u10)
;; (map-set whitelist-spots 'SP2BB2Y38C8EDNEK8JTR126GWEFYKY97AG9HRW9CW u10)
;; (map-set whitelist-spots 'SP2CHC7GM2Y8RMMSRC7DSDJW3Y7CNYC2Q9EVFSSHV u10)
;; (map-set whitelist-spots 'SP2CZMH9A6FH5QPAJAR8ZG091Z15JKAGY1X0F3EJ0 u10)
;; (map-set whitelist-spots 'SP2DFX28F1S3CB46B5XH9M5JQ7N4SMCE7CQY1TNYS u10)
;; (map-set whitelist-spots 'SP2F18PH7FP22EHS0J0X3A6EFZ9PAW0EZJRET0GXZ u10)
;; (map-set whitelist-spots 'SP2F1QFS7H3GFNGBX4CRY9KRXGBSABQSVQTXANQ1Y u10)
;; (map-set whitelist-spots 'SP2HVP68NY5BD2RDFX0JNXSYRS8AA6R7S30N08NJZ u10)
;; (map-set whitelist-spots 'SP2J0Z0C54R721YQWPWYPJKK3RPRFV7HD1JFX92NY u10)
;; (map-set whitelist-spots 'SP2PCBFFTR6JG9KJM9WTYEWAQCE8QTWBFEW0HQGQZ u10)
;; (map-set whitelist-spots 'SP2PNN7Z0FB0EQZ8CE0NJE0HH09T19P5WE0GQT0W3 u10)
;; (map-set whitelist-spots 'SP2QV18K6HB5NBE2RWHKH1HY2A3HKJ4NVW7KYN2SY u10)
;; (map-set whitelist-spots 'SP2VP1FCQEJD4NVBZRVG90XPCYCKK9K03FE4E64HQ u10)
;; (map-set whitelist-spots 'SP2WY40NKKKPPJA6P2W1MXJHN4DNFMVVMNK4D5AFQ u10)
;; (map-set whitelist-spots 'SP2WYZM0WT2RGH5W5Q5KD3NG0MZT2WVN94W7NHZTY u10)
;; (map-set whitelist-spots 'SP2YCTDRDMZ7ZJCY1B3AG2354VFCKWVPZA2ASMEJ6 u10)
;; (map-set whitelist-spots 'SP30HDQ1WGZRD1YTBRPPPYZHKQJ7E8CVYZCTHXKVX u10)
;; (map-set whitelist-spots 'SP31R29Q0D8JVN5WTDB0EV3A2M1FV2DVEV35VZV66 u10)
;; (map-set whitelist-spots 'SP34S80102KYXHC0C5VC3GDPDVY3WFG1G5G507Y0K u10)
;; (map-set whitelist-spots 'SP38GBVK5HEJ0MBH4CRJ9HQEW86HX0H9AP1HZ3SVZ u10)
;; (map-set whitelist-spots 'SP39MP76SSQK9H94BD4CS92788HG41CQTP2T3D34R u10)
;; (map-set whitelist-spots 'SP3A5VJWA3CH4BM7W08APVJKJ8MQ7PXXFACWAYA2J u10)
;; (map-set whitelist-spots 'SP3CK642B6119EVC6CT550PW5EZZ1AJW661ZMQTYD u10)
;; (map-set whitelist-spots 'SP3CW7TC10NY7BFC53MJJZ1NQ12P4NGSBM90SH7Z8 u10)
;; (map-set whitelist-spots 'SP0194E00ZDH74PFA1J6444W1320WQ3XFQX14DM7 u10)
;; (map-set whitelist-spots 'SP3G9BMCJ0858Y68MM35R6HA0WAZDNYXWZBN4RYK1 u10)
;; (map-set whitelist-spots 'SP3KCAE82ZYFB5DMJE9TW9K9ZQPJYCD9Q02PFB2C8 u10)
;; (map-set whitelist-spots 'SP3KXV3J6MRHAH4H89MDS390X1KS0GQN4DWQ5RFVB u10)
;; (map-set whitelist-spots 'SP3MMG05H6T48W5NJEEST0RR3FTPGKPM7C19X5M16 u10)
;; (map-set whitelist-spots 'SP3N6EZPTSX8ZV2RGPY9NR9A8CA0QET39CY978H5E u10)
;; (map-set whitelist-spots 'SP3Q1F1P3NYBAJEMPR57WAX7FKV5NSZEAGXC39BPT u10)
;; (map-set whitelist-spots 'SP3QE6S262BKTV4WV0N80WBFXXKA5CKMH8TGQB3EG u10)
;; (map-set whitelist-spots 'SP3QWA7ACCYXCN7FWBSYAYX9GVBW4THD41JA57ZRT u10)
;; (map-set whitelist-spots 'SP3TBSZ85T6G8V91FGYQ3QG8HNR7GTVVHRCW62B6X u10)
;; (map-set whitelist-spots 'SP3VH4DZ7HJYVHJYWE3JZ6A6XV5YEZW0TZFP55FVJ u10)
;; (map-set whitelist-spots 'SP3W00ZZE6PN11NHFH5KVEY6Q4P7YCYPTAWM7M9DX u10)
;; (map-set whitelist-spots 'SP3W7FMHDG1XFH99KP9K4TP39GCZ8SAABBKJQDJNY u10)
;; (map-set whitelist-spots 'SP3XB5YMZMW4JJZTK318KA0CHY0YBE907VVY3AGZ8 u10)
;; (map-set whitelist-spots 'SP3XZVBXAPVVBKV0C0AMR875E8Q7545YX227WNHMN u10)
;; (map-set whitelist-spots 'SP3Z20WVS6BXDV2CAD65D55CNY7C62HKQ9HGF1882 u10)
;; (map-set whitelist-spots 'SP3ZMEFW7VH796ZQAH1JMAJT4WC4VPEZZFB6W5CAD u10)
;; (map-set whitelist-spots 'SPEJDX32VPD59F3WG0H5S47WZ1VXCRX6JEBJ1SCH u10)
;; (map-set whitelist-spots 'SPH6QZB392YWWTPCS6NX2R4R3YBAV7SHQ0QRGB6R u10)
;; (map-set whitelist-spots 'SPJXWDR6YPME7X4BZ8PK6WDG76B7DZVHKEPAACF3 u10)
;; (map-set whitelist-spots 'SPJYE321XPCZ73EKM5GHZGC5ACBPS4KHGB4E4GGJ u10)
;; (map-set whitelist-spots 'SPKDKR58FY2MAWRRJ5R56BKJM9R1868276K73KWJ u10)
;; (map-set whitelist-spots 'SPNNXMY01SNT92EEK9DRRG2QW1FA256MCNBPPSRX u10)
;; (map-set whitelist-spots 'SPP1XFREP00CJXC65955T7HATAS4ZMVQFQ7ZWD7R u10)
;; (map-set whitelist-spots 'SPRA6FK6C5N1Z7G61N77YWTN2C13GEX9NXQ23MX9 u10)
;; (map-set whitelist-spots 'SPTW2MGMYZEY903JWY79HADBPF2EBFV7D019R1PZ u10)
;; (map-set whitelist-spots 'SPV00QHST52GD7D0SEWV3R5N04RD4Q1PMA3TE2MP u10)
;; (map-set whitelist-spots 'SPXHBSENFDVDRQGA57R9C633DR4FE93V7VSYGK15 u10)
;; (map-set whitelist-spots 'SP3BWAHYMTHQZHSB8N49AXQNTYWBACQBAN8Z4QFRD u15)
;; (map-set whitelist-spots 'SP21YYYQX9PWEFS9P6SNJ9JN9657FGGYREGGZMC5A u15)
;; (map-set whitelist-spots 'SPYF9PC72BSWS0DGA33FR24GCG81MG1Z96463H68 u15)
;; (map-set whitelist-spots 'SP3TF77S4XWBMZ455YTYWRMRMHTM7AZDM6258ACR3 u15)
;; (map-set whitelist-spots 'SP38E8D3J94P84VPE1Z8ST1H22CNGETPPKTXK12PY u15)
;; (map-set whitelist-spots 'SP3N8VF6CDC3144BS1J9GDGA57BVXDYEY666WTRGN u15)
;; (map-set whitelist-spots 'SPY914WERKVS8B46P6BDKY1V0J1HTKH8EPWETJSE u15)
;; (map-set whitelist-spots 'SP1RH1K9BTHGSZ8D6EK07EM7VVZHGXCMMPFZTBBKW u15)
;; (map-set whitelist-spots 'SP3AFTJ38PSZQBXZGNCDGM05GR0SFY7HBPZD2ACR2 u15)
;; (map-set whitelist-spots 'SP1P637C9NB6GSK9TY8AT8SN3QKH1WSV5ZVCZZSKS u15)
;; (map-set whitelist-spots 'SP1KNK0HP2ZTGHEE1YAPM85HTDHF89G2MCEJCP08G u15)
;; (map-set whitelist-spots 'SP110TAR7RZE8ZTHMTMZYN76KT4440CS1KADFCG2B u15)
;; (map-set whitelist-spots 'SPXE4CC9QNP0VVVMWHQDAQ3DZ8WCFTV5J2RZWRM0 u15)
;; (map-set whitelist-spots 'SP1GH7Q7R73X27TQGV27MVKDHR4YF83HZAMJ9K5YH u15)
;; (map-set whitelist-spots 'SP1CE3NQXDKCJ2KEFFGCVFA5C196S9F0RRX93HY87 u15)
;; (map-set whitelist-spots 'SPMA6RDYSSJN440848VC1WBN4YQ5181MKRKWHVPF u15)
;; (map-set whitelist-spots 'SP1DY2QDFZAR8VK5S9DMYW2AW0WXQ16NNRG3PJDTX u15)
;; (map-set whitelist-spots 'SPV48Q8E5WP4TCQ63E9TV6KF9R4HP01Z8WS3FBTG u15)
;; (map-set whitelist-spots 'SP71N7X6G8KYGQPHZW7TB4PD1JZ6ND9AESF9JPZ8 u15)
;; (map-set whitelist-spots 'SP12BEEDG31J0AH68DFDJJYZ36D002PKDZCP1DZQE u15)
;; (map-set whitelist-spots 'SPSHJE4F0D0ZKJZ1DVXEDFFD6AKHHKF31H3M77B8 u15)
;; (map-set whitelist-spots 'SP3910KBW2WAXNDM5VXWGH0JR3JFD245YWM9BA5HE u15)
;; (map-set whitelist-spots 'SP4EMKNFNVE7EG0WB1H0YVTK4T1X4HJXM8E3G21Y u15)
;; (map-set whitelist-spots 'SP2MN9BT5230AM8YPXK4JVYRMAXJ6G3VZ206ZS8X1 u15)
;; (map-set whitelist-spots 'SP2J9G3YY6KT9BJT703YKMRPFSHWPTQKY945X6S44 u15)
;; (map-set whitelist-spots 'SP2FHRXHTZBFGPFKSNWFGYPNBQXKSXC2JFJZ7BY7D u15)
;; (map-set whitelist-spots 'SPCD0QPKVDYE1VBK616J8RM65W6RHP7ZV5Q49GYX u15)
;; (map-set whitelist-spots 'SP26ZSXREMGCD8M71Y4FVA17QBC42EV0VM3HPVXYQ u15)
;; (map-set whitelist-spots 'SP3HN2AE3EDYXHP7CARQXVPWRA7CWDKJB23S0ZRQJ u15)
;; (map-set whitelist-spots 'SPT7J3VXH570NNCKRVJ7YEMBB5S7F2418RMH4KHM u20)
;; (map-set whitelist-spots 'SP325GSC37A1BP5N4ST16FX5821H9MTK7WPVWTS0P u20)
;; (map-set whitelist-spots 'SP2Y73SR8PAY8NVF9WPH2WKDFVQVVWNRW8N4AEC7C u20)
;; (map-set whitelist-spots 'SP12FXX43RDKMHD2BNQTT6XYQX4AMEEG52XT36N9S u20)
;; (map-set whitelist-spots 'SPN9JGFGXFJZD7AM5VF2S7BRATNCQYVHVWG3087B u20)
;; (map-set whitelist-spots 'SP2R3TQNEDXZ5VJ0JZ2839J82R9R99GRCY05PF1ZR u20)
;; (map-set whitelist-spots 'SP387GZNN3BY6YGZTTZK9XB40TDFJSSPGWMG1QQTG u20)
;; (map-set whitelist-spots 'SP76FT674E3S2SKP6DGEK0T11HR14ECEYZX06JJV u20)
;; (map-set whitelist-spots 'SP6JDQDZW8YK594HV804PX1DQM3DSB4SQA8NHAQK u25)
;; (map-set whitelist-spots 'SP382KJMX81NQ3W3EVMQS934B8BAE74JYNRWY2SPV u25)
;; (map-set whitelist-spots 'SP303N4NA7E504T3HMR5JCJGXTJY4DA5K8330CZ9Q u25)
;; (map-set whitelist-spots 'SP2TEMT965FN4EW7AK18GJPDZC7E6KE8G0VPTCJHH u25)
;; (map-set whitelist-spots 'SP2S1FVQGJDZB60T8P2S9TGBHTZDXJ0T744W874N4 u25)
;; (map-set whitelist-spots 'SPEEDDVQT54H2FH17S5BBMY0M4FRPB287HGDJ01A u25)
;; (map-set whitelist-spots 'SPVP9JFZGJ4GPFN69NNG5HR79FFVB42DXY31RY42 u25)
;; (map-set whitelist-spots 'SP127TSB0V1Y76GVPBZ718AHAZTAE9QJTYEVGRDKE u25)
;; (map-set whitelist-spots 'SP1QJ3WKYJ4PTQD8NWR0749WEJFV7D5R7YCGCFAZV u25)
;; (map-set whitelist-spots 'SP1PH4J1HXWS1W02PSKJB2YR6ZA5CJ733AZESG9EW u25)
;; (map-set whitelist-spots 'SP1NHAJSCFK5S4F7PVHYP2CA9ZTA4Z9V7WJ7BYH6F u25)
;; (map-set whitelist-spots 'SP1MMTPXD2Z37XGHVA80RSCXBFHF549GM02W8XR2A u25)
;; (map-set whitelist-spots 'SP1BE278MVWGWSW0CH2AZ598M9DHE72NEFP00WTR4 u25)
;; (map-set whitelist-spots 'SP1A6X04DBBTR6M4GED30FE927P45RWERX1T5F6G9 u25)
;; (map-set whitelist-spots 'SP187B4D4GRPTV7B0FV55DEHNQG9STAP6PZ2CDKVH u25)
;; (map-set whitelist-spots 'SP3J87S84SYSDJ75DJG7E188685NR7E5SQBCT6C8B u25)
;; (map-set whitelist-spots 'SP3HYKJ3S85N2VSC4SFPY1J8C5P4RK1BFEPN97JKN u25)
;; (map-set whitelist-spots 'SP3VS5SB62BPD0TS96NQP4Z29Q36S5EXTS4E03K9C u25)
;; (map-set whitelist-spots 'SP3C5W9RSSYG3SVP192DCQY4Z2WQWPJ9YEERKTPSY u25)
;; (map-set whitelist-spots 'SP1H24VCRBASP9KCGNWWW0SX64PMWNSFG4HGDGQF6 u30)
;; (map-set whitelist-spots 'SP3M72S3S5085CHCMH6KWQG6NGFT9MYFJRZX036P2 u30)
;; (map-set whitelist-spots 'SP1VSF1J0G89EYQTQMP5RVT84D1PJ5K4CB2KDDB98 u30)
;; (map-set whitelist-spots 'SP3CRPEKTPQSPTH5J3QMV61YM38MDG2TC25N0SM8N u30)
;; (map-set whitelist-spots 'SP10RYHXKKY0AWC09Z6SMGR4PC5QEYYEYZY3TYKSW u30)
;; (map-set whitelist-spots 'SP329QBXF6Y0G7HNF1ENQZTDDX6C8SR649J1M9WXJ u30)
;; (map-set whitelist-spots 'SPMC582NBMSHD0XVKPJBYRRW1TM1XCQCJC8RX7XJ u30)
;; (map-set whitelist-spots 'SPXN9S0RA3XDG95NE90F93GTQ3VXGB7B71ZJ4KXA u30)
;; (map-set whitelist-spots 'SP1TT29AQ5AE5ME6Q1R6W5ZGWMEY3ARP215SQ40D3 u30)
;; (map-set whitelist-spots 'SP3N66VSF1HAH9BP36XEAT2JZWZ45TDJXWENGS7Y5 u30)
;; (map-set whitelist-spots 'SP2XKCW6RD03GJM3WQYB4KBWHFX9380ZSKMVAKTJ2 u30)
;; (map-set whitelist-spots 'SP10TSSGP0S44ARF8R0AGNGE1YRDB52CJXT16KWQP u35)
;; (map-set whitelist-spots 'SP2VG2FS5AACNV59NYAPNX6SS48R17HTC5NR15QRX u35)
;; (map-set whitelist-spots 'SP185YFZ295ATWKHS6AEZRT80JYA40CR2V8FC76BM u35)
;; (map-set whitelist-spots 'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ u35)
;; (map-set whitelist-spots 'SP3SKH6YB515J76KVDHDHBTE2GQ4CV6QJHC5GJKRF u35)
;; (map-set whitelist-spots 'SP38X6Q1ADESZX5ZHPZYX3M2BB1HTRCEE2EPTGS59 u35)
;; (map-set whitelist-spots 'SP25GDE2M3T2Y3MHXBG6RAJB47B9TYS74DF88SCD4 u35)
;; (map-set whitelist-spots 'SP270BH8T9ZANH8VDNC2VSNKCNMZNEYPF79AWA7QY u35)
;; (map-set whitelist-spots 'SP1EA7P3FRBN7CH04275N2XM6J03GS3Q49VGSZ3C9 u35)
;; (map-set whitelist-spots 'SP1CWB8EVDX1K7JGB8NZHQZW4E790F093R5N43ZKT u35)
;; (map-set whitelist-spots 'SP10AZC9MXS77B5JWFZE47K23NKXBMF4F5F8V4Y82 u35)
;; (map-set whitelist-spots 'SPPEQ4ZDR6AWR4K2PTDY51D83AE6WWDJK8G0A11F u40)
;; (map-set whitelist-spots 'SP1M3B85KWJTMS7ZSWFB16QD5X37096NDVD5YYGHX u45)
;; (map-set whitelist-spots 'SP16BC59Y29FYZPP7WF8QB376STCVW33W4J9BWP06 u55)
