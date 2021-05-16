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
  }

  async connectWeb3() {
    this.loading = true;

    await this.web3Service.connectWeb3();
    await this.web3Service.loadAccounts();
    this.account = this.web3Service.accounts[0];

    let network = await this.web3Service.detectNetwork();

    //Only load the contracts and contract related data IF the network is Ropsten.
    if (network == 'ropsten') {
      await this.web3Service.loadContracts();
      this.loading = false;
    } else {
      this.correctNetwork = false;
    }
  }

}
