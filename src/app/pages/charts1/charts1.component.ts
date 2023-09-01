import { Component } from '@angular/core';

@Component({
  selector: 'app-charts1',
  templateUrl: './charts1.component.html',
  styleUrls: []
})
export class Charts1Component {

  labels1: string[] = ['Label1', 'Label2', 'Label3'];
  data1: number[] = [350, 450, 100];

  labels2: string[] = ['Label1', 'Label2', 'Label3'];
  data2: number[] = [100, 300, 400];

  labels3: string[] = ['Label1', 'Label2', 'Label3'];
  data3: number[] = [200, 200, 400];

  labels4: string[] = ['Label1', 'Label2', 'Label3'];
  data4: number[] = [650, 150, 200];

}
