import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { SubscribableOrPromise } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(_http:Http) {
      _http.get('http://localhost:3000/polls')
        .toPromise().then(e => {
          let polls = JSON.parse((<any>e)._body).polls;
          console.log(e, (<any>e)._body, polls[0]);
          _http.put('http://localhost:3000/polls/'+polls[0]._id, {answers_id: 2})
            .toPromise().then(a => {
              console.log(a);
            })
        })
  }
}
