import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

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

  getDoctors(from: number = 0) {
    return this.http.get(`${ baseUrl }/doctors?start=${ from }`, this.options);
  }

  getDoctor(id: string) {
    return this.http.get(`${ baseUrl }/doctors/${ id }`, this.options);
  }

  createDoctor(name: string, hospital: string) {
    return this.http.post(`${ baseUrl }/doctors`, { name, hospital }, this.options);
  }

  updateDoctor(doctor: string, name: string, hospital: string) {
    return this.http.put(`${ baseUrl }/doctors/${ doctor }`, { name, hospital }, this.options);
  }

  deleteDoctor(id: string) {
    return this.http.delete(`${ baseUrl }/doctors/${ id }`, this.options);
  }

}
