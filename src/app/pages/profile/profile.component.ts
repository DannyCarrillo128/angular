import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent {

  public user: User;

  public profileForm: FormGroup;

  public picture: File = {} as File;
  public tempImage: any = null;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private userService: UserService
  ) {
    this.user = userService.user;

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: resp => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire('Success', 'User updated.', 'success');
      },
      error: err => {
        Swal.fire('Error', err.error.message, 'error');
      }
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

  uploadImage() {
    this.fileUploadService.updatePicture(this.picture, 'users', this.user.id!)
    .then(picture => {
      this.user.profilePicture = picture;
      Swal.fire('Success', 'Profile picture updated.', 'success');
    })
    .catch(err => {
      Swal.fire('Error', err.error.message, 'error');
    });
  }

}
