first stage:
  takes into consideration url known before operation
  no second account verification


Main Contract:
 x mint address url
 x read only metadata change


Components Contract:
  x mint address url
  x mint address name
  x read only metadata change

Wrapper Contract:
  call for assemble  (address, degen-url, background-id, body-id, rim-id, head-id)
  call for disassemble (address, degen-id, background-url, body-url, rim-url, head-url)
  
  // should keep the id, update metadata and use the sip 019
  call for swap (address, degen-id, degen-url, component-type, burnt-component-id, unmounted-component-url)


second stage: 
  create a valid verification that is confirmed by two addresses

  find solution to confirm with two accounts
    first confirm with the address who want to do the operation
    next confirm with the contract-owner

  store 2 values
    true - confirmed by user
    true / false - confirmed by admin  
