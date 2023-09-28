import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LogInForm } from '../interfaces/log-in-form';
import { SignUpForm } from '../interfaces/sign-up-form';
import { User } from '../models/user.model';

declare const google: any;

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor(
    private http: HttpClient
  ) { }

  get id(): string {
    return this.user.id || '';
  }

  get role(): string {
    return this.user.role || '';
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get options() {
    return {
      headers: { 'x-token': this.token }
    };
  }

  signIn(data: LogInForm) {
    return this.http.post(`${ baseUrl }/login`, data).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    );
  }

  googleSignIn(token: string) {
    return this.http.post(`${ baseUrl }/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${ baseUrl }/login/renewal`, this.options).pipe(
      map((resp: any) => {
        const { name, email, profilePicture, role, google, id } = resp.user;
        this.user = new User(name, email, '', profilePicture, role, google, id);

        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
        
        return true;
      }),
      catchError(error => of(false))
    );
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    google.accounts.id.revoke('dannycarrillo128@gmail.com', () => { console.log(':D'); });
  }

  getUsers(from: number = 0) {
    return this.http.get(`${ baseUrl }/users?start=${ from }`, this.options).pipe(
      map((resp: any) => {
        const users = resp.users.map((user: any) => new User(user.name, user.email, '', user.profilePicture, user.role, user.google, user.id));
        return {
          total: resp.total,
          users
        };
      })
    );
  }

  createUser(data: SignUpForm) {
    return this.http.post(`${ baseUrl }/users`, data).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    );
  }

  updateProfile(data: User) {
    data.role = this.user.role; 
    return this.http.put(`${ baseUrl }/users/${ this.id }`, data, this.options);
  }

  updateUser(user: User) {
    return this.http.put(`${ baseUrl }/users/${ user.id }`, user, this.options);
  }

  deleteUser(user: User) {
    return this.http.delete(`${ baseUrl }/users/${ user.id }`, this.options);
  }

}
