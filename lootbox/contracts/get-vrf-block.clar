
;; get-vrf-block
;; <add a description here>

;; constants
;;

;; data maps and vars
;;

;; private functions
;;

;; public functions
;;

(define-read-only (get-block-vrf-seed (selected-block uint)) 
  (get-block-info? vrf-seed selected-block))

(print (get-block-info? vrf-seed block-height))

(define-public (print-block-vrf-seed (selected-block uint)) 
  (let ((vrf (get-block-info? vrf-seed selected-block))) 
  (print vrf)
  (ok vrf)))
