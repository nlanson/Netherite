import { Component } from '@angular/core';
import { BlockchainService } from './services/blockchain.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(
    private bcs: BlockchainService
  ) {

  }

  async ngOnInit() {

  }

}
