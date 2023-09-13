import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get options() {
    return {
      headers: { 'x-token': this.token }
    };
  }

  search(type: 'users' | 'doctors' | 'hospitals', query: string) {
    return this.http.get(`${ baseUrl }/global/collection/${ type }/${ query }`, this.options).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return resp.data.map((user: any) => new User(user.name, user.email, '', user.profilePicture, user.role, user.google, user.id));
            break;
        }
      })
    );
  }

}