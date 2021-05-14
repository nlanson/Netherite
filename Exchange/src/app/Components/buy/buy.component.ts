import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Web3Service } from '../../Services/web3.service';

declare let window: any;

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

  async buy() {
    let ethAmount: number = window.web3.utils.toWei(this.buyForm.value.ethAmount.toString());
    this.processing = true;
    await this.web3Service.buyTokens(ethAmount, this.account);
    this.processing = false;

    this.buyForm.reset();
  }

}
