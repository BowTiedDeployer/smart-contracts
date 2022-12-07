;; Wrapper

;; Constants

(define-constant contract-owner tx-sender)
(define-constant err-not-some (err u99))
(define-constant err-insufficient-balance (err u1))
(define-constant err-owner-only (err u100))

;; Transfer

(define-public (transfer-wrapper (token-id uint) (amount uint) (sender principal) (recipient principal)) 
  (if (< token-id u5) 
    (contract-call? .resources transfer token-id amount sender recipient) 
    (contract-call? .items transfer token-id amount sender recipient)
  )
)

;; Balance

(define-read-only (get-balance-wrapper (token-id uint) (who principal)) 
  (if (< token-id u5) (contract-call? .resources get-balance token-id who) (contract-call? .items get-balance token-id who))
)

;; Mint

(define-public (mint-wrapper (token-id uint) (amount uint) (recipient principal))
  (if (< token-id u5) 
    (contract-call? .resources mint token-id amount tx-sender) 
    (if (< token-id u50) 
      (contract-call? .items mint token-id amount tx-sender) 
      (ok false))
  )
)

;; Burn

(define-public (burn-wrapper (burn-tuple {resource-id: uint, resource-qty: uint}))
  (if (< (get resource-id burn-tuple) u5) (contract-call? .resources burn (get resource-id burn-tuple) (get resource-qty burn-tuple) tx-sender) (contract-call? .items burn (get resource-id burn-tuple) (get resource-qty burn-tuple) tx-sender))
)

;; Ownership

(define-private (is-owned-needed-wrapper (item {resource-id: uint, resource-qty: uint})) 
  (unwrap-panic (if (< (get resource-id item) u5) 
                  (contract-call? .resources is-owned-needed item) 
                  (contract-call? .items is-owned-needed item)
                )
  )
)

;; Level-up

(define-map level-up-system { id: uint } (list 100 { resource-id: uint, resource-qty: uint }))



(define-public (level-up (id-new uint))
  (let ((level-up-resources (unwrap-panic (get-level-up-resources id-new)))
        (verified-ownership (fold and (map is-owned-needed-wrapper (unwrap-panic level-up-resources)) true)))
          (asserts! (is-some level-up-resources) err-not-some)
          (asserts! verified-ownership err-insufficient-balance)
            (some (map burn-wrapper (unwrap-panic level-up-resources)))
            (mint-wrapper id-new u1 tx-sender)
            
    )
)

(define-public (set-level-up-resources (token-id uint) (resource-needed (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set level-up-system {id: token-id} resource-needed))     
  )
)

(define-read-only (get-level-up-resources (token-id uint))
    (let ((token-urr (map-get? level-up-system {id: token-id})))
      (ok token-urr)
    )
)

(map-set level-up-system {id: u6} (list {resource-id: u3, resource-qty: u6} {resource-id: u5, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u7} (list {resource-id: u3, resource-qty: u10} {resource-id: u6, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u9} (list {resource-id: u4, resource-qty: u6} {resource-id: u8, resource-qty: u1} {resource-id: u2, resource-qty: u5}))
(map-set level-up-system {id: u10} (list {resource-id: u4, resource-qty: u10} {resource-id: u9, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u12} (list {resource-id: u3, resource-qty: u8} {resource-id: u4, resource-qty: u8} {resource-id: u11, resource-qty: u1} {resource-id: u2, resource-qty: u8}))
(map-set level-up-system {id: u13} (list {resource-id: u3, resource-qty: u10} {resource-id: u4, resource-qty: u10} {resource-id: u12, resource-qty: u1} {resource-id: u2, resource-qty: u10}))
(map-set level-up-system {id: u15} (list {resource-id: u3, resource-qty: u6} {resource-id: u14, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u16} (list {resource-id: u3, resource-qty: u10} {resource-id: u15, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u18} (list {resource-id: u4, resource-qty: u6} {resource-id: u17, resource-qty: u1} {resource-id: u2, resource-qty: u5}))
(map-set level-up-system {id: u19} (list {resource-id: u4, resource-qty: u10} {resource-id: u18, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u21} (list {resource-id: u3, resource-qty: u8} {resource-id: u4, resource-qty: u8} {resource-id: u20, resource-qty: u1} {resource-id: u2, resource-qty: u8}))
(map-set level-up-system {id: u22} (list {resource-id: u3, resource-qty: u10} {resource-id: u4, resource-qty: u10} {resource-id: u21, resource-qty: u1} {resource-id: u2, resource-qty: u10}))
(map-set level-up-system {id: u24} (list {resource-id: u3, resource-qty: u3} {resource-id: u23, resource-qty: u1} {resource-id: u2, resource-qty: u1}))
(map-set level-up-system {id: u25} (list {resource-id: u3, resource-qty: u5} {resource-id: u24, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u27} (list {resource-id: u4, resource-qty: u3} {resource-id: u26, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u28} (list {resource-id: u4, resource-qty: u5} {resource-id: u27, resource-qty: u1} {resource-id: u2, resource-qty: u4}))
(map-set level-up-system {id: u30} (list {resource-id: u3, resource-qty: u4} {resource-id: u4, resource-qty: u4} {resource-id: u29, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u31} (list {resource-id: u3, resource-qty: u6} {resource-id: u4, resource-qty: u6} {resource-id: u30, resource-qty: u1} {resource-id: u2, resource-qty: u7}))
(map-set level-up-system {id: u33} (list {resource-id: u3, resource-qty: u3} {resource-id: u32, resource-qty: u1} {resource-id: u2, resource-qty: u1}))
(map-set level-up-system {id: u34} (list {resource-id: u3, resource-qty: u5} {resource-id: u33, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u36} (list {resource-id: u4, resource-qty: u3} {resource-id: u35, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u37} (list {resource-id: u4, resource-qty: u5} {resource-id: u36, resource-qty: u1} {resource-id: u2, resource-qty: u4}))
(map-set level-up-system {id: u39} (list {resource-id: u3, resource-qty: u4} {resource-id: u4, resource-qty: u4} {resource-id: u38, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u40} (list {resource-id: u3, resource-qty: u6} {resource-id: u4, resource-qty: u6} {resource-id: u39, resource-qty: u1} {resource-id: u2, resource-qty: u7}))
(map-set level-up-system {id: u42} (list {resource-id: u3, resource-qty: u2} {resource-id: u41, resource-qty: u1} {resource-id: u2, resource-qty: u1}))
(map-set level-up-system {id: u43} (list {resource-id: u3, resource-qty: u4} {resource-id: u42, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u45} (list {resource-id: u4, resource-qty: u2} {resource-id: u44, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u46} (list {resource-id: u4, resource-qty: u4} {resource-id: u45, resource-qty: u1} {resource-id: u2, resource-qty: u4}))
(map-set level-up-system {id: u48} (list {resource-id: u3, resource-qty: u3} {resource-id: u4, resource-qty: u3} {resource-id: u47, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u49} (list {resource-id: u3, resource-qty: u5} {resource-id: u4, resource-qty: u5} {resource-id: u48, resource-qty: u1} {resource-id: u2, resource-qty: u7}))

;; Crafting

(define-map crafting-system { id: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (craft-item (id-new uint))
  (let ((crafting-resources (unwrap-panic (get-crafting-resources id-new)))
        (verified-ownership (fold and (map is-owned-needed-wrapper (unwrap-panic crafting-resources)) true)))
          (asserts! (is-some crafting-resources) err-not-some)
          (asserts! verified-ownership err-insufficient-balance)
            (some (map burn-wrapper (unwrap-panic crafting-resources)))
            (mint-wrapper id-new u1 tx-sender)
  )
)

(define-public (set-crafting-resources (token-id uint) (resource-needed (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set crafting-system {id: token-id} resource-needed))     
  )
)

(define-read-only (get-crafting-resources (token-id uint))
    (let ((token-urr (map-get? crafting-system {id: token-id})))
      (ok token-urr)
    )
)

(map-set crafting-system {id: u5} (list {resource-id: u3, resource-qty: u4}))
(map-set crafting-system {id: u8} (list {resource-id: u4, resource-qty: u4}))
(map-set crafting-system {id: u11} (list {resource-id: u7, resource-qty: u1} {resource-id: u10, resource-qty: u1} {resource-id: u2, resource-qty: u7}))
(map-set crafting-system {id: u14} (list {resource-id: u3, resource-qty: u4}))
(map-set crafting-system {id: u17} (list {resource-id: u4, resource-qty: u4}))
(map-set crafting-system {id: u20} (list {resource-id: u16, resource-qty: u1} {resource-id: u19, resource-qty: u1} {resource-id: u2, resource-qty: u7}))
(map-set crafting-system {id: u23} (list {resource-id: u3, resource-qty: u2}))
(map-set crafting-system {id: u26} (list {resource-id: u4, resource-qty: u2}))
(map-set crafting-system {id: u29} (list {resource-id: u25, resource-qty: u1} {resource-id: u28, resource-qty: u1} {resource-id: u2, resource-qty: u5}))
(map-set crafting-system {id: u32} (list {resource-id: u3, resource-qty: u2}))
(map-set crafting-system {id: u35} (list {resource-id: u4, resource-qty: u2}))
(map-set crafting-system {id: u38} (list {resource-id: u34, resource-qty: u1} {resource-id: u37, resource-qty: u1} {resource-id: u2, resource-qty: u5}))
(map-set crafting-system {id: u41} (list {resource-id: u3, resource-qty: u1}))
(map-set crafting-system {id: u44} (list {resource-id: u4, resource-qty: u1}))
(map-set crafting-system {id: u47} (list {resource-id: u43, resource-qty: u1} {resource-id: u46, resource-qty: u1} {resource-id: u2, resource-qty: u5}))

;; Acquisition

(define-map acquisition-system { id: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (buy-item (id-new uint))
  (let ((acquisition-resources (unwrap-panic (get-acquisition-resources id-new)))
        (verified-ownership (fold and (map is-owned-needed-wrapper (unwrap-panic acquisition-resources)) true)))
          (asserts! (is-some acquisition-resources) err-not-some)
          (asserts! verified-ownership err-insufficient-balance)
            (some (map burn-wrapper (unwrap-panic acquisition-resources)))
            (mint-wrapper id-new u1 tx-sender)
    )
)


(define-public (set-acquisition-resources (token-id uint) (resource-needed (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set acquisition-system {id: token-id} resource-needed))     
  )
)

(define-read-only (get-acquisition-resources (token-id uint))
    (let ((token-urr (map-get? acquisition-system {id: token-id})))
      (ok token-urr)
    )
)

(map-set acquisition-system {id: u5} (list {resource-id: u1, resource-qty: u15}))
(map-set acquisition-system {id: u6} (list {resource-id: u1, resource-qty: u40} {resource-id: u3, resource-qty: u7}))
(map-set acquisition-system {id: u9} (list {resource-id: u1, resource-qty: u5} {resource-id: u4, resource-qty: u20}))
(map-set acquisition-system {id: u12} (list {resource-id: u1, resource-qty: u500} {resource-id: u3, resource-qty: u11} {resource-id: u4, resource-qty: u11}))
(map-set acquisition-system {id: u14} (list {resource-id: u1, resource-qty: u15}))
(map-set acquisition-system {id: u16} (list {resource-id: u1, resource-qty: u50} {resource-id: u3, resource-qty: u17}))
(map-set acquisition-system {id: u18} (list {resource-id: u1, resource-qty: u5} {resource-id: u4, resource-qty: u20}))
(map-set acquisition-system {id: u21} (list {resource-id: u1, resource-qty: u400} {resource-id: u3, resource-qty: u12} {resource-id: u4, resource-qty: u12}))
(map-set acquisition-system {id: u25} (list {resource-id: u1, resource-qty: u15} {resource-id: u3, resource-qty: u4}))
(map-set acquisition-system {id: u27} (list {resource-id: u1, resource-qty: u230} {resource-id: u4, resource-qty: u3}))
(map-set acquisition-system {id: u30} (list {resource-id: u1, resource-qty: u670} {resource-id: u3, resource-qty: u7} {resource-id: u4, resource-qty: u7}))
(map-set acquisition-system {id: u34} (list {resource-id: u1, resource-qty: u150} {resource-id: u3, resource-qty: u4}))
(map-set acquisition-system {id: u36} (list {resource-id: u1, resource-qty: u230} {resource-id: u4, resource-qty: u3}))
(map-set acquisition-system {id: u38} (list {resource-id: u1, resource-qty: u370} {resource-id: u3, resource-qty: u6} {resource-id: u4, resource-qty: u6}))
(map-set acquisition-system {id: u42} (list {resource-id: u1, resource-qty: u25} {resource-id: u3, resource-qty: u2}))
(map-set acquisition-system {id: u43} (list {resource-id: u1, resource-qty: u120} {resource-id: u3, resource-qty: u5}))
(map-set acquisition-system {id: u45} (list {resource-id: u1, resource-qty: u1} {resource-id: u4, resource-qty: u10}))