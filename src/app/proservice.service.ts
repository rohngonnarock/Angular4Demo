import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProserviceService {
  private heroesUrl = 'http://ec2-52-66-154-84.ap-south-1.compute.amazonaws.com:8080/ebillers/api/v1/admin/bill/category/all?';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(id: number): Promise<any> {
    return this.http.get(this.heroesUrl + "offset=" + id + "&limit=5")
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
