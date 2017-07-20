import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { IpService } from './ip.service';

@Injectable()
export class IpResolverService implements Resolve<string> {

  constructor(private _ip:IpService) { }

  resolve():Promise<string> {
    return this._ip.getIp()
            .catch((e) => {
              throw new Error(e);
            });
  }

}
