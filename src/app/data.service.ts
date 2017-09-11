import 'rxjs/add/operator/map';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private actionUrl: string;
  private itemObj: object;

  constructor(private http: HttpClient) {
    this.actionUrl = 'http://ec2-52-66-154-84.ap-south-1.compute.amazonaws.com:8080/ebillers/api/v1/admin/bill/category/all?';
  }

  public setItem(obj, id): void {
    this.itemObj = obj.items[id-1];
  }

  public getItem() {
    return this.itemObj;
  }

  public getData<T>(id: number): Observable<T> {
    return this.http.get<T>(this.actionUrl + "offset=" + id + "&limit=5");
  }

  public getAll<T>(): Observable<T> {
    return this.http.get<T>('http://jsonplaceholder.typicode.com/posts/1');
  }

  public getSingle<T>(id: number): Observable<T> {
    return this.http.get<T>(this.actionUrl + id);
  }

  public add<T>(itemName: string): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.actionUrl, toAdd);
  }

  public update<T>(id: number, itemToUpdate: any): Observable<T> {
    return this.http
      .put<T>(this.actionUrl + id, JSON.stringify(itemToUpdate));
  }

  public delete<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.actionUrl + id);
  }
}


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    req = req.clone({ headers: req.headers.set('Origin', 'http://evil.com') });
    console.log(JSON.stringify(req.headers));
    return next.handle(req);
  }
}
