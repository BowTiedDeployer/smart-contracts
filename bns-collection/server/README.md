# why we chose to read all the nft-names every time

### the below method fails the case if the purchase/ transfer is done through a deployment of a smart contract

// takes last nonce from file

// set offset to last nonce

// go 50 values at a time

// goes from last nonce to total

// until offset + limit > total goes throuh transactions

// filter transactions so only take into account the set-name ones

// !!! in context when calling the contract function from a deployment of another smart contract it does not adds the event to the list
// !!! can't be used

// go through all the map
