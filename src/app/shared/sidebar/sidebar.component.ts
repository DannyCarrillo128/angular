import { Component, NgZone, OnInit } from '@angular/core';
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
export class SidebarComponent implements OnInit {

  public items: any[] = [];
  public user: User;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private sidebarService: SidebarService,
    private userService: UserService
  ) {
    this.user = userService.user;
  }

  ngOnInit() {
    this.items = this.sidebarService.menu;
  }

  signOut() {
    this.userService.signOut();

    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
