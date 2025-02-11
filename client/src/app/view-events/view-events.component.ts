import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss'],
  providers: [DatePipe]
})
export class ViewEventsComponent implements OnInit {   
    events: any[] = [];
    userId: any = localStorage.getItem('userId');
    userRole: any = localStorage.getItem('role');

    constructor(
      private router: Router,
      private httpService: HttpService,
      private authService: AuthService,
      private datePipe: DatePipe
    ) {}
  
    ngOnInit(): void {
      this.loadEvents();
    }
  
    // loadEvents(): void {
    //   this.httpService.getEventByInstitutionId(this.userId).subscribe((data: any[]) => {      
    //     console.log(data);
    //     this.events = data;
    //   });
    // }

    loadEvents(): void {
        if (this.userRole === 'INSTITUTION') {
          this.httpService.getEventByInstitutionId(this.userId).subscribe((data: any[]) => {
            this.events = data;
          });
        } else if (this.userRole === 'PROFESSIONAL') {
          this.httpService.getEventByProfessional(this.userId).subscribe((data: any[]) => {
            this.events = data;
          });
        } else if (this.userRole === 'PARTICIPANT') {
          this.httpService.viewAllEvents().subscribe((data: any[]) => {
            this.events = data;
          });
        }
      }
  
    viewEvent(eventId: number): void {
      this.router.navigate(['/event', eventId]);
    }
  
    formatDate(date: string): string | null {
      return this.datePipe.transform(date, 'short');
    }


}