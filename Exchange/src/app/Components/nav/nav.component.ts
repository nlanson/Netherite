import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../../app.component';

type Action = 'buy' | 'sell';

@Component({
  selector: 'Nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() public account: string;

  action: Action;

  constructor(
    private root: AppComponent
  ) {
    this.action = this.root.action;
  }


  ngOnInit(): void {
  }

  changeAction() {
    if( this.action == 'buy') {
      this.root.action = 'sell';
      this.action = 'sell';
    } else if ( this.action = 'sell' ) {
      this.root.action = 'buy';
      this.action = 'buy';
    } else {
      //Default go to buy action.
      this.root.action = 'buy';
      this.action = 'buy';
    }
  }

}
