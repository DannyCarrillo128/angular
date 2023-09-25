import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DoctorService } from '../../services/doctor.service';
import { SearchesService } from '../../services/searches.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  public doctors: Doctor[] = [];
  public doctorsTemp: Doctor[] = [];
  public total: number = 0;
  public loading: boolean = false;
  public selectedDoctor: Doctor = new Doctor('');

  constructor(
    private doctorService: DoctorService,
    private searchesService: SearchesService
  ) { }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.loading = true;

    this.doctorService.getDoctors().subscribe({
      next: (resp: any) => {
        this.total = resp.total;
        this.doctors = resp.doctors;
        this.doctorsTemp = resp.doctors;
        this.loading = false;
      }
    });
  }

  search(query: string) {
    if (query !== '') {
      this.searchesService.search('doctors', query).subscribe({
        next: resp => { this.doctors = resp; }
      });
    } else {
      this.doctors = this.doctorsTemp;
    }
  }

  show(doctor: Doctor) {
    this.selectedDoctor = doctor;
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You will delete to Dr. ${ doctor.name }`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor.id!).subscribe({
          next: (resp: any) => {
            Swal.fire('Done', `${ doctor.name } has been deleted.`, 'success');
          },
          error: err => {
            Swal.fire('Error', err.error.message, 'error');
          }
        });
      }
    });
  }

}
