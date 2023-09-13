import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

declare const $: any;

const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent {

  @Input() user: User = new User('', '');

  @ViewChild('inputFile') imageInput!: ElementRef; 

  public picture: File = {} as File;
  public tempImage: any = null;

  constructor(
    private fileUploadService: FileUploadService
  ) { }

  show() {
    $('#exampleModal').on('show.bs.modal', () => {
      console.log('show modal');
    });
  }
  
  hide() {
    $('#exampleModal').on('hide.bs.modal', () => {
      this.user = new User('', '');
      this.tempImage = null;
      this.imageInput.nativeElement.value = '';
    });
  }

  save() {
    this.fileUploadService.updatePicture(this.picture, 'users', this.user.id!).then(picture => {
      this.user.profilePicture = picture;
      Swal.fire('Success', 'Profile picture updated.', 'success');
    })
    .catch(err => {
      Swal.fire('Error', err.error.message, 'error');
    });
  }

  selectImage(event: any) {
    const file = event.target.files[0];
    this.picture = file;

    if (!file) {
      this.tempImage = null;
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.tempImage = reader.result;
    };
  }

}
