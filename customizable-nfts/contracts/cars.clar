;; use the SIP009 interface (testnet)
;; trait deployed by deployer address from ./settings/Devnet.toml
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-trait.nft-trait)

;; define a new NFT. Make sure to replace car
(define-non-fungible-token car uint)

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
;; eg. purple lambo car -> ipfs://dasd..
(define-map name-url { name: (string-ascii 30)} { url: (string-ascii 256) })

(map-set name-url  {name: "BentleyBlack"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/BentleyBlack.json"})
(map-set name-url  {name: "BentleyBlood"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/BentleyBlood.json"})
(map-set name-url  {name: "BentleyGold"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/BentleyGold.json"})
(map-set name-url  {name: "BentleyGrey"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/BentleyGrey.json"})
(map-set name-url  {name: "BentleyMidnigh"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/BentleyMidnigh.json"})
(map-set name-url  {name: "BentleyWhite"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/BentleyWhite.json"})
(map-set name-url  {name: "LamboBlue"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/LamboBlue.json"})
(map-set name-url  {name: "LamboEmerald"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/LamboEmerald.json"})
(map-set name-url  {name: "LamboGold"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/LamboGold.json"})
(map-set name-url  {name: "LamboGrey"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/LamboGrey.json"})
(map-set name-url  {name: "LamboPearlescent"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/LamboPearlescent.json"})
(map-set name-url  {name: "LamboRed"} {url: "ipfs://QmQS3yUWMQUvKhd6HUNHroQniW8KWC26yHaNcJAErFRD5B/LamboRed.json"})

;; Owner
(define-data-var contract-owner principal tx-sender)



;; SIP009: Transfer token to a specified principal
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-no-rights)
    (nft-transfer? car token-id sender recipient)
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
  ;; Make sure to replace car
  (ok (nft-get-owner? car token-id))
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
      (nft-mint? car next-id new-owner)
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
          (nft-mint? car next-id address)
        )
      )
    )
  )
)

;; Burn a token
(define-public (burn-token (token-id uint))  
	(begin     
		(asserts! (is-eq (some tx-sender) (nft-get-owner? car token-id) ) err-no-rights)     
		(nft-burn? car token-id tx-sender)
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
