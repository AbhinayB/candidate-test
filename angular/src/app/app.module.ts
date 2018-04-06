import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RuglistComponent } from './components/ruglist/ruglist.component';
import { RouterModule,Routes } from '@angular/router';
import { NoUrlFoundComponent } from './components/no-url-found/no-url-found.component';
import { AddRugComponent } from './components/add-rug/add-rug.component';
import { FormsModule }   from '@angular/forms';
import {RugserviceService} from './services/rugservice.service';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {NgxPaginationModule} from 'ngx-pagination';
import { FullpageComponent } from './components/fullpage/fullpage.component';
import { EditrugComponent } from './components/editrug/editrug.component';

@NgModule({
  declarations: [
    AppComponent,
    RuglistComponent,
    NoUrlFoundComponent,
    AddRugComponent,
    FullpageComponent,
    EditrugComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    HttpModule,
    FlashMessagesModule
  ],
  providers: [RugserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
