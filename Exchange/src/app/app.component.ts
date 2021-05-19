import { Component, OnInit } from '@angular/core';
import { Web3Service } from './Services/web3.service';

type Action = 'buy' | 'sell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loading: boolean = true;
  correctNetwork: boolean = true;

  account: string;

  action: Action = 'buy';

  constructor(
    public web3Service: Web3Service
  ){ }

  async ngOnInit() {
    await this.connectWeb3();
    this.web3Service.listenForAccountChange();
  }

  async connectWeb3() {
    this.loading = true;

    await this.web3Service.connectWeb3();
    await this.web3Service.loadAccounts();

    let network = await this.web3Service.detectNetwork();

    //Only load the contracts and contract related data IF the network is Ropsten.
    if (network == 'ropsten') {
      await this.web3Service.loadContracts();
      this.account = this.web3Service.accounts[0]; //Set account here so functions that depend on contracts to be loaded only start AFTER contracts are loaded.
      this.loading = false;
    } else {
      this.correctNetwork = false;
    }
  }

}
