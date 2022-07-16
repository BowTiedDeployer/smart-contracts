add all the smart contracts as we normally would have
background
body-kits
wheels
dng-heads

big-degens

have update metadata
map: metadata for evey token id



create the operations for assemble / disassemble / swap ( only nft )



## Disassemble
### expectation
- [ ] users claim Degens

- [ ] user burns Degen

- [ ] server call through contract owner to mint components 

### implementation
  - Degen contract
    - burn function
  
  - Component contracts
    - mint function (address metadata-uri) - verify that it's done by contract owner

  - Superior Contract
    - call to mint every single contract ( example ) background address metadata
    - list to call all components

## Assemble
### expectations
- Wrapper Contract function call (components to burn, uri metadata resolted)
- user burn Components nft

idee confirmare
  - the second verification that it is indeed ready to mint can be also called here by the as-contract so the wrapper contract has the right to confirm the mint transaction
  - se poate confirma tranzactia de inca o adresa, si atunci adresa sa fie adresa contractului si mai cheama el odata mintu
problema:
  daca se schimba adresa
solutie
  adresa e variabila si se poate schimba in toate contractele

functie ce schimba adresa din toate contractele
ca


- user mint nft with given metadata




    