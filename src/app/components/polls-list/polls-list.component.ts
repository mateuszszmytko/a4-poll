import { Component, OnInit } from '@angular/core';

import { PollService } from '../../services/poll.service';
import { Poll } from '../../classes/poll';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss']
})
export class PollsListComponent implements OnInit {

  constructor(private _pollSerive:PollService) { }
  polls:Observable<Poll[]>;

  ngOnInit() {
    this.polls = this._pollSerive.getPolls();
    this._pollSerive.getPolls().subscribe(p => {
      console.log('noe elo');
    })
    this._pollSerive.getPoll('5965509bb8e5e92324760b81').subscribe((p) => {
      console.log(p);
    })
    
  }

}
