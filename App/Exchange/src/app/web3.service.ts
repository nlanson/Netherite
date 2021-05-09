import { Injectable } from '@angular/core';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  isWeb3: boolean = false;
  web3: any;
  accounts: Array<any> = [];

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
      console.log('Web3 Detected.')
      this.isWeb3 = true;
      window.web3 = new window.Web3(window.web3.currentProvider);
    } else {
      console.log('Web3 not Detected.')
      this.isWeb3 = false;
    }

  }

  //This function will request accounts from your provider (eg Metamask.)
  async loadAccounts() {
    const web3 = window.web3;

    this.accounts = await web3.eth.requestAccounts();
  }

  async getBalance(account: string): Promise<string> {
    const web3 = window.web3;

    let bal = await web3.eth.getBalance(account);
    return web3.utils.fromWei(bal, 'ether');
  }

}
