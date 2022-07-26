;;
;; run-case
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.degen-nft mint-url 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5 "11111")    
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract disassemble u3 "background-eg" "not-yet" "not-yet" "not-yet")
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.backgrounds get-token-uri u1)

;; upgrade-contract
;; Wrapper which is combining parts and degens

;; Owner
(define-data-var contract-owner principal tx-sender)


;; constants
(define-constant INVALID u300)
(define-constant TOO_MANY_DISSASSEMBLE u200)

;; public functions
(define-public (disassemble (token-id uint) (background-name (string-ascii 30)) (body-name (string-ascii 30)) (rim-name (string-ascii 30)) (head-name (string-ascii 30))) 
	(begin     
		;; (asserts! (is-eq (some tx-sender) (unwrap-panic (contract-call? .degen-nft get-owner token-id))) (err u403)) 
    ;; if not the owner, the burn function will throw the error     
		;; (unwrap-panic (contract-call? .degen-nft burn-token token-id))
    ;; mint in component collections
    ;; (unwrap-panic (contract-call? .backgrounds mint-url tx-sender background-url))
    ;; TODO: if alright,do the same for the other components 
    ;; (unwrap-panic (contract-call? .body-kits claim ))
    ;; (unwrap-panic (contract-call? .wheels claim ))
    (contract-call? .dgn-heads claim )
  )
)

;; Queue for work
(define-data-var work-queue (list 100 {member: principal, token-id: uint}) (list))


(define-public (get-work-queue)
  (begin  
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err INVALID))
    ;; Get the actual work-queue so that we can process it
    (ok (var-get work-queue))
  )
)

(define-public (get-head-work-queue)
  (begin  
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err INVALID))
    ;; Get the first element in the work queue so that we can process it
    (ok (element-at (var-get work-queue) u0))
  )
)

(define-public (add-work-in-queue (token-id uint))
  (ok 
    (let 
      (
        (work-queue-value (var-get work-queue))
        (value-to-add {token-id: token-id, member: tx-sender})
      )
    
      (var-set work-queue
        (begin
          ;; check user has not already inserted this
          (asserts! 
            (is-none (index-of work-queue-value value-to-add))
            (err INVALID)
          )
          ;; check user is not abusing the queue
          (asserts! 
            (< (len (filter is-value-for-principal work-queue-value)) u5)
            (err TOO_MANY_DISSASSEMBLE)
          )
          ;; TODO(Deployer): add an assert to make sure token-id is owned by tx-sender
          ;; TODO(Deployer): burn degen

          (append 
            (unwrap-panic (as-max-len? work-queue-value u99)) 
            {token-id: token-id, member: tx-sender}
          )
        )
      )
    )
  )
)

(define-public (pop-work-queue)
  (ok 
    (let
      ((work-queue-value (var-get work-queue)))

      (var-set work-queue
        (begin
          ;; Check that admin is calling this contract
          (asserts! (is-eq tx-sender (var-get contract-owner)) (err INVALID))
          ;; Remove first element in list
          (filter is-first-element work-queue-value)
        )
      )
    )
  )
)

(define-private (is-value-for-principal (value (tuple (token-id uint) (member principal))))
  (is-eq (get member value) tx-sender)
)

(define-private (is-first-element (value (tuple (token-id uint) (member principal))))
  (let
    ((first-element (element-at (var-get work-queue) u0)))

    (not 
      (and
        (is-some first-element)
        (is-eq value (unwrap-panic first-element))
      )
    )
  )
)

;; (define-public (remove-work-from-queue))


;; Utility functions
;; (define-private (is-admin) 
;;   (begin
;;     (asserts! (is-eq tx-sender (var-get contract-owner)) (err INVALID))
;;     (ok none)
;;   )
;; )



;; A map that creates a map from the user who is calling disassemble and the token id which is needed.
(define-map user-request-to-disassemble principal (list 5 uint))


;; adding work for user - called by user to add token in queue
(define-public (add-work-for-user (token-id uint))
  (let ((user-request (map-get? user-request-to-disassemble tx-sender)))
    (if (is-none user-request)
      ;; first time we are seeing the user
      (ok (add-user-to-request token-id))
      (
        let ((
          user-request-list 
          (unwrap-panic user-request)
        )) 
        (
          ;; adding work to the existing queue of work
          add-token-to-user-request-list token-id (unwrap-panic (as-max-len? user-request-list u4))
        )
      )      
      ;; (ok ((map-set user-request-to-disassemble tx-sender (add-token-to-user-request-list token-id user-request))))
    )
  )
)

(define-private (add-user-to-request (token-id uint))
  (begin 
    (map-insert user-request-to-disassemble tx-sender (list token-id))
  )
)

(define-private (add-token-to-user-request-list (token-id uint) (request-list (list 4 uint)))
  (begin 
    ;; check that the token id is not already queued
    (asserts! (is-none (index-of request-list token-id)) (err INVALID))
    (ok (map-set user-request-to-disassemble tx-sender (concat request-list (list token-id))))
  ) 
)

(define-public (get-work-in-progress)
  (get-work-in-progress-for-principal tx-sender)
)

(define-public (get-work-in-progress-admin (member principal))
  (begin 
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err INVALID))
    (get-work-in-progress-for-principal member)
  )
)

(define-private (get-work-in-progress-for-principal (member principal))
  (let ((user-request (map-get? user-request-to-disassemble member)))
    (if (not (is-none user-request))
      (ok user-request)
      (err INVALID)
    )
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



