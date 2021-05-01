const GoldSwap = artifacts.require("GoldSwap");
const GoldStack = artifacts.require("GoldStack");

module.exports = async function(deployer) {
  //Deploy Token
  await deployer.deploy(GoldStack);
  const goldStack = await GoldStack.deployed(); //Token now refers to the Smart Contract 'Token' which in itself is stored within a wallet.

  //Deploy EthSwap
  await deployer.deploy(GoldSwap, goldStack.address);
  const goldSwap = await GoldSwap.deployed();

  //Transfer all tokens to EthSwap.
  goldStack.transfer(goldSwap.address, '1000000000000000000000000');
};
