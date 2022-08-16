import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InterviewerDetailsService {
  //local json server url
  // private apiUrl = 'http://localhost:5000/panelDetails';
  private url =
    'http://localhost:8080/userView';

  constructor(private http: HttpClient) {}
  getPanelDetails(mailid): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', mailid);

    const apiUrl = `${this.url}/get`;

    return this.http.get<any>(apiUrl, {
      params: queryParams,
    });
  }
}
