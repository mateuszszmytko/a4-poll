import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { IpService } from '../../services/ip.service';

import { PollService } from '../../services/poll.service';
import { Poll } from '../../classes/poll';

import 'rxjs/add/operator/switchMap';


import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
  providers: []
})
export class PollComponent implements OnInit {
  public poll:Poll;
  public userVote:number = -1;
  public selectedVote:number = this.userVote;

  public ip:string;
  public pollStream:Subject<Poll> = new Subject();

  constructor(private route: ActivatedRoute, private _pollService:PollService, private _ip:IpService, private _router:Router) { }

  async ngOnInit() {

    this.pollStream.subscribe(async p => {
      this.poll = p;
    });

    this.route.data
      .subscribe((data: {poll: Poll, ip: string}) => {
        this.ip = data.ip;
        this.pollStream.next(data.poll);

        const userVoteObj = this.poll.votes.find(v => v.ip == this.ip);
        this.userVote = (userVoteObj)? userVoteObj.answer_id: -1;
      });

  }

  async removePoll() {
    let a = await this._pollService.removePoll(this.poll);

    this._router.navigate(['/']);
  }

  async addVote() {
    let index = this.selectedVote;
    this.userVote = index;

    let poll = await this._pollService.addVote(this.poll, index);
    this.pollStream.next(poll);
  }
}

