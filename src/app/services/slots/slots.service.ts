import { Injectable } from '@angular/core';
import { EMPTY, of, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  // this is url for local JSON server
  // As of now we have kept it
  private slotDetailsurl = 'http://localhost:5000/slotDetails';

  private url =
    'http://localhost:8080/slotView';

  constructor(private http: HttpClient) {}

  // Backend services

  getSlot(mailid): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', mailid);

    const sloturl = `${this.url}/get`;

    return this.http
      .get<any>(sloturl, {
        params: queryParams,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  addSlot(slot: any): Observable<any> {
    const sloturl = `${this.url}/add`;
    return this.http.post<any>(sloturl, slot).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    //let errMsg = error.status;
    //console.log('NOT FOUND: ' + errMsg);
    return throwError(error);
  }

  updateSlot(slot: any): Observable<any> {
    const sloturl = `${this.url}/update`;
    let errorMsg: string;
    return this.http.put<any>(sloturl, slot).pipe(
      map((data) => {
        // console.log('STATUS CODE ' + data.status);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  deleteSlot(slot: any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', slot.id);

    const sloturl = `${this.url}/delete`;

    return this.http
      .delete<any>(sloturl, {
        params: queryParams,
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          return of({});
        })
      );
  }
}
