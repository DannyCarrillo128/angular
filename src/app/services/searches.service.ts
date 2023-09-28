import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
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

  globalSearch(query: string) {
    return this.http.get(`${ baseUrl }/global/${ query }`, this.options);
  }

  search(type: 'users' | 'doctors' | 'hospitals', query: string) {
    return this.http.get(`${ baseUrl }/global/collection/${ type }/${ query }`, this.options).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return resp.data.map((user: any) => new User(user.name, user.email, '', user.profilePicture, user.role, user.google, user.id));
            break;
          case 'doctors':
            return resp.data.map((doctor: any) => new Doctor(doctor.name, doctor.image, doctor.createdBy, doctor.updated, doctor.hospital, doctor.id));
            break;
          case 'hospitals':
            return resp.data.map((hospital: any) => new Hospital(hospital.name, hospital.image, hospital.createdBy, hospital.updatedBy, hospital.id));
            break;
        }
      })
    );
  }

}
