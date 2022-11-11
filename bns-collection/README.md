# Bitcoin Degens powered by BNS

## How it works

somebody mints bns-nft -> get basic token url + custom name for specific bns domain owned

- every 2 minutes check all the names and if one is different in the json from the blockchain, change it on the off-chain file to sync with the on-chain data
  - generate new json ( different bns-degen name )
  - centralized stored/ replace file (json) when doing it

## what will happen

- have all jsons ready (420)
- have posted on namecheap as many jsons as mints
- have default image posted on namecheap for all 420
- have the backend get as many names as degens are minted

### info hosting problem:

node file path is not public
server files cannot access public_html files
it can modify 1.json if stored on server but is not viewable by default in the app
probably needs an app over it to display the jsons from the backend
