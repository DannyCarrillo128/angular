import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

declare const $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnChanges {

  @Input() type!: 'users' | 'doctors' | 'hospitals';
  @Input() obj: any;

  @ViewChild('inputFile') imageInput!: ElementRef; 

  public selectedFile: File = {} as File;
  public preview: any = null;
  public img: string = '';

  constructor(
    private fileUploadService: FileUploadService
  ) { }

  ngOnChanges() {
    if (this.type === 'users') {
      this.img = this.obj.profilePicture;
    } else {
      this.img = this.obj.image;
    }
  }

  show() {
    $('#exampleModal').on('show.bs.modal', () => {
      console.log('show modal');
    });
  }
  
  hide() {
    $('#exampleModal').on('hide.bs.modal', () => {
      this.clear();
    }).modal('hide')
      .off('show.bs.modal hide.bs.modal'); // Remove both events
  }

  clear() {
    this.preview = null;
    this.imageInput.nativeElement.value = '';
  }

  save() {
    this.fileUploadService.updatePicture(this.selectedFile, this.type, this.obj.id).then(picture => {
      if (this.type === 'users') {
        this.obj.profilePicture = picture;
      } else {
        this.obj.image  = picture;
      }
      this.hide();
      Swal.fire('Success', 'Profile picture updated.', 'success');
      this.ngOnChanges();
    })
    .catch(err => {
      Swal.fire('Error', err.error.message, 'error');
    });
  }

  selectImage(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    if (!file) {
      this.preview = null;
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.preview = reader.result;
    };
  }

}
