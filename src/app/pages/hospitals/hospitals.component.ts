import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HospitalService } from '../../services/hospital.service';
import { SearchesService } from '../../services/searches.service';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public total: number = 0;
  public loading: boolean = false;
  public selectedHospital: Hospital = new Hospital('');

  constructor(
    private hospitalService: HospitalService,
    private searchesService: SearchesService
  ) { }

  ngOnInit() {
    this.getHospitals();
  }

  getHospitals() {
    this.loading = true;
    
    this.hospitalService.getHospitals().subscribe({
      next: (resp: any) => {
        this.total = resp.total;
        this.hospitals = resp.hospitals;
        this.hospitalsTemp = resp.hospitals;
        this.loading = false;
      }
    });
  }

  search(query: string) {
    if (query !== '') {
      this.searchesService.search('hospitals', query).subscribe({
        next: resp => { this.hospitals = resp; }
      });
    } else {
      this.hospitals = this.hospitalsTemp;
    }
  }

  async createHospital() {
    const { value } = await Swal.fire({
      title: 'New hospital',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true,
      cancelButtonColor: '#d33'
    });

    if (value) {
      this.hospitalService.createHospital(value.trim()).subscribe({
        next: (resp: any) => {
          this.hospitals = [...this.hospitals, resp.hospital];
          Swal.fire('Done', `${ value } created.`, 'success');
        },
        error: err => {
          Swal.fire('Error', err.error.message, 'error');
        }
      });
    }
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital.id!, hospital.name).subscribe({
      next: resp => {
        Swal.fire('Hospital updated.', '', 'success');
      },
      error: err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }

  show(hospital: Hospital) {
    this.selectedHospital = hospital;
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will delete this hospital',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital.id!).subscribe({
          next: (resp: any) => {
            Swal.fire('Done', `${ hospital.name } has been deleted.`, 'success');
          },
          error: err => {
            Swal.fire('Error', err.error.message, 'error');
          }
        });
      }
    });
  }

}
