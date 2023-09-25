import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  getHospitals(from: number = 0) {
    return this.http.get(`${ baseUrl }/hospitals?start=${ from }`, this.options);
  }

  createHospital(name: string) {
    return this.http.post(`${ baseUrl }/hospitals`, { name }, this.options);
  }

  updateHospital(id: string, name: string) {
    return this.http.put(`${ baseUrl }/hospitals/${ id }`, { name }, this.options);
  }

  deleteHospital(id: string) {
    return this.http.delete(`${ baseUrl }/hospitals/${ id }`, this.options);
  }

}
