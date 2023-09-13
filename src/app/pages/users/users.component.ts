import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SearchesService } from '../../services/searches.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public usersTemp: User[] = [];
  public total: number = 0;
  public loading: boolean = true;
  public from: number = 0;
  public selectedUser: User = new User('', '');
  // public totalPages: number = 0;

  constructor(
    private searchesService: SearchesService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;

    this.userService.getUsers(this.from).subscribe({
      next: (resp: any) => {
        this.total = resp.total;
        this.users = resp.users;
        this.usersTemp = resp.users;

        /* const pageSize = 5;
        this.totalPages = Math.floor(this.total / pageSize);
        if ((this.total % pageSize) > 0) {
          this.totalPages += 1;
        }
        console.log(this.totalPages); */

        this.loading = false;
      }
    });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    }
    else if (this.from >= this.total) {
      this.from -= value;
    }

    this.getUsers();
  }

  search(query: string) {
    if (query !== '') {
      this.searchesService.search('users', query).subscribe({
        next: resp => {
          this.users = resp;
          console.log(resp);
        }
      });
    } else {
      this.users = this.usersTemp;
    }
  }

  updateRole(user: User) {
    this.userService.updateUser(user).subscribe({
      next: resp => console.log(resp)
    });
  }

  deleteUser(user: User) {
    if (user.id === this.userService.id) {
      Swal.fire('Forbidden operation', `You can't delete this user`, 'info');
      return;
    }
    
    Swal.fire({
      title: 'Are you sure',
      text: 'You will delete a user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(result => {
      if (result.value) {
        this.userService.deleteUser(user).subscribe({
          next: () => {
            Swal.fire('Done', 'User has been deleted.', 'success');
          },
          error: err => {
            Swal.fire('Error', err.error.message, 'error');
          }
        });
      }
    });
  }

  show(user: User) {
    this.selectedUser = user;
  }

}
