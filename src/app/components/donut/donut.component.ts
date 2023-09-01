import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent {

  @Input() title: string = 'Title';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  ngOnChanges() {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#22A699', '#F24C3D', '#F2BE22']
        }
      ],
    };
  }

}
