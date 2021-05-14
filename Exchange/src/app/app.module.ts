import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxJdenticonModule } from "ngx-jdenticon";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyComponent } from './Components/buy/buy.component';
import { SellComponent } from './Components/sell/sell.component';
import { NavComponent } from './Components/nav/nav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    BuyComponent,
    SellComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgxJdenticonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
