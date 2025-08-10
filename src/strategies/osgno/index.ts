import { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { Multicaller } from '../../utils';

export const author = 'gnosis';
export const version = '0.0.1';

const abiERC20 = [
  'function balanceOf(address account) external view returns (uint256)'
];

const abiVAULT = [
  'function convertToAssets(uint256 shares) external view returns (uint256)'
];

export async function strategy(
  space,
  network,
  provider,
  addresses,
  options,
  snapshot
): Promise<Record<string, number>> {
  const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';

  const multi = new Multicaller(network, provider, abiERC20, { blockTag });
  addresses.forEach((address) =>
    multi.call(address, options.address, 'balanceOf', [address])
  );
  const resultERC20: Record<string, BigNumberish> = await multi.execute();
  const multiVault = new Multicaller(network, provider, abiVAULT, { blockTag });
  Object.keys(resultERC20).forEach((address) => {
    multiVault.call(address, options.stakewiseVault, 'convertToAssets', [resultERC20[address]]);
  });
  const resultVault: Record<string, BigNumberish> = await multiVault.execute();

  return Object.fromEntries(
    Object.entries(resultVault).map(([address, balance]) => [
      address,
      parseFloat(formatUnits(balance, options.decimals))
    ])
  );
}
