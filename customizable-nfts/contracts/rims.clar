;; use the SIP009 interface (testnet)
;; trait deployed by deployer address from ./settings/Devnet.toml
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-trait.nft-trait)

;; define a new NFT. Make sure to replace rims
(define-non-fungible-token rims uint)

;; define errors
(define-constant err-owner-only (err u100))
(define-constant err-already-locked (err u101))
(define-constant err-more-votes-than-members-required (err u102))
(define-constant err-not-a-member (err u103))
(define-constant err-votes-required-not-met (err u104))
(define-constant err-invalid-name (err u301))
(define-constant err-no-rights (err u403))


;; Store the last issues token ID
(define-data-var last-id uint u0)

(define-map token-url { token-id: uint } { url: (string-ascii 256) })
;; this is used if we want for a given attribute value to give a specific url
;; eg. purple rims -> ipfs://dasd..
(define-map name-url { name: (string-ascii 30)} { url: (string-ascii 256) })

(map-set name-url  {name: "ClassyCream"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/ClassyCream.json"})
(map-set name-url  {name: "ClassyDark"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/ClassyDark.json"})
(map-set name-url  {name: "ClassyGold"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/ClassyGold.json"})
(map-set name-url  {name: "ClassySilver"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/ClassySilver.json"})
(map-set name-url  {name: "ClassyWhite"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/ClassyWhite.json"})
(map-set name-url  {name: "SportyBlack"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/SportyBlack.json"})
(map-set name-url  {name: "SportyBlue"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/SportyBlue.json"})
(map-set name-url  {name: "SportyGold"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/SportyGold.json"})
(map-set name-url  {name: "SportyGrey"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/SportyGrey.json"})
(map-set name-url  {name: "SportyLime"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/SportyLime.json"})
(map-set name-url  {name: "SportyPearlescent"} {url: "ipfs://QmUh73UmNY297dg7h5kEQbWZD5rKZgDNzc1dCRGXswLoFM/SportyPearlescent.json"})

;; Owner
(define-data-var contract-owner principal tx-sender)



;; SIP009: Transfer token to a specified principal
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-no-rights)
    (nft-transfer? rims token-id sender recipient)
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
  ;; Make sure to replace rims
  (ok (nft-get-owner? rims token-id))
)

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-id))
)


(define-read-only (get-token-uri (token-id uint)) 
  (let ((token-urr (get url (map-get? token-url {token-id: token-id})))) 
  (ok token-urr)
  )
)


;; Internal - Mint new NFT
(define-private (mint (new-owner principal))
  (begin 
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (let 
      ((next-id (+ u1 (var-get last-id))))
      (var-set last-id next-id)
      (nft-mint? rims next-id new-owner)
    )
  )
)

(define-public (mint-name (address principal) (name (string-ascii 30)))
    ;; define and assign: next-id and url
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (let 
      (
        (next-id (+ u1 (var-get last-id)))
        (url (get url (map-get? name-url {name: name})))
      )
      (if (is-none url)
        err-invalid-name
        (begin 
          (map-set token-url {token-id: next-id} {url: (unwrap-panic url)})
          (var-set last-id next-id)
          (nft-mint? rims next-id address)
        )
      )
    )
  )
)

;; Burn a token
(define-public (burn-token (token-id uint))  
	(begin     
		(asserts! (is-eq (some tx-sender) (nft-get-owner? rims token-id) ) err-no-rights)     
		(nft-burn? rims token-id tx-sender)
  )
)

(define-read-only (get-name-url (name (string-ascii 30)))
  (map-get? name-url {name: name})
)

(define-public (set-name-url (name (string-ascii 30)) (url (string-ascii 30))) 
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (ok (map-set name-url {name: name} {url: url}))
  )
)

(define-public (remove-name-url (name (string-ascii 30))) 
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (ok (map-delete name-url {name: name}))
  )
)