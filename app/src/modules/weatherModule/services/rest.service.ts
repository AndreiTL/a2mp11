import {Injectable} from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestService {

  constructor(private http: Http) {

  }
  // sendRequest(type: string, url: string, async: boolean, body: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     let xhr = new XMLHttpRequest();
  //     xhr.open(type, url, async);
  //     xhr.send([body]);
  //     xhr.onreadystatechange = function() {
  //       if (this.readyState !== 4) {
  //         return;
  //       }
  //       if (this.status !== 200) {
  //         reject(null);
  //       } else {
  //         resolve(this.responseText);
  //       }
  //     };
  //   });
  // }

  sendRequestRx (type: string, url: string, async: boolean, body: string): Observable<Weather.IWeatherObject> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (type.toLowerCase() === 'get'){
      return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError);
    } else if (type.toLowerCase() === 'post') {
      return this.http.post(url, body)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      console.log('Not implemented other types of request');
    }


  }
  private extractData(res: Response): Weather.IWeatherObject {
    console.dir(res);
    let body = res.json();
    console.dir(body);
    return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
