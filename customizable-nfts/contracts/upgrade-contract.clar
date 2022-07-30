;; upgrade-contract
;; Wrapper which is combining parts and degens

;; TODO(Deployer): We need to get paid for this

;; Owner
(define-data-var contract-owner principal tx-sender)


;; constants
(define-constant err-invalid (err u300))
(define-constant err-too-many-disassemble (err u200))
(define-constant err-not-owner (err u100))
(define-constant err-component-type-invalid (err u501))


(define-constant background-type "background-type")
(define-constant body-type "body-type")
(define-constant rims-type "rims-type")
(define-constant head-type "head-type")

;; public functions

;; Disassemble

;; eg. case
;; (contract-call? .degen-nft mint-url tx-sender "urlMiamiLostOrange")
;; (contract-call? .upgrade-contract add-disassemble-work-in-queue u3)
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract disassemble-finalize u3 tx-sender "MiamiLostOrange" "MiamiLostOrange" "MiamiLostOrange" "MiamiLostOrange")
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.body-kits get-token-uri u1)

(define-public (disassemble-finalize (token-id uint) (member principal) (background-name (string-ascii 30)) (body-name (string-ascii 30)) (rim-name (string-ascii 30)) (head-name (string-ascii 30))) 
	(begin     
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
    (unwrap-panic (contract-call? .backgrounds mint-name member background-name))
    (unwrap-panic (contract-call? .body-kits mint-name member body-name))
    (unwrap-panic (contract-call? .dgn-heads mint-name member rim-name))
    (unwrap-panic (contract-call? .wheels mint-name member head-name))    
    (pop-disassemble-work-queue)
  )
)

;; Queue for work
(define-data-var disassemble-work-queue (list 100 {member: principal, token-id: uint}) (list))

(define-public (get-disassemble-work-queue)
  (begin  
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
    ;; Get the actual work-queue so that we can process it
    (ok (var-get disassemble-work-queue))
  )
)

(define-public (get-disassemble-head-work-queue)
  (begin  
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
    ;; Get the first element in the work queue so that we can process it
    (ok (element-at (var-get disassemble-work-queue) u0))
  )
)

(define-public (add-disassemble-work-in-queue (token-id uint))
  (ok 
    (let 
      (
        (work-queue-value (var-get disassemble-work-queue))
        (value-to-add {token-id: token-id, member: tx-sender})
      )
    
      (var-set disassemble-work-queue
        (begin
          ;; check user has not already inserted this
          (asserts! 
            (is-none (index-of work-queue-value value-to-add))
            err-invalid
          )
          ;; check user is not abusing the queue
          (asserts! 
            (< (len (filter is-disassemble-value-for-principal work-queue-value)) u5)
            err-too-many-disassemble
          )
          ;; check user is owner of nft
          (asserts! 
            (is-eq (some tx-sender) (unwrap-panic (contract-call? .degen-nft get-owner token-id))) 
            err-not-owner
          )    
          (if (is-eq tx-sender (var-get contract-owner)) true (try! (fee-processing)))
          (unwrap-panic (contract-call? .degen-nft burn-token token-id))
          (append 
            (unwrap-panic (as-max-len? work-queue-value u99)) 
            value-to-add
          )
        )
      )
    )
  )
)

(define-public (pop-disassemble-work-queue)
  (ok 
    (let
      ((work-queue-value (var-get disassemble-work-queue)))

      (var-set disassemble-work-queue
        (begin
          ;; Check that admin is calling this contract
          (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
          ;; Remove first element in list
          (filter is-disassemble-first-element work-queue-value)
        )
      )
    )
  )
)


(define-private (is-disassemble-first-element (value (tuple (token-id uint) (member principal))))
  (let
    ((first-element (element-at (var-get disassemble-work-queue) u0)))

    (not 
      (and
        (is-some first-element)
        (is-eq value (unwrap-panic first-element))
      )
    )
  )
)


;; Helper functions

(define-private (is-disassemble-value-for-principal (value (tuple (token-id uint) (member principal))))
  (is-eq (get member value) tx-sender)
)

(define-private (fee-processing)
  (stx-transfer? u10000 tx-sender (var-get contract-owner))
)


;; Template

;; (define-data-var work-queue (list 100 {member: principal, token-id: uint}) (list))

;; (define-public (get-work-queue)
;;   (begin  
;;     ;; Check that admin is calling this contract
;;     (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
;;     ;; Get the actual work-queue so that we can process it
;;     (ok (var-get work-queue))
;;   )
;; )

;; (define-public (get-head-work-queue)
;;   (begin  
;;     ;; Check that admin is calling this contract
;;     (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
;;     ;; Get the first element in the work queue so that we can process it
;;     (ok (element-at (var-get work-queue) u0))
;;   )
;; )

;; (define-public (add-work-in-queue (token-id uint))
;;   (ok 
;;     (let 
;;       (
;;         (work-queue-value (var-get work-queue))
;;         (value-to-add {token-id: token-id, member: tx-sender})
;;       )
    
;;       (var-set work-queue
;;         (begin
;;           ;; check user has not already inserted this
;;           (asserts! 
;;             (is-none (index-of work-queue-value value-to-add))
;;             err-invalid
;;           )
;;           ;; check user is not abusing the queue
;;           (asserts! 
;;             (< (len (filter is-value-for-principal work-queue-value)) u5)
;;             err-too-many-disassemble
;;           )
;;           ;; check user is owner of nft
;;           (asserts! 
;;             (is-eq (some tx-sender) (unwrap-panic (contract-call? .degen-nft get-owner token-id))) 
;;             err-not-owner
;;           )    
      		;; (unwrap-panic (contract-call? .degen-nft burn-token token-id))


;;           (append 
;;             (unwrap-panic (as-max-len? work-queue-value u99)) 
            ;; value-to-add
;;           )
;;         )
;;       )
;;     )
;;   )
;; )

;; (define-public (pop-work-queue)
;;   (ok 
;;     (let
;;       ((work-queue-value (var-get work-queue)))

;;       (var-set work-queue
;;         (begin
;;           ;; Check that admin is calling this contract
;;           (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
;;           ;; Remove first element in list
;;           (filter is-first-element work-queue-value)
;;         )
;;       )
;;     )
;;   )
;; )

;; (define-private (is-value-for-principal (value (tuple (token-id uint) (member principal))))
;;   (is-eq (get member value) tx-sender)
;; )


;; (define-private (is-first-element (value (tuple (token-id uint) (member principal))))
;;   (let
;;     ((first-element (element-at (var-get work-queue) u0)))

;;     (not 
;;       (and
;;         (is-some first-element)
;;         (is-eq value (unwrap-panic first-element))
;;       )
;;     )
;;   )
;; )










(define-public (assemble (metadata-url (string-ascii 99)))
  (begin
    ;; (unwrap! (contract-call? .backgrounds burn-token background-id) err-invalid)
    ;; (unwrap! (contract-call? .body-kits burn-token body-id) err-invalid)
    ;; (unwrap! (contract-call? .wheels burn-token rim-id) err-invalid)
    ;; (unwrap! (contract-call? .dgn-heads burn-token head-id) err-invalid)

    ;; TODO(Deployer): For extra safety we can add a param with what work we are expecting to do and check that is in the queue before bindly popping
    (unwrap-panic (pop-assemble-work-queue))
    (contract-call? .degen-nft mint-url tx-sender metadata-url)  
  )
)





;; Assemble

;; run-case
;; (contract-call? .backgrounds mint-name 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "MiamiLostOrange")
;; (contract-call? .body-kits mint-name 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "MiamiLostOrange")
;; (contract-call? .wheels mint-name 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "MiamiLostOrange")
;; (contract-call? .dgn-heads mint-name 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "MiamiLostOrange")
;; ::set_tx_sender STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract add-assemble-work-in-queue u1 u1 u1 u1)
;; ::set_tx_sender ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
;; (contract-call? .upgrade-contract finalize 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "url-custom")
(define-public (assemble-finalize (member principal) (metadata-url (string-ascii 99))) 
	(begin     
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
    (unwrap-panic (contract-call? .degen-nft mint-url member metadata-url))
    (pop-assemble-work-queue)
  )
)


(define-data-var assemble-work-queue (list 100 {member: principal, background-id: uint, body-id: uint, rim-id: uint, head-id: uint}) (list))

(define-public (assemble-get-work-queue)
  (begin  
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
    ;; Get the actual work-queue so that we can process it
    (ok (var-get assemble-work-queue))
  )
)

(define-public (get-assemble-head-work-queue)
  (begin  
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
    ;; Get the first element in the work queue so that we can process it
    (ok (element-at (var-get assemble-work-queue) u0))
  )
)

(define-public (add-assemble-work-in-queue (background-id uint) (body-id uint) (rim-id uint) (head-id uint))
  (ok 
    (let 
      (
        (work-queue-value (var-get assemble-work-queue))
        (value-to-add {
          member: tx-sender, 
          background-id: background-id,
          body-id: body-id,
          rim-id: rim-id,
          head-id: head-id
        })
      )
    
      (var-set assemble-work-queue
        (begin
          ;; check user has not already inserted this
          (asserts! 
            (is-none (index-of work-queue-value value-to-add))
            err-invalid
          )
          ;; check user is not abusing the queue
          (asserts! 
            (< (len (filter is-assemble-value-for-principal work-queue-value)) u5)
            err-too-many-disassemble
          )
          ;; check user is owner of nft
          (asserts! 
            (and
              (is-eq (some tx-sender) (unwrap-panic (contract-call? .backgrounds get-owner rim-id)))       
              (and
                (is-eq (some tx-sender) (unwrap-panic (contract-call? .body-kits get-owner body-id))) 
                (and
                  (is-eq (some tx-sender) (unwrap-panic (contract-call? .wheels get-owner rim-id))) 
                  (is-eq (some tx-sender) (unwrap-panic (contract-call? .dgn-heads get-owner head-id))) 
                )
              )
            )
            err-not-owner
          )    
          (if (is-eq tx-sender (var-get contract-owner)) true (try! (fee-processing)))
          (unwrap-panic (contract-call? .backgrounds burn-token background-id))
          (unwrap-panic (contract-call? .body-kits burn-token background-id))
          (unwrap-panic (contract-call? .wheels burn-token background-id))
          (unwrap-panic (contract-call? .dgn-heads burn-token background-id))

          (append 
            (unwrap-panic (as-max-len? work-queue-value u99)) 
            value-to-add
          )
        )
      )
    )
  )
)

(define-public (pop-assemble-work-queue)
  (ok 
    (let
      ((work-queue-value (var-get assemble-work-queue)))

      (var-set assemble-work-queue
        (begin
          ;; Check that admin is calling this contract
          (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
          ;; Remove first element in list
          (filter is-assemble-first-element work-queue-value)
        )
      )
    )
  )
)

(define-private (is-assemble-value-for-principal (value (tuple (background-id uint) (body-id uint) (rim-id uint) (head-id uint) (member principal))))
  (is-eq (get member value) tx-sender)
)

(define-private (is-assemble-first-element (value (tuple (background-id uint) (body-id uint) (rim-id uint) (head-id uint) (member principal))))
  (let
    ((first-element (element-at (var-get assemble-work-queue) u0)))

    (not 
      (and
        (is-some first-element)
        (is-eq value (unwrap-panic first-element))
      )
    )
  )
)










;; SWAP

;; eg. case
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.degen-nft mint-url 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "nice-link")
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.wheels mint-name 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "MiamiLunaPurple")
;; ::set_tx_sender STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract add-swap-work-in-queue u3 u1 "rims-type")
;; ::set_tx_sender ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
;; >> (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract swap-finalize 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "new-nice-link" "NYCGoldie" "rims-type")
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.wheels get-token-uri u2)
;; (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.degen-nft get-token-uri u4)


(define-data-var swap-work-queue (list 100 {member: principal, degen-id: uint, component-id: uint, component-type: (string-ascii 30)}) (list))

(define-public (get-swap-work-queue)
  (begin  
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
    ;; Get the actual work-queue so that we can process it
    (ok (var-get swap-work-queue))
  )
)

(define-public (get-swap-head-work-queue)
  (begin  
    ;; Check that admin is calling this contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
    ;; Get the first element in the work queue so that we can process it
    (ok (element-at (var-get swap-work-queue) u0))
  )
)

(define-public (add-swap-work-in-queue (degen-id uint) (component-id uint) (component-type (string-ascii 30)))
  (ok 
    (let 
      (
        (work-queue-value (var-get swap-work-queue))
        (value-to-add { 
          member: tx-sender,
          degen-id: degen-id,
          component-id: component-id,
          component-type: component-type
          })
      )
    
      (var-set swap-work-queue
        (begin
          ;; check user has not already inserted this
          (asserts! 
            (is-none (index-of work-queue-value value-to-add))
            err-invalid
          )
          ;; check user is not abusing the queue
          (asserts! 
            (< (len (filter is-swap-value-for-principal work-queue-value)) u5)
            err-too-many-disassemble
          )
          ;; check user is owner of nft
          (asserts! 
            (and
              (is-eq (some tx-sender) (unwrap-panic (contract-call? .degen-nft get-owner degen-id)))       
              (is-eq (some tx-sender)
                  (if (is-eq component-type background-type) 
                    (unwrap-panic (contract-call? .backgrounds get-owner component-id))
                    (if (is-eq component-type body-type) 
                      (unwrap-panic (contract-call? .body-kits get-owner component-id))
                      (if (is-eq component-type rims-type) 
                        (unwrap-panic (contract-call? .wheels get-owner component-id))  
                        (if (is-eq component-type head-type) 
                          (unwrap-panic (contract-call? .dgn-heads get-owner component-id))
                          none   ;; component-type invalid
                        )
                      )
                    )
                  )
              )
            )
            err-not-owner
          )    
          (if (is-eq tx-sender (var-get contract-owner)) true (try! (fee-processing)))
          (unwrap-panic (contract-call? .degen-nft burn-token degen-id))
          (if (is-eq component-type background-type) 
            (unwrap-panic (contract-call? .backgrounds burn-token component-id))
            (if (is-eq component-type body-type) 
              (unwrap-panic (contract-call? .body-kits burn-token component-id))
              (if (is-eq component-type rims-type) 
                (unwrap-panic (contract-call? .wheels burn-token component-id))  
                (if (is-eq component-type head-type) 
                  (unwrap-panic (contract-call? .dgn-heads burn-token component-id))
                  false   ;; component-type invalid
                )
              )
            )
          )
          
          (append 
            (unwrap-panic (as-max-len? work-queue-value u99)) 
            value-to-add
          )
        )
      )
    )
  )
)

(define-public (pop-swap-work-queue)
  (ok 
    (let
      ((work-queue-value (var-get swap-work-queue)))

      (var-set swap-work-queue
        (begin
          ;; Check that admin is calling this contract
          (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
          ;; Remove first element in list
          (filter is-swap-first-element work-queue-value)
        )
      )
    )
  )
)

(define-private (is-swap-value-for-principal (value {degen-id: uint, component-id: uint, component-type: (string-ascii 30), member: principal}))
  (is-eq (get member value) tx-sender)
)

(define-private (is-swap-first-element (value {degen-id: uint, component-id: uint, component-type: (string-ascii 30), member: principal}))
  (let
    ((first-element (element-at (var-get swap-work-queue) u0)))

    (not 
      (and
        (is-some first-element)
        (is-eq value (unwrap-panic first-element))
      )
    )
  )
)




(define-public (swap-finalize (member principal) (metadata-url-dgn (string-ascii 99)) (component-name (string-ascii 30)) (component-type (string-ascii 30)))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
    (unwrap-panic (contract-call? .degen-nft mint-url member metadata-url-dgn))
    (if (is-eq false
          (if (is-eq component-type background-type) 
            (unwrap-panic (contract-call? .backgrounds mint-name member component-name))
            (if (is-eq component-type body-type) 
              (unwrap-panic (contract-call? .body-kits mint-name member component-name))
              (if (is-eq component-type rims-type) 
                (unwrap-panic (contract-call? .wheels mint-name member component-name))  
                (if (is-eq component-type head-type) 
                  (unwrap-panic (contract-call? .dgn-heads mint-name member component-name))
                  false   ;; component-type invalid
                )
              )
            )
          )
        )
      err-component-type-invalid
      ;; if any mint would have failed the function call would have been rolled back
      (pop-swap-work-queue)
    )
  )
)





























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
    (unwrap! (contract-call? .backgrounds burn-token component-id)  err-invalid)
    (unwrap! (contract-call? .backgrounds mint-name tx-sender component-name) err-invalid)
    ;; change url
    ;; (unwrap! (contract-call? .degen-nft update-uri degen-id degen-url) err-invalid)
    ;; trigger metadata update notifier for Degen SM and id of the swapped Degen
    (contract-call? .token-metadata-update-notify nft-metadata-update-notify 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.degen-nft (list degen-id))

  )
)



;; Template

;; (define-data-var work-queue (list 100 {member: principal, token-id: uint}) (list))

;; (define-public (get-work-queue)
;;   (begin  
;;     ;; Check that admin is calling this contract
;;     (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
;;     ;; Get the actual work-queue so that we can process it
;;     (ok (var-get work-queue))
;;   )
;; )

;; (define-public (get-head-work-queue)
;;   (begin  
;;     ;; Check that admin is calling this contract
;;     (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
;;     ;; Get the first element in the work queue so that we can process it
;;     (ok (element-at (var-get work-queue) u0))
;;   )
;; )

;; (define-public (add-work-in-queue (token-id uint))
;;   (ok 
;;     (let 
;;       (
;;         (work-queue-value (var-get work-queue))
;;         (value-to-add {token-id: token-id, member: tx-sender})
;;       )
    
;;       (var-set work-queue
;;         (begin
;;           ;; check user has not already inserted this
;;           (asserts! 
;;             (is-none (index-of work-queue-value value-to-add))
;;             err-invalid
;;           )
;;           ;; check user is not abusing the queue
;;           (asserts! 
;;             (< (len (filter is-value-for-principal work-queue-value)) u5)
;;             err-too-many-disassemble
;;           )
;;           ;; check user is owner of nft
;;           (asserts! 
;;             (is-eq (some tx-sender) (unwrap-panic (contract-call? .degen-nft get-owner token-id))) 
;;             err-not-owner
;;           )    
      		;; (unwrap-panic (contract-call? .degen-nft burn-token token-id))


;;           (append 
;;             (unwrap-panic (as-max-len? work-queue-value u99)) 
            ;; value-to-add
;;           )
;;         )
;;       )
;;     )
;;   )
;; )

;; (define-public (pop-work-queue)
;;   (ok 
;;     (let
;;       ((work-queue-value (var-get work-queue)))

;;       (var-set work-queue
;;         (begin
;;           ;; Check that admin is calling this contract
;;           (asserts! (is-eq tx-sender (var-get contract-owner)) err-invalid)
;;           ;; Remove first element in list
;;           (filter is-first-element work-queue-value)
;;         )
;;       )
;;     )
;;   )
;; )

;; (define-private (is-value-for-principal (value (tuple (token-id uint) (member principal))))
;;   (is-eq (get member value) tx-sender)
;; )


;; (define-private (is-first-element (value (tuple (token-id uint) (member principal))))
;;   (let
;;     ((first-element (element-at (var-get work-queue) u0)))

;;     (not 
;;       (and
;;         (is-some first-element)
;;         (is-eq value (unwrap-panic first-element))
;;       )
;;     )
;;   )
;; )























;; swap burning and minting another nft
;;
;; degen-url metadata for the new generated degen
;; component-url metadata for the new generated component
;; (define-public (swap-burn (degen-id uint) (component-type (string-ascii 99)) (component-id uint) 
;;   (degen-url (string-ascii 99))
;;   (component-name (string-ascii 30)) 
;;   )
;;   (begin 
;;     (unwrap! (contract-call? .degen-nft burn-token degen-id) err-invalid) 
;;     (unwrap! (contract-call? .backgrounds burn-token component-id) err-invalid)
;;     (unwrap! (contract-call? .degen-nft mint-url tx-sender degen-url) err-invalid)
;;     (contract-call? .backgrounds mint-name tx-sender component-name)
;;   )
;; )

