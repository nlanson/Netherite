import { Injectable } from '@angular/core';
import Web3 from "web3";

declare let window: any;


@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public web3: any;
  private accounts: Array<String>;
  public ready: Boolean = false;

  constructor() {

  }

  async loadWeb3() {

  }
}
