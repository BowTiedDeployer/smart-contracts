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

;; define variables
;; Store the last issues token ID
(define-data-var last-id uint u0)
(define-data-var contract-owner principal tx-sender)
(define-data-var uri-root (string-ascii 80) "https://stacksdegens.com/bitcoin-degens/jsons/")

;; define maps
;; for each id keep in the map the name of the bns his owner has ( if one is present )
(define-map degen-name uint (string-ascii 30))

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
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-no-rights)
    (let ((address-bns-name (contract-call? .bns resolve-principal recipient))) 
    (if (is-err address-bns-name)  
      ;; if address doen't own a bns-name -> change name to BitcoinDegen -> even if it was already that
      (set-nft-name token-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string token-id)))
      ;; else if recipient has bns -> change name to it bns
      (let ((complete-bns-name (unwrap! address-bns-name err-bns-convert))
        (bns-name (as-max-len? (get name complete-bns-name) u20))
        (bns-namespace (as-max-len? (get namespace complete-bns-name) u9)))
        (if (and (is-some bns-name) (is-some bns-namespace)) 
          (set-nft-name token-id (get-address-bns-name {name: (unwrap-panic bns-name), namespace: (unwrap-panic bns-namespace)}))
          false)))
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
;; (define-read-only (get-token-uri (token-id uint))
;;   (let ((token-urr (map-get? token-url token-id)))
;;     (ok token-urr)))

;; Internal - Mint new NFT
(define-private (mint (new-owner principal))
  (let 
    ((next-id (+ u1 (var-get last-id)))
      (address-bns-name (contract-call? .bns resolve-principal new-owner))) 
    (if (is-err address-bns-name)  
        ;; does not have bns address
        (set-nft-name next-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string next-id)))
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
          (set-nft-name next-id (concat "BitcoinDegen#" (contract-call? .conversions uint-to-string next-id))))))   
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
    ;; pay to mint price
    (try! (stx-transfer? price tx-sender (var-get contract-owner)))
    (ok (try! (mint tx-sender)))))

;; Burn a token
(define-public (burn-token (token-id uint))
	(begin     
		(asserts! (is-eq (some tx-sender) (nft-get-owner? bitcoin-degen token-id)) err-no-rights)
		(nft-burn? bitcoin-degen token-id tx-sender)))