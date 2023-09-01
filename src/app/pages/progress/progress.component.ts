import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.scss' ]
})
export class ProgressComponent {

  percentage1: number = 15;
  percentage2: number = 35;

  get getPercentage1() {
    return `${ this.percentage1 }%`;
  }

  get getPercentage2() {
    return `${ this.percentage2 }%`;
  }

}
