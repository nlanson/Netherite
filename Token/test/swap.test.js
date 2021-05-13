const { assert } = require('chai');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

const Netherite = artifacts.require('Netherite');
const NetherSwap = artifacts.require('NetherSwap');

chai
    .use(chaiAsPromised)
    .should();

contract('NetherSwap', function([deployer, investor]) {
    let netherite;
    let netherSwap;
    
    before(async() => {
        netherite = await Netherite.new();
        netherSwap = await NetherSwap.new(netherite.address);
        //Transfer all tokens into the Exchange address.
        await netherite.transfer(netherSwap.address, tokens('1000000'));
    });

    describe('Token Deployment', async () => {
        it ('Token has a name', async () => {
            let name = await netherite.name();
            assert.equal(name, 'Netherite')
        });
    });
    
    describe('EthSwap Deployment', async () => {
        it ('Contract has a name', async () => {
            let name = await netherSwap.name();
            assert.equal(name, 'Netherite Exchange')
        });

        it ('Contract has Tokens', async () => {
            let balance = await netherite.balanceOf(netherSwap.address);
            assert.equal(balance.toString(), tokens('1000000'));
        });
    });

    describe('Buy Tokens', async () => {
        let result;
        let supply = 1000000;
        //The amount of Ether that the investor has put into the EthSwap exchange.
        let sendAmount = 1;

        before(async() => {
            //Purchase Tokens before tests.
            result = await netherSwap.buyTokens({from: investor, value: tokens(sendAmount.toString())});
        });

        it('Investor receives tokens', async () => {
            let balance = await netherite.balanceOf(investor); //Investor token balance.
            //The exchange rate is r*100;            
            let expectedBal = sendAmount*64; //Expected token balance of the investor.
            assert.equal(balance.toString(), tokens(expectedBal.toString())); //Balance should equal to the expectedBalance as calculated above.
        });

        it('Tokens subtracted from EthSwap', async () => {
            let balance = await netherite.balanceOf(netherSwap.address); //Exchange balance in Wei.      
            let expectedBal = tokens((supply - (sendAmount*64)).toString()); //Expected balance of the exchange should be supply minus sendAmount time 100. Converted to Wei.
            assert.equal(balance.toString(), expectedBal.toString()); //Balance should equal to the expectedBalance as calculated above.
        });

        it('Ether is added to EthSwap', async() => {
            let balance = await web3.eth.getBalance(netherSwap.address); //Exchange ETHER balance.
            assert.equal(balance.toString(), tokens(sendAmount.toString())); //Balance should equal to the sendAmount.
        });

        it('Event Check', async() => {
            const eventName = result.logs[0].event;
            const event = result.logs[0].args;
            
            //Check logs to ensure the event was emitted with the coorect data.
            assert.equal(eventName, `TokensPurchased`); //Event name should equal 'TokenPurchased'.
            assert.equal(event.account, investor); //Event account should be the investor account.
            assert.equal(event.token, netherite.address); //Event token should reside in the same address as our Token contract's address.
            assert.equal(event.amount.toString(), tokens((sendAmount*64).toString()).toString()); // Event amount should be the amount the investor receives.
            assert.equal(event.rate.toString(), '64') //Event rate should be the exchange rate (100).
        });
    });

    describe('Sell Tokens', async () => {
        let result;
        let supply = 1000000;

        before(async() => {
            //Investor approves the smart contract to transfer tokens on their behalf
            await netherite.approve(netherSwap.address, tokens('64'), { from: investor });

            //Investor sells the tokens to EthSwap after approval.
            result = await netherSwap.sellTokens(tokens('64'), { from: investor });
        });

        it('Investor balance is coorect for Tokens and Ether', async () => {
            //Get investor token balance.
            let balance = await netherite.balanceOf(investor);
            assert.equal(balance.toString(), '0'); //Investor balance should equal 0
        });

        it('EthSwap is balance is correct for Tokens and Ether', async() => {
            //Get EthSwap Token Balance
            let ethSwapTokenBal = await netherite.balanceOf(netherSwap.address);

            //Get EthSwap Ether Balance
            let ethSwapEtherBal = await web3.eth.getBalance(netherSwap.address);

            //EthSwap token balance is correct
            assert.equal(ethSwapTokenBal, tokens(supply.toString())); //EthSwap token balance should be equal to the supply.

            //EthSwap Ether balance is correct
            assert.equal(ethSwapEtherBal, tokens('0')); //EthSwap Ether balance should equal 0.

        });

        it('Event Check', async() => {
            const eventName = result.logs[0].event;
            const event = result.logs[0].args;
            
            // Check logs to ensure the event was emitted with the coorect data.
            assert.equal(eventName, `TokensSold`); //Event name should equal 'TokensSold'.
            assert.equal(event.account, investor); //Event account should be the investor account.
            assert.equal(event.token, netherite.address); //Event token should reside in the same address as our Token contract's address.
            assert.equal(event.amount.toString(), tokens(('64').toString()).toString()); // Event amount should be the amount the investor sells (100).
            assert.equal(event.rate.toString(), '64') //Event rate should be the exchange rate (100).
        });

        it('Investor cant sell more tokens that they have', async() => {
            //This tests if the investor can sell more tokens that they have.
            await netherSwap.sellTokens(tokens('100'), { from: investor }).should.be.rejected; //And should be rejected.
        });
    });

});

function tokens(n) { //Returns the raw Wei value of entered tokens as an integer.
    return web3.utils.toWei(n, 'ether');
}

function fromWei(n) {
    return web3.utils.fromWei(n, 'ether');
}