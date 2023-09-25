import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from '../../services/hospital.service';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedDoctor!: Doctor;
  public selectedHospital!: Hospital;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorService,
    private hospitalService: HospitalService
    ) {    
      this.doctorForm = this.fb.group({
        name: ['', Validators.required],
        hospital: ['', Validators.required]
      });
      
      this.getHospitals();
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: ({ id }) => this.getDoctor(id)
    });

    this.doctorForm.get('hospital')?.valueChanges.subscribe({
      next: resp => {
        this.selectedHospital = this.hospitals.find(hospital => hospital.id === resp)!;
      }
    });
  }

  getDoctor(id: string) {
    this.doctorService.getDoctor(id).subscribe({
      next: (resp: any) => {
        this.selectedDoctor = resp.doctor;

        const { name, hospital } = resp.doctor;
        this.selectedHospital = hospital;
        this.doctorForm.setValue({ name, hospital: hospital._id });
      }
    });
  }

  getHospitals() {
    this.hospitalService.getHospitals().subscribe({
      next: (resp: any) => {
        this.hospitals = resp.hospitals;
      }
    });
  }

  save() {
    const { name, hospital } = this.doctorForm.value;

    if (this.selectedDoctor) {
      this.doctorService.updateDoctor(this.selectedDoctor.id!, name, hospital).subscribe({
        next: resp => {
          Swal.fire('Doctor updated', `Dr. ${ name } was updated.`, 'success');
        },
        error: err => {
          Swal.fire('Error', err.error.message, 'error');
        }
       });
    } else {
      this.doctorService.createDoctor(name, hospital).subscribe({
        next: (resp: any) => {
          Swal.fire('Doctor created', `Dr. ${ name } was added.`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${ resp.doctor.id }`);
        },
        error: err => {
          Swal.fire('Error', err.error.message, 'error');
        }
      });
    }
  }

}
