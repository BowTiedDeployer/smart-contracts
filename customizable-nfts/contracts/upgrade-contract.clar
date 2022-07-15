
;; upgrade-contract
;; <add a description here>

;; constants
;;

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
