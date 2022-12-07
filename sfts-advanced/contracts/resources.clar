(impl-trait .sip013-semi-fungible-token-trait.sip013-semi-fungible-token-trait)
(impl-trait .sip013-transfer-many-trait.sip013-transfer-many-trait)


(define-fungible-token semi-fungible-token)
(define-non-fungible-token semi-fungible-token-id {token-id: uint, owner: principal})
(define-map token-balances {token-id: uint, owner: principal} uint)
(define-map token-supplies uint uint)
(define-constant contract-owner tx-sender)

(define-constant err-owner-only (err u100))
(define-constant err-insufficient-balance (err u1))
(define-constant err-invalid-sender (err u4))
(define-constant err-invalid-destination-contract (err u5))


(define-read-only (is-owned-needed (item {resource-id: uint, resource-qty: uint}))
  (ok (>= (get-balance-uint (get resource-id item) tx-sender) (get resource-qty item)))
)

(define-private (tag-nft-token-id (nft-token-id {token-id: uint, owner: principal}))
  (begin
    (and
      (is-some (nft-get-owner? semi-fungible-token-id nft-token-id))
      (try! (nft-burn? semi-fungible-token-id nft-token-id (get owner nft-token-id)))
    )
    (nft-mint? semi-fungible-token-id nft-token-id (get owner nft-token-id))
  )
)

(define-public (mint (token-id uint) (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (< token-id u5) err-invalid-destination-contract)
    (try! (ft-mint? semi-fungible-token amount recipient))
    (try! (tag-nft-token-id {token-id: token-id, owner: recipient}))
    (set-balance token-id (+ (get-balance-uint token-id recipient) amount) recipient)
    (map-set token-supplies token-id (+  (unwrap-panic (get-total-supply token-id)) amount))
    (print {type: "sft_mint", token-id: token-id, amount: amount, recipient: recipient})
    (ok true)
  )
)

(define-private (set-balance (token-id uint) (balance uint) (owner principal))
  (map-set token-balances {token-id: token-id, owner: owner} balance)
)

(define-private (get-balance-uint (token-id uint) (who principal))
  (default-to u0 (map-get? token-balances {token-id: token-id, owner: who}))
)

(define-read-only (get-balance (token-id uint) (who principal))
  (ok (get-balance-uint token-id who))
)

(define-read-only (get-overall-balance (who principal))
  (ok (ft-get-balance semi-fungible-token who))
)

(define-read-only (get-total-supply (token-id uint))
  (ok (default-to u0 (map-get? token-supplies token-id)))
)

(define-read-only (get-overall-supply)
  (ok (ft-get-supply semi-fungible-token))
)

(define-read-only (get-decimals (token-id uint))
  (ok u0)
)


;; Transfer

(define-public (transfer (token-id uint) (amount uint) (sender principal) (recipient principal))
  (let
    (
      (sender-balance (get-balance-uint token-id sender))
    )
    (asserts! (or (is-eq sender tx-sender) (is-eq sender contract-caller)) err-invalid-sender)
    (asserts! (<= amount sender-balance) err-insufficient-balance)
    (try! (ft-transfer? semi-fungible-token amount sender recipient))
    (try! (tag-nft-token-id {token-id: token-id, owner: sender}))
    (try! (tag-nft-token-id {token-id: token-id, owner: recipient}))
    (set-balance token-id (- sender-balance amount) sender)
    (set-balance token-id (+ (get-balance-uint token-id recipient) amount) recipient)
    (print {type: "sft_transfer", token-id: token-id, amount: amount, sender: sender, recipient: recipient})
    (ok true)
  )
)

(define-public (transfer-many (transfers (list 200 {token-id: uint, amount: uint, sender: principal, recipient: principal})))
  (fold transfer-many-iter transfers (ok true))
)

(define-public (transfer-memo (token-id uint) (amount uint) (sender principal) (recipient principal) (memo (buff 34)))
  (begin
    (try! (transfer token-id amount sender recipient))
    (print memo)
    (ok true)
  )
)


(define-public (transfer-many-memo (transfers (list 200 {token-id: uint, amount: uint, sender: principal, recipient: principal, memo: (buff 34)})))
  (fold transfer-many-memo-iter transfers (ok true))
)

(define-public (transfer-wrapper (transfer-tuple {resource-id: uint, resource-qty: uint})) 
  (transfer (get resource-id transfer-tuple) (get resource-qty transfer-tuple) tx-sender 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG)
)

(define-private (transfer-many-iter (item {token-id: uint, amount: uint, sender: principal, recipient: principal}) (previous-response (response bool uint)))
  (match previous-response prev-ok (transfer (get token-id item) (get amount item) (get sender item) (get recipient item)) prev-err previous-response)
)

(define-private (transfer-many-memo-iter (item {token-id: uint, amount: uint, sender: principal, recipient: principal, memo: (buff 34)}) (previous-response (response bool uint)))
  (match previous-response prev-ok (transfer-memo (get token-id item) (get amount item) (get sender item) (get recipient item) (get memo item)) prev-err previous-response)
)

;; Burn

(define-public (burn (token-id uint) (amount uint) (sender principal))
  (let
    (
      (sender-balance (get-balance-uint token-id sender))
    )
    (asserts! (or (is-eq sender tx-sender) (is-eq sender contract-caller)) err-invalid-sender)
    (asserts! (<= amount sender-balance) err-insufficient-balance)
    (try! (ft-burn? semi-fungible-token amount sender))
    (try! (tag-nft-token-id {token-id: token-id, owner: sender}))
    (set-balance token-id (- sender-balance amount) sender)
    (print {type: "sft_burn", token-id: token-id, amount: amount, sender: sender})
    (ok true)
  )
)

(define-public (burn-wrapper (burn-tuple {resource-id: uint, resource-qty: uint})) 
  (burn (get resource-id burn-tuple) (get resource-qty burn-tuple) tx-sender)
)

;; Token URI

(define-map token-uri { id: uint } { url: (string-ascii 256) })

(define-public (set-token-uri (token-id uint) (token-url (string-ascii 256)))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (map-set token-uri {id: token-id} {url: token-url}) 
    (ok true)    
  )
)

(define-read-only (get-token-uri (token-id uint))
    (let ((token-urr  (get url (map-get? token-uri {id: token-id}))))
      (ok token-urr)
    )
)

(map-set token-uri {id: u1} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/1.png"})
(map-set token-uri {id: u2} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/2.png"})
(map-set token-uri {id: u3} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/3.png"})
(map-set token-uri {id: u4} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/4.png"})

;; Token Name

(define-map token-name { id: uint } { name: (string-ascii 256), type: (string-ascii 256), values: {dmg: uint, health: uint, defense: uint} })

(define-constant err-not-some (err u99))

(map-set token-name {id: u1} {name: "gold", type: "resource", values: {dmg: u0, health: u0, defense: u0}})
(map-set token-name {id: u2} {name: "energy-power", type: "resource", values: {dmg: u0, health: u0, defense: u0}})
(map-set token-name {id: u3} {name: "wood", type: "resource", values: {dmg: u0, health: u0, defense: u0}})
(map-set token-name {id: u4} {name: "iron", type: "resource", values: {dmg: u0, health: u0, defense: u0}})
