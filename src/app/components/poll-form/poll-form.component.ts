import { Component, OnInit } from '@angular/core';

import { PollService } from '../../services/poll.service';
import { Poll } from '../../classes/poll';

import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.css'],
  providers: [PollService]
})
export class PollFormComponent implements OnInit {

  model:Poll = new Poll('', ['', '']);
  answers:Array<string> = ['', ''];
  constructor(private _pollService:PollService, private _router:Router) { }

  ngOnInit() {
  }

  public pollAnswersTrack(index:number, answer:string) {
    return index;
  }

  async onSubmit() {
    console.log('Submit');
    let poll = await this._pollService.addPoll(this.model);
    
    if(poll) {
      this._router.navigate(['polls', poll.id]);
    }
  }

  answerKeyUp(index:number) {
    this.model.answers[index] = this.answers[index];

    index + 1 == this.answers.length? this.answers.push(''): null;
  }

  public get inspector() {
    return JSON.stringify(this.model);
  }

}
