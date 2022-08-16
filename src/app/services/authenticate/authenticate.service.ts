import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private apiUrl = 'http://localhost:8080/login/get';
  constructor(private http: HttpClient) {}

  getDetails(email: any, token: any, photoUrl: any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    queryParams = queryParams.append('token', token);
    queryParams = queryParams.append('pictureUrl', photoUrl);

    return this.http.get<any>(this.apiUrl, { params: queryParams });
  }
}
