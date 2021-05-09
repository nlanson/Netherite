import { Component } from '@angular/core';
import { Web3Service } from './web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Exchange';

  account: string;
  balance: any;

  constructor(
    public web3Service: Web3Service
  ){ }

  async connectWeb3() {
    await this.web3Service.connectWeb3();
    await this.web3Service.loadAccounts();

    this.account = this.web3Service.accounts[0];
    this.balance = await this.web3Service.getBalance(this.account);
  }
}
