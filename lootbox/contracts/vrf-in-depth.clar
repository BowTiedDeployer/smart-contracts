

;; keep a map id -> block height
;; store for the nft-id (uint) the block-height when it was opened (uint)
(define-map block-height-nft uint uint)

(define-constant err-missing-block-height (err u402))

;; public set for id block-height+1  
(define-public (set-block-height-id (id uint))
  (ok (map-set block-height-nft id (+ block-height u1))))

;; read only get block height for id
(define-read-only (get-block-height-id (id uint))
  (map-get? block-height-nft id))

;; read only get vrf-seed for id
(define-read-only (get-vrf-seed-id (id uint))
  (ok (get-block-info? vrf-seed (unwrap! (map-get? block-height-nft id) err-missing-block-height))))




;; conversions
;;

;; base 16 -> base 10
(define-private (buff-to-uint (byte (buff 1))) ;; buff = 1 byte = 2 hex characters
  (unwrap-panic (index-of 0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff byte)))

;; base 10 -> base 16
(define-private (uint-to-buff (number uint)) ;; uint equivalent to 1 byte = 2 hex characters
  (unwrap-panic (element-at  0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff number)))

;; convert buff 1 byte (2 digits - first is 0) to string only second digit 

;; create buffer conversion for id bigger than u255
;; for number while bigger than 
;; static for 1000 elements

;; mod 16 number -> 1st last digit
(define-read-only (convert-10-to-16 (number uint))
  (let 
    (
      (first_digit (mod number u16))
      (second_digit (mod (/ number u16) u16))
      (third_digit (mod (/ (/ number u16) u16) u16))
      (fourth_digit (mod (/ (/ (/ number u16) u16) u16) u16)))
    (print first_digit)
    (print second_digit)
    (print third_digit)
    (print fourth_digit)
    (ok true)))

;; divide by 16

;; mod 16 number -> 2nd last digit

;; divide by 16

;; mod 16 number -> 3rd last digit

;; divide by 16

;; mod 16 number -> 4th last digit



;; create concat between converted buffer and the id to always be same number of bytes


