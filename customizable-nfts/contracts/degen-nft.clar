;; use the SIP009 interface (testnet)
;; trait deployed by deployer address from ./settings/Devnet.toml
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-trait.nft-trait)

;; define a new NFT. Make sure to replace DEGENS
(define-non-fungible-token DEGENS uint)

;; define constants
(define-constant ERR-NO-RIGHTS (err u403))

;; Store the last issues token ID
(define-data-var last-id uint u0)

(define-map token-url { token-id: uint } { url: (string-ascii 256) })



(define-public (mint-url (address principal) (url (string-ascii 256)))
  (let 
    ((next-id (+ u1 (var-get last-id))))
    (map-set token-url {token-id: next-id} {url: url})
    (var-set last-id next-id)
    (nft-mint? DEGENS next-id address)
  )
)

;; SIP009: Transfer token to a specified principal
(define-public (transfer (token-id uint) (sender principal) (recipient principal)) 
  (begin
    (asserts! (is-eq tx-sender sender) ERR-NO-RIGHTS)
    (nft-transfer? DEGENS token-id sender recipient)
  )
)

(define-public (transfer-memo (token-id uint) (sender principal) (recipient principal) (memo (buff 34)))
  (begin 
    (try! (transfer token-id sender recipient))
    (print memo)
    (ok true)
  )
)

;; SIP009: Get the owner of the specified token ID
(define-read-only (get-owner (token-id uint))
  ;; Make sure to replace DEGENS
  (ok (nft-get-owner? DEGENS token-id))
)

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-id))
)

;; SIP009: Get the token URI. You can set it to any other URI
(define-read-only (get-token-uri (token-id uint)) 
  (let ((token-urr (get url (map-get? token-url {token-id: token-id})))) 
    (ok token-urr)
  )
)

;; Internal - Mint new NFT
(define-private (mint (new-owner principal))
  (let 
    ((next-id (+ u1 (var-get last-id))))
    (var-set last-id next-id)
    (nft-mint? DEGENS next-id new-owner)
  ))

;; Burn a token
(define-public (burn-token (token-id uint))  
	(begin     
		(asserts! (is-eq (some tx-sender) (nft-get-owner? DEGENS token-id) ) ERR-NO-RIGHTS)     
		(nft-burn? DEGENS token-id tx-sender)
  )
)

(mint-url 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5 "11111")   
(mint-url 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5 "22222")

