
;; upgrade-contract
;; <add a description here>

;; constants
;;
(define-constant INVALID u300)

;; data maps and vars
;;

;; private functions
;;

;; public functions
;;

(define-public (disassemble-call (token-id uint)) 
	(begin     
		(asserts! (is-eq (some tx-sender) (unwrap-panic (contract-call? .degen-nft get-owner token-id))) (err u403))     
		(unwrap-panic (contract-call? .degen-nft burn-token token-id))
    ;; mint in those collections
    (unwrap-panic (contract-call? .body-kits claim ))
    (unwrap-panic (contract-call? .backgrounds claim ))
    (unwrap-panic (contract-call? .dgn-heads claim ))
    (contract-call? .wheels claim )
  )
)



(define-public (assemble (background-id uint) (body-id uint) (rim-id uint) (head-id uint) (metadata-uri (string-ascii 99)))
  (begin
    (unwrap! (contract-call? .backgrounds burn-token background-id) (err INVALID))
    (unwrap! (contract-call? .body-kits burn-token body-id) (err INVALID))
    (unwrap! (contract-call? .wheels burn-token rim-id) (err INVALID))
    (unwrap! (contract-call? .dgn-heads burn-token head-id) (err INVALID))
  
    (contract-call? .degen-nft claim )
  )
)
