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
    this.userRole = this.getUserRole();
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
    this.authService.logout();

    if(!this.authService.getLoginStatus){
      this.router.navigateByUrl('/');
    }        
    window.location.reload();
  }

  createEvent(): void {
    this.router.navigateByUrl('/create-event');
  }

  viewEvents(): void {
    this.router.navigateByUrl('/view-events');
  }

  addResource(): void {
    this.router.navigateByUrl('/add-resource');
  }

  assignProfessional(): void {
    this.router.navigateByUrl('/assign-professional');
  }

  viewAssignedEvents(): void {
    this.router.navigateByUrl('/view-events');    
  }

  viewAllEvents(){
    this.router.navigateByUrl('/view-events');
  }
  
  viewFeedback(){
    const userId = localStorage.getItem("userId");
    console.log("Hello");
    this.router.navigateByUrl(`/view-feedback`);
  }
}
