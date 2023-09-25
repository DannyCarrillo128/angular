import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string = '', type: 'users' | 'doctors' | 'hospitals'): string {
    if (image) {
      if (image.includes('https')) {
        return image;
      }

      return `${ baseUrl }/uploads/${ type }/${ image }`;
    }

    return `${ baseUrl }/uploads/${ type }/no-image`;
  }

}
