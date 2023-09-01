import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent {
  
  @Input() percentage: number = 50;
  @Input() btnColor: string = 'btn-warning';
  
  @Output('percentage') change: EventEmitter<number> = new EventEmitter();

  changePercentage(value: number) {
    if ((this.percentage !== 100 || value < 0) && (this.percentage !== 0 || value > 0)) {
      this.percentage = this.percentage + value;
      this.change.emit(this.percentage);
    }
  }

  onChange(value: number) {
    if (value > 100) {
      this.change.emit(100);
    }
    else if (value < 0) {
      this.change.emit(0);
    }
    else {
      this.change.emit(value);
    }
  }

}
