const NetherSwap = artifacts.require("NetherSwap");
const Netherite = artifacts.require("Netherite");

module.exports = async function(deployer) {
  //Deploy Token
  await deployer.deploy(Netherite);
  const netherite = await Netherite.deployed(); //Token now refers to the Smart Contract 'Token' which in itself is stored within a wallet.

  //Deploy EthSwap
  await deployer.deploy(NetherSwap, netherite.address);
  const netherSwap = await NetherSwap.deployed();

  //Transfer all tokens to EthSwap.
  netherite.transfer(netherSwap.address, '1000000000000000000000000');
};
