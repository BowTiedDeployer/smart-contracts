;; use the SIP009 interface
;; NFT collection
(impl-trait .nft-trait.nft-trait)

;; define a new NFT. if address owns a .btc domain will get that name, else get BitcoinDegen#number
(define-non-fungible-token bitcoin-degen uint)

;; define errors
(define-constant err-owner-only (err u100))
(define-constant err-cannot-mint (err u101))
(define-constant err-bns-convert (err u102))
(define-constant err-bns-size (err u103))

(define-constant err-no-rights (err u403))

;; price 100 stx
(define-constant price u100000000)
;; discount_price 69 stx
(define-constant discount-price u69000000)

;; define variables
;; Store the last issues token ID
(define-data-var last-id uint u0)
(define-data-var contract-owner principal tx-sender)
(define-data-var only-whitelisted bool true)

;; define maps

(define-map token-url uint (string-ascii 256))
;; for each id keep in the map the name of the bns his owner has ( if one is present )
(define-map degen-name uint (string-ascii 20))

;; whitelist system
;; every address has a number of whitelist values
(define-map whitelist-spots principal uint)


;; whitelist functions
;; set the whitelist addresses and number of whitelists directly in the smart contract
;;
;;

;; TODO: can be done without unwrap-panic?
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

;; if address does not have map-get or is 0 => no whitelist
(define-read-only (get-whitelist-spots (address principal)) 
  (map-get? whitelist-spots address))

;; if address does not have map-get or is 0 => no whitelist
(define-public (set-whitelist-spots (address principal) (spots uint))
  (ok (map-set whitelist-spots address spots)))



;; bns related functions
;;
;;

;; get the name and namespace and make the read version of it 
;; from buff[] to string-ascii 
(define-read-only (get-address-bns-name (bns {name: (buff 20), namespace: (buff 10)})) ;; TODO: why buff 40??
  ;; gets raw value of bns or error if wallet does not own a bns
  (contract-call? .conversions resolve-principal-to-ascii bns))

;; fees: 0.69 stx
(define-private (fee-processing)
  (stx-transfer? price tx-sender (var-get contract-owner)))

(define-private (discount-fee-processing)
  (stx-transfer? discount-price tx-sender (var-get contract-owner)))

(define-private (payment-by-address (address principal)) 
  ;; check if has bns in wallet 
  (if (is-err (contract-call? .bns resolve-principal address)) 
    (fee-processing )
    ;; if it has, pay discount price 
    (discount-fee-processing )))


;; nft general functions
;;
;;

;; ;; SIP009: Transfer token to a specified principal
;; (define-public (transfer (token-id uint) (sender principal) (recipient principal))
;;   (begin
;;     (asserts! (is-eq tx-sender sender) err-no-rights)
;;     (let ((address-bns-name (contract-call? .bns resolve-principal recipient))) 
;;     (if (is-err address-bns-name)  
;;       ;; if address doen't own a bns-name - is same name
;;       false
;;       ;; else if recipient has bns -> change name to it
;;       (let ((complete-bns-name (unwrap! address-bns-name err-bns-convert))
;;         (bns-name (as-max-len? (get name complete-bns-name) u20))
;;         (bns-namespace (as-max-len? (get namespace complete-bns-name) u10)))
;;         (if (is-some bns-name) 
;;           (if (is-some bns-namespace) 
;;             (set-nft-name token-id (get-address-bns-name {name: (unwrap-panic bns-name), namespace: (unwrap-panic bns-namespace)})) TODO: make it work
;;             false)
;;         false)
;;         (nft-transfer? bitcoin-degen token-id sender recipient))))))
;;         (ok true)
;;   ;; ))

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-no-rights)
    ;; change name of degen based on recipient bns ( if it has one )
    (if (is-err (contract-call? .bns resolve-principal recipient)) 
      ;; if recipient has bns -> change name to it
      (set-nft-name token-id (concat "CustomName#" "23"))
      ;; else change name to BitcoinDegen#id
      (set-nft-name token-id (concat "BitcoinDegen#" "23"))
    )
    (nft-transfer? bitcoin-degen token-id sender recipient)))

;; (define-read-only (verify-name-length (name (buff 20)))
;;   (if (> (len name) u20)
;;     false
;;     true))

;; (define-read-only (verify-namespace-length (namespace (buff 10)))
;;   (if (> (len namespace) u10)
;;     false
;;     true))



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
  (let ((token-urr (map-get? token-url token-id)))
    (ok token-urr)))

;; Internal - Mint new NFT
(define-private (mint (new-owner principal))
  (let 
    ((next-id (+ u1 (var-get last-id))))
    (var-set last-id next-id)
    (set-nft-name next-id (concat "random" ".btc"))
    (nft-mint? bitcoin-degen next-id new-owner)))

(define-private (set-nft-name (id uint) (name (string-ascii 20))) 
  (map-set degen-name id name)) 

(define-public (claim) 
  (begin    
    ;; verify can mint
    (asserts! (is-eq (can-mint-and-update-spots tx-sender) (ok true)) err-cannot-mint)
    ;; pay to mint price / discount_price
    (try! (payment-by-address tx-sender))
    (try! (mint tx-sender))
    (ok u2))) ;; TODO: add here what is needed
    
;; Burn a token
(define-public (burn-token (token-id uint))
	(begin     
		(asserts! (is-eq (some tx-sender) (nft-get-owner? bitcoin-degen token-id)) err-no-rights)
		(nft-burn? bitcoin-degen token-id tx-sender)))

(define-public (set-only-whitelisted (value bool)) 
  (begin 
    (asserts! (is-eq tx-sender (var-get contract-owner))  err-owner-only)
    (var-set only-whitelisted value)
    (ok value)))



;; (contract-call? .bsn-nft concat-name 0x7369726a6f6e617468616e 0x627463)
;; (define-read-only (concat-name (first-hex (buff 20)) (second-hex (buff 10)))
;;   (concat 
;;     (concat 
;;       (contract-call? .conversions convert-word-hexa-to-ascii first-hex) 
;;       ".")
;;       (contract-call? .conversions convert-word-hexa-to-ascii second-hex)))


;; if has bns in wallet - map id to bns value

