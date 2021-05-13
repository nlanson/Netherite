pragma solidity ^0.8.4;

import "./Netherite.sol";

contract NetherSwap {
    string public name = "Netherite Exchange";
    Netherite public netherite;
    uint public rate = 64; //Exchange rate.
    
    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Netherite _token) {
        netherite = _token;
    }

    function buyTokens() public payable {
        //Calculate amount of tokens to pay
        uint tokenAmount = msg.value * 64; //Set tokenAmount to the amount of Ether received times 100.

        //Require that EthSwap address has enough tokens.
        require(netherite.balanceOf(address(this)) >= tokenAmount); //The exchange must have more than or equal amount of the requested tokenAmount to proceed.

        //Transfer tokens to the user
        netherite.transfer(msg.sender, tokenAmount); //Transfer the tokens to the buyers address.

        //Emit the TokenPurchased Event
        emit TokensPurchased(msg.sender, address(netherite), tokenAmount, rate);
    }

    
    function sellTokens(uint _amount) public payable{
        //Store sender address as a payable address.
        address payable sender = payable(msg.sender);
        
        //Calculate Ether amount to redeem
        uint etherAmount = _amount / rate;

        //User cant sell more tokens that they have
        require(netherite.balanceOf(msg.sender) >= _amount);

        //Require EthSwap to have enough ether to redeem the tokens.
        require(address(this).balance >= etherAmount);

        //Transfer tokens from user, to EthSwap of amount.
        netherite.transferFrom(msg.sender, address(this), _amount);

        //Send ether to the msg sender.
        sender.transfer(etherAmount);

        //Emit the TokensSold event
        emit TokensSold(msg.sender, address(netherite), _amount, rate);
    }
}