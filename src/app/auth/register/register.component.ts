import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public submitted: boolean = false;

  public signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terms: [false, Validators.required]
    }, { validators: [this.validatePasswords(), this.validateTerms()] } as AbstractControlOptions);
  }

  fieldValidation(field: string): boolean {
    if (this.signUpForm.get(field)?.invalid && this.submitted) {
      return true;
    }

    return false;
  }

  comparePasswords() {
    const password1 = this.signUpForm.get('password')?.value;
    const password2 = this.signUpForm.get('password2')?.value;

    if ((password1 !== password2) && this.submitted) {
      return true
    }

    return false;
  }

  validatePasswords() {
    return (controls: AbstractControl) => {
      const password1 = controls.get('password');
      const password2 = controls.get('password2');

      if (password1?.value !== password2?.value) {
        password2?.setErrors({ match: false });
      }
    };
  }

  acceptTerms() {
    return !this.signUpForm.get('terms')?.value && this.submitted;
  }

  validateTerms() {
    return (controls: AbstractControl) => {
      const terms = controls.get('terms');

      if (!terms?.value) {
        return terms?.setErrors({ accepted: false });
      }
    }
  }

  createUser() {
    this.submitted = true;
    console.log(this.signUpForm.value);

    if (this.signUpForm.invalid) {
      return;
    }

    this.userService.createUser(this.signUpForm.value).subscribe({
      next: (resp: any) => {
        this.router.navigateByUrl('/');
      },
      error: err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }

}
