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
    // Check if the user is an institution (this is just a placeholder, replace with your actual logic)
    this.isInstitution = true;
  }

  createEvent() {
    // Logic to create an event
    console.log('Creating an event...');
    // Navigate to the create event page
    this.router.navigate(['/create-event']);
  }

  viewEvents() {
    // Logic to view events
    console.log('Viewing events...');
    // Navigate to the view events page
    this.router.navigate(['/view-events']);
  }

  addResource() {
    // Logic to add a resource
    console.log('Adding a resource...');
    // Navigate to the add resource page
    this.router.navigate(['/add-resource']);
  }

  assignProfessional() {
    // Logic to assign a professional
    this.router.navigate(['/assign-professional']);
  }
}
