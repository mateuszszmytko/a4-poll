import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'RxJS/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class IpService {

  constructor(private _http:Http) { }

  getIp():Promise<string> {
    return this._http.get('https://api.ipify.org?format=json')
          .map(r => r.json().ip)
          .catch(e => {throw new Error(e)})
          .toPromise();
  }
}
