import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';


import { PollsListComponent } from '../components/polls-list/polls-list.component';
import { PollComponent } from '../components/poll/poll.component';
import { PollFormComponent } from '../components/poll-form/poll-form.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';

import { PollResolverService } from '../services/poll-resolver.service';
import { IpResolverService } from '../services/ip-resolver.service';

const appRoutes: Routes = [
  { path: 'polls/add', component: PollFormComponent },
  { 
    path: 'polls/:id', 
    component: PollComponent,
    resolve: {
      poll: PollResolverService,
      ip: IpResolverService
    }
  },
  { path: '', component: PollsListComponent },
  { path: '**', component: PagenotfoundComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers: [PollResolverService, IpResolverService]
})
export class AppRoutingModule { }
