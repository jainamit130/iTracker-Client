import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphstatService {
  private apiUrl1 =
    'http://localhost:8080/turbohire/stats';

  //const url = `${this.slotDetailsurl}/${slot.id}`;

  constructor(private http: HttpClient) {}

  getDetails(mailid:any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', mailid);
      return this.http.get<any>(this.apiUrl1, {
      params: queryParams,
    });
  }

  // getDetailsYear(mailid:any,startRangeYear:any,endRangeYear:any): Observable<any> {
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams.append('email', mailid);
  //   queryParams = queryParams.append('startDate', startRangeYear);
  //   queryParams = queryParams.append('endDate', endRangeYear);
  //   return this.http.get<any>(this.apiUrl1, {
  //     params: queryParams,
  //   });
  // }
}
