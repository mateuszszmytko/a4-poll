import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './modules/app-routing.module';



import { AppComponent } from './app.component';
import { PollsListComponent } from './components/polls-list/polls-list.component';
import { PollComponent } from './components/poll/poll.component';
import { PollFormComponent } from './components/poll-form/poll-form.component';
import { PollChartComponent } from './components/poll-chart/poll-chart.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

import { PollService } from './services/poll.service';
import { IpService } from './services/ip.service';


@NgModule({
  declarations: [
    AppComponent,
    PollsListComponent,
    PollComponent,
    PollFormComponent,
    PollChartComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    
  ],
  providers: [PollService, IpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
