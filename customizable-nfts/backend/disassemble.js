// take {id, principal} from queue
// do this steps calling SC
// (contract-call? .degens mint-uri 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "uriNiceDegen")
// ::set_tx_sender STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract add-disassemble-work-in-queue u1)
// ::set_tx_sender ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.upgrade-contract disassemble-finalize u1 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 "DarkPurple" "BentleyBlack" "ClassyCream" "Miami_Syringe_Cigar")
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.body-kits get-token-uri u1)
// (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.body-kits get-owner u1)

// for the given id return this json from SC
readOnlyFromSC(
  'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
  'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  'degens',
  'get-token-uri',
  1
);

// QmbX7UCSFLBvJa2yB4YxqZxhacrxiKUGbE6fHbQuYMhNhf

// fetch url from this - get components from attributes
