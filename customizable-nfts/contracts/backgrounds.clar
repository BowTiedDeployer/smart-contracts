;; use the SIP009 interface (testnet)
;; trait deployed by deployer address from ./settings/Devnet.toml
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-trait.nft-trait)

;; define a new NFT. Make sure to replace background
(define-non-fungible-token background uint)

;; define constants
(define-constant ERR-INVALID-NAME (err u301))
(define-constant ERR-NO-RIGHTS (err u403))


;; Store the last issues token ID
(define-data-var last-id uint u0)

(define-map token-url { token-id: uint } { url: (string-ascii 256) })
;; this is used if we want for a given attribute value to give a specific url
;; eg. purple background -> ipfs://dasd..
(define-map name-url { name: (string-ascii 30)} { url: (string-ascii 256) })

(map-set name-url  {name: "MiamiLostOrange"} {url: "ipfs://example/MiamiLostOrange.json"})





;; Claim a new NFT
(define-public (claim)
  (mint tx-sender)
)

;; SIP009: Transfer token to a specified principal
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR-NO-RIGHTS)
    (nft-transfer? background token-id sender recipient)
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
  ;; Make sure to replace background
  (ok (nft-get-owner? background token-id))
)

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-id))
)


(define-read-only (get-token-uri (token-id uint)) 
  (let ((token-urr (get url (map-get? token-url {token-id: token-id})))) 
  (ok 
    (if (is-none token-urr)
      (some "no-link")
      token-urr
    )
  )))


;; Internal - Mint new NFT
(define-private (mint (new-owner principal))
  (let 
    ((next-id (+ u1 (var-get last-id))))
    (var-set last-id next-id)
    (nft-mint? background next-id new-owner)
  )
)

;; pretty sure we don't need this but better to have it for now
(define-public (mint-url (address principal) (url (string-ascii 256)))
   (let 
    ((next-id (+ u1 (var-get last-id))))
    (map-set token-url {token-id: next-id} {url: url})
    (var-set last-id next-id)
    (nft-mint? background next-id address)
  )
)


(define-public (mint-name (address principal) (name (string-ascii 30)))
    ;; define and assign: next-id and url
   (let 
    ((next-id (+ u1 (var-get last-id)))
    (url (get url (map-get? name-url {name: name})))
    )
    (if (is-none url)
      ERR-INVALID-NAME
      (begin 
        (map-set token-url {token-id: next-id} {url: (unwrap-panic url)})
        (var-set last-id next-id)
        (nft-mint? background next-id address)
      )
    ))
)



;; Burn a token
(define-public (burn-token (token-id uint))  
	(begin     
		(asserts! (is-eq (some tx-sender) (nft-get-owner? background token-id) ) ERR-NO-RIGHTS)     
		(nft-burn? background token-id tx-sender)
  )
)
