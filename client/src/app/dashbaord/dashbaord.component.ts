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
  
  isInstitution: boolean = false;
  isProfessional: boolean = false;
  isParticipant: boolean = false;
  institutionEvents: any[] = [];
  professionalEvents: any[] = [];
  participantEvents: any[] = [];

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.checkUserType();
    this.loadData();

    const result = this.authService.getLoginStatus;
    console.log("Login status : ", result)
  }

  checkUserType(): void {
    const userType = localStorage.getItem('role');
    console.log(userType);
    // const userType = this.getUserType();

    if (userType === 'INSTITUTION') {
      this.isInstitution = true;
    } else if (userType === 'PROFESSIONAL') {
      this.isProfessional = true;
    } else if (userType === 'PARTICIPANT') {
      this.isParticipant = true;
    }
  }

  getUserType(): string {
    // Placeholder for actual logic to get the user type
    // This could be from a service or stored session data
    return 'PARTICIPANT'; // Example return value
  }

  logout():void {
    this.authService.logout();

    if(!this.authService.getLoginStatus){
      this.router.navigateByUrl('/login');
    }    
    
    this.displayUserDetails();
  }

  displayUserDetails() {    
    console.log("Login status : ", this.authService.getLoginStatus);
    console.log("Role : ", this.authService.getRole);
  }

  loadData(): void {
    if (this.isInstitution) {
      this.institutionEvents = this.getInstitutionEvents();
    } else if (this.isProfessional) {
      this.professionalEvents = this.getProfessionalEvents();
    } else if (this.isParticipant) {
      this.participantEvents = this.getParticipantEvents();
    }
  }

  createEvent(): void {
    // Logic to create event
    console.log('Create event');
    this.router.navigateByUrl('/create-event');
  }
  
  viewEvents(): void {
    // Logic to view institution events
    console.log('View institution events');
    this.router.navigateByUrl('/view-events');
  }
  
  addResource(): void {
    // Logic to add resource
    console.log('Add resource');
    this.router.navigateByUrl('/add-resource');
  }
  
  assignProfessional(): void {
    // Logic to assign professional to event
    console.log('Assign professional');
    this.router.navigateByUrl('/assign-professional');
  }
  
  viewAssignedEvents(): void {
    // Logic to view assigned events for professionals
    console.log('View assigned events');
    this.router.navigateByUrl('/view-events');
  }
  
  updateEventStatus(eventId: number, status: string): void {
    // Logic to update event status
    console.log(`Update event status to ${status} for event ID ${eventId}`);
  }
  
  provideFeedback(eventId: number): void {
    // Logic to provide feedback
    console.log(`Provide feedback for event ID ${eventId}`);
  }
  
  viewAllEvents(): void {
    // Logic to view all events for participants
    console.log('View all events');
    this.router.navigateByUrl('/view-events');
  }

  // enroll participant in a event 🔴 this is of no use i think
  enrollInEvent(eventId: number): void {
    // Logic to enroll in an event
  }

  viewEventStatus(eventId: number): void {
    // Logic to view event status
    console.log(`View status for event ID ${eventId}`);
  }

  // Mock data retrieval methods
  getInstitutionEvents(): any[] {
    return [
      { id: 1, title: 'Financial Planning Workshop', description: 'Learn the basics of financial planning.' },
      { id: 2, title: 'Investment Strategies Seminar', description: 'Discover various investment strategies.' }
    ];
  }

  getProfessionalEvents(): any[] {
    return [
      { id: 3, title: 'Advanced Financial Modeling', description: 'In-depth session on financial modeling.' },
      { id: 4, title: 'Risk Management Workshop', description: 'Understand risk management techniques.' }
    ];
  }

  getParticipantEvents(): any[] {
    return [
      { id: 5, title: 'Personal Finance 101', description: 'Introduction to personal finance.' },
      { id: 6, title: 'Stock Market Basics', description: 'Learn the fundamentals of the stock market.' }
    ];
  }


}
