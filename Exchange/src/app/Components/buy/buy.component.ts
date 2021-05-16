import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Web3Service } from '../../Services/web3.service';

declare let window: any;
type Error = {
  error: boolean;
  message: string;
}

@Component({
  selector: 'Buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  @Input() account: string;

  buyForm: FormGroup;
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
    this.buyForm = this.fb.group({
      ethAmount: [null]
    });

    this.buyForm.valueChanges.subscribe((val) => {
      this.receiveAmount = this.buyForm.value.ethAmount * 64;
    });

    this.processing = false;
  }

  async buy(): Promise<void> {
    this.processing = true;
    this.resetError();
    let ethAmount: string;

    try {
      //Fix ethAmount to Wei.
      ethAmount = window.web3.utils.toWei(this.buyForm.value.ethAmount.toString());
    } catch(e) {
      this.error = {
        error: true,
        message: 'Invalid Input'
      }
      this.processing = false;
      return;
    }


    //Check if user has enough Eth.
    let ethBalance: string = await this.web3Service.getEtherBalance(this.account);
    if ( Number(ethBalance) <= Number(ethAmount) ) {
      this.error = {
        error: true,
        message: `Insufficient Eth Balance. (Max Approx: ${Number(window.web3.utils.fromWei(ethBalance)).toFixed(2)})`
      }
      this.processing = false;
      return;
    }

    await this.web3Service.buyTokens(Number(ethAmount), this.account);
    this.processing = false;

    this.buyForm.reset();
  }

  resetError(): void {
    this.error = {
      error: false,
      message: 'No errors'
    };
  }

}
