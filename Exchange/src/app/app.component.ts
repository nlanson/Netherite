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
  balance: any;
  nethBalance: any;

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
    if (network == 'ropsten') {
      await this.web3Service.loadContracts();
      this.balance = await this.web3Service.getEtherBalance(this.account);
      this.nethBalance = await this.web3Service.getTokenBalance(this.account);

      this.loading = false;
    } else {
      window.alert("You need to be using the Ropsten Test Network for Netherite to load.");
      this.correctNetwork = false;
    }
  }

}
