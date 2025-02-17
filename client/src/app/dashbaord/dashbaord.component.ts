import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent {
  isInstitution: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.isInstitution = true;
  }

  createEvent() {
    this.router.navigate(['/create-event']);
  }

  viewEvents() {
    this.router.navigate(['/view-events']);
  }

  addResource() {
    this.router.navigate(['/add-resource']);
  }

  assignProfessional() {
    this.router.navigate(['/assign-professional']);
  }
}
