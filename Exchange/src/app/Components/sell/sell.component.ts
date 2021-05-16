import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Web3Service } from '../../Services/web3.service';

declare let window: any;

type Error = {
  error: boolean,
  message: string
}

@Component({
  selector: 'Sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  @Input() account: string;

  sellForm: FormGroup;
  receiveAmount: number = 0;
  processing: boolean = true;
  error: Error = {
    error: false,
     message: 'No errors'
  };

  constructor(
    private fb: FormBuilder,
    private web3Service: Web3Service
  ) { }

  ngOnInit(): void {
    this.sellForm = this.fb.group({
      netheriteAmount: [null]
    });

    this.sellForm.valueChanges.subscribe((val) => {
      this.receiveAmount = this.sellForm.value.netheriteAmount / 64;
    });

    this.processing = false;
  }

  async sell() {
    this.processing = true;
    this.resetError();
    let netheriteAmount: string;

    try {
      //Fix Netherite amount to Wei.
      netheriteAmount = window.web3.utils.toWei(this.sellForm.value.netheriteAmount.toString());
    } catch (e) {
      this.error = {
        error: true,
        message: 'Invalid Input'
      }
    }

    //Check if user has enough Netherite.
    let tokenBalance: string = await this.web3Service.getTokenBalance(this.account);
    console.log(Number(tokenBalance) <= Number(netheriteAmount));
    if ( Number(tokenBalance) <= Number(netheriteAmount) ) {
      this.error = {
        error: true,
        message: `Insufficient Nether Balance. (Max Approx: ${Number(window.web3.utils.fromWei(tokenBalance)).toFixed(2)})`
      }
      this.processing = false;
      return;
    }


    await this.web3Service.sellTokens(netheriteAmount.toString(), this.account);
    this.processing = false;

    this.sellForm.reset();
  }

  resetError() {
    this.error = {
      error: false,
      message: 'No errors'
    };
  }

}
