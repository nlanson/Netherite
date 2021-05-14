import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Web3Service } from '../../Services/web3.service';

declare let window: any;

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
    let netheriteAmount: string = window.web3.utils.toWei(this.sellForm.value.netheriteAmount.toString(), 'ether');
    this.processing = true;

    await this.web3Service.sellTokens(netheriteAmount.toString(), this.account);
    this.processing = false;

    this.sellForm.reset();
  }

}
