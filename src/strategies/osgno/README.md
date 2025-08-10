# osGNO

This strategy returns the asset balances of voters staked in a StakeWise vault. It uses the vault's `balanceOf` function to get share balances, then converts them to underlying asset balances using `convertToAssets`.

Here is an example of parameters:

```json
{
  "symbol": "osGNO",
  "address": "0xF490c80aAE5f2616d3e3BDa2483E30C4CB21d1A0",
  "stakewiseVault": "0x4b4406Ed8659D03423490D8b62a1639206dA0A7a",
  "decimals": 18
}
```
