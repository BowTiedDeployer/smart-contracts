# Explanations

terms:
FE - frontend  
BE - backend  
SC - smart contract

## The overall image of the interaction for M2:

FE <-> SC <-> BE

## The SC is deployed on chain with the info kept on it.

- Components' SC have maps pointing from component-name to component-uri
- Upgrade SC have queues for every type of operation (merge/assemble/disable/swap) and keeps in them so the backend knows what happened and from that to use its functions

## The FE is calling the SC functions to:

- move an NFT from an old collection (Miami / NYC) to Degens collection <-> merge function (the call burns the old NFT and add its ID and type to a merge-queue)
- disassemble an existing Degen (the call burns that specific degen and add its ID and OWNER to a disassemble-queue)
- assemble a Degen from existing components (background, car, head, rim) (the call burns that specific components and add those IDs and OWNER to a assemble-queue)
- swap Degen with component (the call burns the degen and the component and add ID Degen, ID component, type component and OWNER to a swap-queue)

## The BE is calling itself every few minutes to:

- check what got disassembled and proceed with calling the appropiate functions for that
- check what got assembled and proceed with calling the appropiate functions for that
- check what got merged and proceed with calling the appropiate functions for that
- check what got swapped and proceed with calling the appropiate functions for that

### Disassemble

- get value from queue - add values for this
- take json
- get components' name:
  - background: attributes-background → value
  - same for car and rims
  - head:
    - attributes-class-> value: miami/nyc
    - attributes-head->value
    - attributes-face -> value
- call disassemble_finalize (value.member, background_name, car_name, rims_name, head_name)

\*A simple db is required to keep the ID of the current Degen that will be minted so it is also added right to the json file. When an operation is performed it gets incremented.

### Assemble

- get value from queue (background_id, car_id, rims_id, head_id, member as owner)
- call read-only get-token-uri for each of these 4 IDs
- fetch json
- get the attribute value from json
  - background, rims & car direct the value
  - head has 3 attributes -> create head "(Alien->NYC|Skull->Miami) + head_attribute + face_attribute"
- create json with these attributes following the example here https://stxnft.mypinata.cloud/ipfs/QmbX7UCSFLBvJa2yB4YxqZxhacrxiKUGbE6fHbQuYMhNhf
- create image from json
- Pinata upload image and get hash
- change json to include img hash & name (Degen#id)
- Pinata upload json and get hash
- call assemble_finalize with (member as address, json_hash as uri)
- DB increment id

### Swap

- get value from queue ( degen id, component id, component type, member as owner)
- call read-only get-token-uri Degen ID
- call read-only get-token-uri component ID from the specific type SC
- keep aux value (component-name, component-type) from Degen that is replaced
- create json like the old + overwrite component with the new value
- create image form json
- Pinata upload image and get hash
- change json to include img hash & name (Degen#id)
- Pinata upload json and get hash
- call swap_finalize with (member, json_hash as Dege uri, component-name, component-type)
- DB increment id

### Merge

- get value from queue (old degen id, degen type)
- call read only get-token-uri for degen type SC with given ID
- fetch json
- map from json to new values ( it is a map that for an old attribute has a new coresponding one) TODO: check where this is written
- create new image from new json
- Pinata upload image and get hash
- change json to include img hash & name (Degen#id)
- Pinata upload json and get hash
- call merge_finalize(member as address, json_hash as Degen uri)
- DB increment id

## Modular Operations

- upload image
- upload json
- create image from json
- convert old degen json to new json
- increment DB id
- call read-only
- overwrite attribute in json ( used for swap operations ) + for adding/overwriting image and name attributes
