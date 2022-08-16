import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecruiterdetailsService {
  private apiUrl =
    'http://localhost:8080/recruiterView/get';

  constructor(private http: HttpClient) {}

  getDetails(
    startdate: any,
    enddate: any,
    skillFilter: any,
    roundFilter: any
  ): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('startDate', startdate);
    queryParams = queryParams.append('endDate', enddate);

    if (skillFilter) {
      queryParams = queryParams.append('skill', skillFilter);
    }
    if (roundFilter) {
      queryParams = queryParams.append('round', roundFilter);
    }

    return this.http
    .get<any>(this.apiUrl, { params: queryParams })
    .pipe(
      catchError((err) => {
        console.log(err);
        return of({});
      })
    );
  }
}
