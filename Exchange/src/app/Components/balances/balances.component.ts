import { Component, OnInit, Input } from '@angular/core';
import { Web3Service } from '../../Services/web3.service';

declare let window: any;

@Component({
  selector: 'Balance',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalanceComponent implements OnInit {

  @Input() account: string = 'zbcdefghijklmnopqrstuvwxyz'
  eth: number;
  netherite: number;

  constructor(
    private web3Service: Web3Service
  ) { }

  async ngOnInit(): Promise<void> {
    let e = await this.web3Service.getEtherBalance(this.account);
    this.eth = Number(window.web3.utils.fromWei(e));

    let n: string = await this.web3Service.getTokenBalance(this.account);
    this.netherite = Number(window.web3.utils.fromWei(n));
  }

  openSource() {
    window.open('https://github.com/nlanson/Netherite', '_blank');
  }

  openEtherScan() {
    window.open('https://ropsten.etherscan.io/address/0xEDedf42f1dC5146c9Cf2cf2cb09e50dfc5835293', '_blank');
  }

}
