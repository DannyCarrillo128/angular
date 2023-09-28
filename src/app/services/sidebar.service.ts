import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  public menu = [];

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService
  ) { }

  loadMenu() {
    const storedMenu = localStorage.getItem('menu');
    
    if (storedMenu) {
      this.menu = JSON.parse(storedMenu);
    } else {
      Swal.fire('Error', 'Internal error', 'error');
      this.userService.signOut();
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    }
  }

}
