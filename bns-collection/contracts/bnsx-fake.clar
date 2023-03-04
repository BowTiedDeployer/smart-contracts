(define-map primary-names principal {
  name: (buff 48),
  namespace: (buff 20)
})

(define-public (set-primary-name (owner principal) (name {name: (buff 48), namespace: (buff 20) }))
  (begin
    (map-set primary-names owner name)
    (ok true)))

(define-read-only (get-primary-name (account principal))
  (ok (map-get? primary-names account)))
