import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isInstitution = false;
  isProfessional = false;
  isParticipant = false;
  userRole: any;

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router:Router
  ) { }

  ngOnInit(): void {
    // Determine user role and set flags accordingly
    this.userRole = this.getUserRole();

    console.log(this.isInstitution)
    console.log(this.isProfessional)
    console.log(this.isParticipant)
  }

  getUserRole(): any {
    const userType = localStorage.getItem('role');
    
    if (userType == 'INSTITUTION') {
      this.isInstitution = true;
    } else if (userType == 'PROFESSIONAL') {
      this.isProfessional = true;
    } else if (userType == 'PARTICIPANT') {
      this.isParticipant = true;
    }
    
    return userType;    
  }

  logout(): void {
    console.log('Logout action triggered');

    this.authService.logout();

    if(!this.authService.getLoginStatus){
      this.router.navigateByUrl('/login');
    }    
    
    window.location.reload();
    this.displayUserDetails();
  }

  // 🔴
  displayUserDetails() {    
    console.log("Login status : ", this.authService.getLoginStatus);
    console.log("Role : ", this.authService.getRole);
  }

  createEvent(): void {
    console.log('Create event action triggered');
    this.router.navigateByUrl('/create-event');

  }

  viewEvents(): void {
    console.log('View events action triggered');
    this.router.navigateByUrl('/view-events');
  }

  addResource(): void {
    console.log('Add resource action triggered');    
    this.router.navigateByUrl('/add-resource');
  }

  assignProfessional(): void {
    console.log('Assign professional action triggered');
    this.router.navigateByUrl('/assign-professional');
  }

  viewAssignedEvents(): void {
    console.log('View assigned events action triggered');
    this.router.navigateByUrl('/view-events');    
  }

  enrollInEvent(eventId: string): void {
    console.log(`Enroll in event action triggered for event ID: ${eventId}`);
    // Perform enroll in event logic here
  }

  viewEventStatus(eventId: string): void {
    console.log(`View event status action triggered for event ID: ${eventId}`);
    // Perform view event status logic here
  }

  provideFeedback(eventId: string): void {
    console.log(`Provide feedback action triggered for event ID: ${eventId}`);
  }

  updateEventStatus(eventId: string, status: string): void {
    console.log(`Update event status action triggered for event ID: ${eventId} with status: ${status}`);
    console.log(`Update event status to ${status} for event ID ${eventId}`);

  }

  viewAllEvents(){
    this.router.navigateByUrl('/view-events');
  }
  
  // 🔍 To be implemented later : NEW COMPONENT CREATE KRNA HAI
  viewFeedback(){
    const userId = localStorage.getItem("userId");
    console.log("Hello");
    this.router.navigateByUrl(`/view-feedback/${userId}`);
  }

}
