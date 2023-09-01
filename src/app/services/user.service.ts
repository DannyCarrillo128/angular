import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LogInForm } from '../interfaces/log-in-form';
import { SignUpForm } from '../interfaces/sign-up-form';

declare const google: any;

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  signIn(data: LogInForm) {
    return this.http.post(`${ baseUrl }/login`, data).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  googleSignIn(token: string) {
    return this.http.post(`${ baseUrl }/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ baseUrl }/login/renewal`, { headers: { 'x-token': token } }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  signOut() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('dannycarrillo128@gmail.com', () => { console.log(':D'); });
  }

  createUser(data: SignUpForm) {
    return this.http.post(`${ baseUrl }/users`, data).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

}
