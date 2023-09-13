import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { DonutComponent } from './donut/donut.component';
import { IncrementComponent } from './increment/increment.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    DonutComponent,
    IncrementComponent,
    ModalComponent
  ],
  exports: [
    DonutComponent,
    IncrementComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
