import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { IpService } from './ip.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Poll } from '../classes/poll';
import { IPoll, IVote } from '../../../api/interfaces/poll.interface';



@Injectable()
export class PollService {
  private apiUrl = 'http://localhost:3000/api/polls/';

  constructor(private _http:Http, private _ip:IpService) { }

  public getPolls():Observable<Poll[]> {
    return this._http.get(this.apiUrl)
                     .map(this.extractAllPolls)
                     .catch(r => []);
  }

  

  public getPoll(pollId:string):Observable<Poll> {
    return this._http.get(this.apiUrl+pollId)
                  .map(this.extractPoll);
                     
  }

  public addPoll(poll:IPoll) {
    return this._http.post(this.apiUrl, poll)
                     .map(this.extractPoll)
                     .toPromise()
                     .catch(r => {throw new Error(r)});
  }

  public removePoll(poll:string | Poll) {
    let pollId = typeof poll === 'string'? poll: poll.id;

    return this._http.delete(this.apiUrl+pollId)
                      .toPromise()
                      .catch(r => {throw new Error(r)});
  }

  public async addVote(poll:string | Poll, answerId:number) {
    let pollId = typeof poll === 'string'? poll: poll.id,
        ip = await this._ip.getIp();

    return this._http.put(this.apiUrl+pollId, {answer_id: answerId, ip: ip})
                      .map(this.extractPoll)
                      .toPromise()
                      .catch(r => {throw new Error(r)});
  }


  private extractPoll(res:Response) {
    let body = res.json(),
        poll = body.poll;
    
      return new Poll(poll) || null;
  }

  private extractAllPolls(res:Response):Array<Poll> {
    let body = res.json(),
        polls:Array<Poll> = [];
    
    for(let ipoll of body.polls) {
      polls.push(new Poll(ipoll));
    } 

    polls.sort((a:Poll, b:Poll) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return polls || [];
  }

  
}
