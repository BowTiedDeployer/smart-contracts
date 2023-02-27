## SQL Code

```sql
select recipient, count(*) from nft_assets
  where asset_identifier in ('SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.nyc-degens::nyc-degens',
   'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.miami-degens::miami-degens',
   'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.SDGU-stackspunks::SDGU-stackspunks')
  group by recipient
  having count(*) > 0 order by count
```

https://stacksonchain.com/query?query=select%2520recipient%252C%2520count%28*%29%2520from%2520nft_assets%2520%250A%2520%2520where%2520asset_identifier%2520in%2520%28%27SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.nyc-degens%253A%253Anyc-degens%27%252C%2520%250A%2520%2520%2520%27SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.miami-degens%253A%253Amiami-degens%27%252C%250A%2520%2520%2520%27SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.SDGU-stackspunks%253A%253ASDGU-stackspunks%27%29%250A%2520%2520group%2520by%2520recipient%250A%2520%2520having%2520count%28*%29%2520%253E%25200%2520order%2520by%2520count%250A%2520%2520

## what to run

run `node index.js` to generate the code in smart-contract.txt
