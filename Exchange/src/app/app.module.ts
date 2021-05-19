import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxJdenticonModule } from "ngx-jdenticon";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyComponent } from './Components/buy/buy.component';
import { SellComponent } from './Components/sell/sell.component';
import { NavComponent } from './Components/nav/nav.component';
import { BalanceComponent } from './Components/balances/balances.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    BuyComponent,
    SellComponent,
    NavComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgxJdenticonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
