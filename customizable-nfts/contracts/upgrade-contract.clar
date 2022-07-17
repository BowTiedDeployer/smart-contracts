
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
;; run-case
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.degen-nft mint-url 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5 "11111")    
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract disassemble u3 "background-eg" "not-yet" "not-yet" "not-yet")
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.backgrounds get-token-uri u1)
(define-public (disassemble (token-id uint) (background-url (string-ascii 256)) (body-url (string-ascii 256)) (rim-url (string-ascii 256)) (head-url (string-ascii 256))) 
	(begin     
		;; (asserts! (is-eq (some tx-sender) (unwrap-panic (contract-call? .degen-nft get-owner token-id))) (err u403)) 
    ;; if not the owner, the burn function will throw the error     
		(unwrap-panic (contract-call? .degen-nft burn-token token-id))
    ;; mint in component collections
    (unwrap-panic (contract-call? .backgrounds mint-url tx-sender background-url))
    ;; TODO: if alright,do the same for the other components 
    (unwrap-panic (contract-call? .body-kits claim ))
    (unwrap-panic (contract-call? .wheels claim ))
    (contract-call? .dgn-heads claim )
  )
)

;; helper for running and 'pseudo' testing
(define-public (mint-components )
  (begin
    (unwrap-panic (contract-call? .backgrounds mint-name tx-sender "MiamiLostOrange"))
    (unwrap-panic (contract-call? .body-kits claim ))
    (unwrap-panic (contract-call? .wheels claim ))
    (contract-call? .dgn-heads claim )
  )
)


;; run-case
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract mint-components)
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract assemble "custom-degen-url" u2 u2 u2 u2)
(define-public (assemble (metadata-url (string-ascii 99)) (background-id uint) (body-id uint) (rim-id uint) (head-id uint))
  (begin
    (unwrap! (contract-call? .backgrounds burn-token background-id) (err INVALID))
    (unwrap! (contract-call? .body-kits burn-token body-id) (err INVALID))
    (unwrap! (contract-call? .wheels burn-token rim-id) (err INVALID))
    (unwrap! (contract-call? .dgn-heads burn-token head-id) (err INVALID))
    (contract-call? .degen-nft mint-url tx-sender metadata-url)  
  )
)


;; swap burning and minting another nft
;;
;; degen-url metadata for the new generated degen
;; component-url metadata for the new generated component
;; (define-public (swap-burn (degen-id uint) (component-type (string-ascii 99)) (component-id uint) 
;;   (degen-url (string-ascii 99))
;;   (component-name (string-ascii 30)) 
;;   )
;;   (begin 
;;     (unwrap! (contract-call? .degen-nft burn-token degen-id) (err INVALID)) 
;;     (unwrap! (contract-call? .backgrounds burn-token component-id) (err INVALID))
;;     (unwrap! (contract-call? .degen-nft mint-url tx-sender degen-url) (err INVALID))
;;     (contract-call? .backgrounds mint-name tx-sender component-name)
;;   )
;; )


;; swap changing metadata and notifying about it
;;
;; contract calls from zero to this
;;
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract mint-components)
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract mint-components)
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract assemble "custom-degen-url" u2 u2 u2 u2)
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract swap u3 "background" u1 "new-custom-degen-url" "MiamiLostOrange")
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.degen-nft get-token-uri u3)
(define-public (swap (degen-id uint) (component-type (string-ascii 99)) (component-id uint) 
  (degen-url (string-ascii 99))
  (component-name (string-ascii 30))
  ) 
  (begin
    ;; can also change component uri and not burn mint another - not so important rn
    (unwrap! (contract-call? .backgrounds burn-token component-id)  (err INVALID))
    (unwrap! (contract-call? .backgrounds mint-name tx-sender component-name) (err INVALID))
    ;; change url
    (unwrap! (contract-call? .degen-nft update-uri degen-id degen-url) (err INVALID))
    ;; trigger metadata update notifier for Degen SM and id of the swapped Degen
    (contract-call? .token-metadata-update-notify nft-metadata-update-notify 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.degen-nft (list degen-id))

  )
)



