import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user: User;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService
  ) {
    this.user = userService.user;
  }

  signOut() {
    this.userService.signOut();
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  search(query: string) {
    if (query) {
      this.router.navigateByUrl(`/dashboard/searches/${ query }`);
    }
  }

}
