import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePicture(file: File, type: 'users' | 'doctors' | 'hospitals', id: string) {
    try {
      const url = `${ baseUrl }/uploads/${ type }/${ id }`;

      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: { 'x-token': localStorage.getItem('token') || '' },
        body: formData
      });
      
      const data = await resp.json();

      if (data.name) {
        return data.name;
      }

      return false;
    } catch(error) {
      console.log(error);
      return false;
    }
  }

}
