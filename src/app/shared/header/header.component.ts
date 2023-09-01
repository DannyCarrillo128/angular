import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService
  ) { }

  signOut() {
    this.userService.signOut();
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
