import { Injectable } from '@angular/core';
import Netherite from './abis/Netherite.json';
import NetherSwap from './abis/NetherSwap.json';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  loading: boolean = true;

  isWeb3: boolean = false;
  web3: any;
  accounts: Array<any> = [];

  netherite: any;
  netherSwap: any;

  constructor() { }


  //This function will detect whether or not your browser has Web3.
  async connectWeb3() {
    console.log('Loading Web3...');

    if (window.ethereum) {
      console.log('Web3 Detected.')
      this.isWeb3 = true;
      window.web3 = new window.Web3(window.ethereum);
      await window.ethereum.enable;
    } else if (window.web3) {
      console.log('Web3 Detected.');
      this.isWeb3 = true;
      window.web3 = new window.Web3(window.web3.currentProvider);
    } else {
      console.log('Web3 not Detected.');
      window.alert('Web3 was not detected. Consider using MetaMask!')
      this.isWeb3 = false;
    }

  }

  //This function will request accounts from your provider (eg Metamask.)
  async loadAccounts() {
    const web3 = window.web3;

    this.accounts = await web3.eth.requestAccounts();
  }

  //This function will load the smart contracts.
  async loadContracts() {
    const networkID = await window.web3.eth.net.getId(); //Get the current network ID that metamask is connected to.


    const tokenData = Netherite.networks[networkID];
    if ( tokenData ) {
      this.netherite = new window.web3.eth.Contract(Netherite.abi, tokenData.address);
      console.log('Netherite token contract loaded');
    } else {
      window.alert('Token contract not deployed to connected network.')
    }


    const netherSwapData = NetherSwap.networks[networkID];
    if ( netherSwapData ) {
      this.netherSwap = new window.web3.eth.Contract(NetherSwap.abi, netherSwapData.address);
      console.log('NetherSwap contract loaded');
    } else {
      window.alert('EthSwap contract not deployed to connected network.')
    }
  }

  //Detect Network.
  async detectNetwork() {
    let network: string = await window.web3.eth.net.getNetworkType();
    return network;
  }

  //Get Ether Balance of Account.
  async getEtherBalance(account: string): Promise<string> {
    const web3 = window.web3;

    let bal = await web3.eth.getBalance(account);
    return web3.utils.fromWei(bal, 'ether');
  }

  //This function gets Token balance from smart contract.
  async getTokenBalance(account: string) {
    let tokenBalance = await this.netherite.methods.balanceOf(account).call();
    return tokenBalance;
  }

  async buyTokens(etherAmount: number, account: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.netherSwap.methods.buyTokens()
      .send({value: etherAmount, from: account})
      .on('transactionHash', (hash) => {
        resolve();
      }).catch(e => {
        reject();
      });
    });
  }

  async sellTokens(tokenAmount: string, account: string): Promise<void> {
    return new Promise((resolve, reject) => {
      //Approve
      this.netherite.methods.approve(this.netherSwap._address, tokenAmount)
      .send({ from: account })
      .on('transactionHash', (hash) => {
        //Then sell
        this.netherSwap.methods.sellTokens(tokenAmount)
        .send({from: account})
        .on('transactionHash', (hash) => {
          resolve();
        })
        .catch(e => {
          reject();
        });

      })
      .catch(e => {
        reject();
      });
    });
  }

}
