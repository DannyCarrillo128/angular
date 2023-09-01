import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: []
})
export class PromisesComponent implements OnInit {

  ngOnInit() {
    /* const promise = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hello world');
      } else {
        reject('Something went wrong');
      }
    });

    promise.then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });

    console.log('onInit ends'); */

    this.getUsers().then(users => {
      console.log(users);
    });
  }

  getUsers() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
         .then(resp => resp.json())
         .then(body => resolve(body.data));
    });
  }

}
