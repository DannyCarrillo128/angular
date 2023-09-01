import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public submitted: boolean = false;
  public storedEmail: string = '';

  public logInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService
  ) {
    this.storedEmail = localStorage.getItem('email') || '';

    this.logInForm = this.fb.group({
      email: [this.storedEmail, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "771334721260-59erfppig8pm8sapb1su76o3e5frvngk.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }
    );
  }

  handleCredentialResponse(response: any) {
    this.userService.googleSignIn(response.credential).subscribe({
      next: resp => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      },
      error: err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }

  login() {
    this.userService.signIn(this.logInForm.value).subscribe({
      next: resp => {
        if (this.logInForm.get('rememberMe')?.value) {
          localStorage.setItem('email', this.logInForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        
        this.router.navigateByUrl('/');
      }, 
      error: err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }

}
