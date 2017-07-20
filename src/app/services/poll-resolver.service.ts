import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { PollService } from './poll.service';
import { Poll } from '../classes/poll';


import { Observable } from 'rxjs/Observable';



@Injectable()
export class PollResolverService implements Resolve<Poll | {}> {

  constructor(private _p: PollService, private _router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Poll | {}> {
    let id = route.paramMap.get('id');

    return this._p.getPoll(id)
          .catch(() => {
            this._router.navigate(['']);
            throw new Error('Poll not found.');
          });
  }

}
