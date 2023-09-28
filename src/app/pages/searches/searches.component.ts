import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchesService } from '../../services/searches.service';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styles: [
  ]
})
export class SearchesComponent {

  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchesService: SearchesService
  ) {
    this.activatedRoute.params.subscribe({
      next: ({ query }) => {
        this.globalSearch(query);
      }
    });
  }

  globalSearch(query: string) {
    this.searchesService.globalSearch(query).subscribe({
      next: (resp: any) => {
        this.users = resp.users;
        this.hospitals = resp.hospitals;
        this.doctors = resp.doctors;
      }
    });
  }

  doctorDetails(doctor: Doctor) {
    this.router.navigateByUrl(`/dashboard/doctor/${ doctor.id }`);
  }

}
