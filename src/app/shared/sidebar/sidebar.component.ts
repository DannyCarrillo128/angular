import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  items: any[] = [];

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private sidebarService: SidebarService,
    private userService: UserService
  ) {
    this.items = sidebarService.menu;
  }

  signOut() {
    this.userService.signOut();

    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
