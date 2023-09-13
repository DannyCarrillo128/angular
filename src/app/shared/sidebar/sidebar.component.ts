import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public items: any[] = [];
  public user: User;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private sidebarService: SidebarService,
    private userService: UserService
  ) {
    this.items = sidebarService.menu;
    this.user = userService.user;
  }

  signOut() {
    this.userService.signOut();

    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
