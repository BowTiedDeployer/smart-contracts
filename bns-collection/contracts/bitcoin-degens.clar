;; use the SIP009 interface
;; NFT collection

;; for testnet use 'ST000000000000000000002AMW42H.bns

(impl-trait .nft-trait.nft-trait)

;; define a new NFT. if address owns a .btc domain will get that name, else get BitcoinDegen#number
(define-non-fungible-token bitcoin-degen uint)

;; define errors
(define-constant err-owner-only (err u100))
(define-constant err-cannot-mint (err u101))
(define-constant err-bns-convert (err u102))
(define-constant err-bns-size (err u103))
(define-constant err-full-mint-reached (err u104))

(define-constant err-no-rights (err u403))

;; price 100 stx
(define-constant price u69000000)
(define-constant total-amount u1000)

;; define variables
;; Store the last issues token ID
(define-data-var last-id uint u0)
(define-data-var contract-owner principal tx-sender)
(define-data-var mint-enabled bool true)
(define-data-var only-whitelisted bool true)
(define-data-var uri-root (string-ascii 80) "https://stacksdegens.com/bitcoin-degens/jsons/")

;; define maps
;; for each id keep in the map the name of the bns his owner has ( if one is present )
(define-map degen-name uint (string-ascii 30))

;; whitelist system
;; every address has a number of whitelist values
(define-map whitelist-spots principal uint)


;; whitelist functions
;; set the whitelist addresses and number of whitelists directly in the smart contract
;;
;;

(define-read-only (is-mint-enabled) 
  (var-get mint-enabled))

(define-public (set-mint-enabler (bool-value bool))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (ok (var-set mint-enabled bool-value))))

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
;; only contract owner can set whitelist
(define-public (set-whitelist-spots (address principal) (spots uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (ok (map-set whitelist-spots address spots))))



;; bns related functions
;;
;;

;; get the name and namespace and make the read version of it 
;; from buff[] to string-ascii 
;; have the string acii done right with limit of 20
(define-read-only (get-address-bns-name (bns {name: (buff 20), namespace: (buff 9)}))
  ;; gets raw value of bns or error if wallet does not own a bns
  (unwrap-panic (contract-call? .conversions resolve-principal-to-ascii bns)))

;; nft general functions
;;
;;

;; SIP009: Transfer token to a specified principal
;; (define-public (transfer (token-id uint) (sender principal) (recipient principal))
;;   (begin
;;     (asserts! (is-eq tx-sender sender) err-no-rights)
;;     (let ((address-bns-name (contract-call? .bns resolve-principal recipient))) 
;;     (if (is-err address-bns-name)  
;;       ;; if address doen't own a bns-name -> change name to BitcoinDegen -> even if it was already that
;;       (set-nft-name token-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string token-id)))
;;       ;; else if recipient has bns -> change name to it bns
;;       (let ((complete-bns-name (unwrap! address-bns-name err-bns-convert))
;;         (bns-name (as-max-len? (get name complete-bns-name) u20))
;;         (bns-namespace (as-max-len? (get namespace complete-bns-name) u9)))
;;         (if (and (is-some bns-name) (is-some bns-namespace)) 
;;           (set-nft-name token-id (get-address-bns-name {name: (unwrap-panic bns-name), namespace: (unwrap-panic bns-namespace)}))
;;           false)))
;;     (nft-transfer? bitcoin-degen token-id sender recipient))))
    

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
;; (define-read-only (get-token-uri (token-id uint))
;;   (let ((token-urr (map-get? token-url token-id)))
;;     (ok token-urr)))

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-no-rights)
    (let ((address-bns-name (contract-call? .bns resolve-principal recipient)) 
      (address-bnsx-name (contract-call? .bnsx-fake get-primary-name recipient)))
      (if (not (is-err address-bns-name))  
        (let 
          ((complete-bns-name (unwrap! address-bns-name err-bns-convert))
            (bns-name (as-max-len? (get name complete-bns-name) u20))
            (bns-namespace (as-max-len? (get namespace complete-bns-name) u9)))
          (if (and (is-some bns-name)  (is-some bns-namespace)) 
            ;; bns address respect the criterias
            (set-nft-name token-id 
              (get-address-bns-name 
                {name: (unwrap-panic bns-name),
                namespace: (unwrap-panic bns-namespace)}))
            (set-nft-name token-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string token-id)))))
        (if (is-some (unwrap! address-bnsx-name err-bns-convert)) 
          (let 
            ((complete-bns-name (unwrap! (unwrap! address-bnsx-name err-bns-convert) err-bns-convert))
              (bns-name (as-max-len? (get name complete-bns-name) u20))
              (bns-namespace (as-max-len? (get namespace complete-bns-name) u9)))
            (if (and (is-some bns-name)  (is-some bns-namespace)) 
              ;; bns address respect the criterias
              (set-nft-name token-id 
                (get-address-bns-name 
                  {name: (unwrap-panic bns-name),
                  namespace: (unwrap-panic bns-namespace)}))
              (set-nft-name token-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string token-id)))))
          ;; does not have bns address
          (set-nft-name token-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string token-id)))))
    (nft-transfer? bitcoin-degen token-id sender recipient))))
    

;; Internal - Mint new NFT
(define-private (mint (new-owner principal))
  (let 
    ((next-id (+ u1 (var-get last-id)))
      (address-bns-name (contract-call? .bns resolve-principal new-owner))
      (address-bnsx-name (contract-call? .bnsx-fake get-primary-name new-owner))) 
    (asserts! (<= next-id total-amount) err-full-mint-reached)
    (if (not (is-err address-bns-name))  
      (let 
        ((complete-bns-name (unwrap! address-bns-name err-bns-convert))
          (bns-name (as-max-len? (get name complete-bns-name) u20))
          (bns-namespace (as-max-len? (get namespace complete-bns-name) u9)))
        (if (and (is-some bns-name)  (is-some bns-namespace)) 
          ;; bns address respect the criterias
          (set-nft-name next-id 
            (get-address-bns-name 
              {name: (unwrap-panic bns-name),
              namespace: (unwrap-panic bns-namespace)}))
          (set-nft-name next-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string next-id)))))
      (if (is-some (unwrap! address-bnsx-name err-bns-convert)) 
        (let 
          ((complete-bns-name (unwrap! (unwrap! address-bnsx-name err-bns-convert) err-bns-convert))
            (bns-name (as-max-len? (get name complete-bns-name) u20))
            (bns-namespace (as-max-len? (get namespace complete-bns-name) u9)))
          (if (and (is-some bns-name)  (is-some bns-namespace)) 
            ;; bns address respect the criterias
            (set-nft-name next-id 
              (get-address-bns-name 
                {name: (unwrap-panic bns-name),
                namespace: (unwrap-panic bns-namespace)}))
            (set-nft-name next-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string next-id)))))
        ;; does not have bns address
        (set-nft-name next-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string next-id)))))
    (var-set last-id next-id)
    (nft-mint? bitcoin-degen next-id new-owner)))

(define-read-only (get-nft-name (id uint)) 
  (map-get? degen-name id )) 

(define-read-only (get-batch-nft-name (token-id-list (list 50 uint))) 
  (map get-nft-name token-id-list))

(define-private (set-nft-name (id uint) (name (string-ascii 30)))
  (map-set degen-name id name))

(define-public (set-nft-name-public (id uint) (name (string-ascii 30)))
  (ok (map-set degen-name id name)))


(define-public (claim) 
  (begin    
    ;; verify can mint
    (asserts! (is-eq (can-mint-and-update-spots tx-sender) (ok true)) err-cannot-mint)
    (try! (stx-transfer? price tx-sender (var-get contract-owner)))
    (ok (try! (mint tx-sender)))))

(define-public (claim-5) 
  (begin 
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (try! (claim))
    (ok (claim))))

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
    (ok (claim))))

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
