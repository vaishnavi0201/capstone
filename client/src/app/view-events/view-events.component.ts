import { Component, OnInit } from '@angular/core';
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
  filteredEvents: any[] = [];
  userId: any = localStorage.getItem('userId');
  userRole: any = localStorage.getItem('role');
  enrollmentStatus: { [eventId: number]: string } = {};
  searchTerm: string = '';
  sortBy: string = '';

  constructor(
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    if (this.userRole === 'INSTITUTION') {
      this.httpService.getEventByInstitutionId(this.userId).subscribe((data: any[]) => {
        this.events = this.sortByLatest(data);
        this.filteredEvents = this.events;
      });
    } else if (this.userRole === 'PROFESSIONAL') {
      this.httpService.getEventByProfessional(this.userId).subscribe((data: any[]) => {
        this.events = this.sortByLatest(data);
        this.filteredEvents = this.events;
      });
    } else if (this.userRole === 'PARTICIPANT') {
      this.httpService.viewAllEvents().subscribe((data: any[]) => {
        this.events = this.sortByLatest(data);
        this.filteredEvents = this.events;
        this.loadEnrollmentStatus();
      });
    }
  }

  sortByLatest(events: any[]): any[] {
    return events.sort((a, b) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime());
  }

  loadEnrollmentStatus(): void {
    this.events.forEach(event => {
      this.httpService.GetEnrollmentDetail(event.id, this.userId).subscribe((detail: any) => {
        if (detail && detail.status) {
          this.enrollmentStatus[event.id] = detail.status;
        }
      }, (err) => {
        console.log("Not Enrolled Yet : ", err);
      });
    });
  }

  filterEvents(): void {
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      || event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      || event.location.toLowerCase().includes(this.searchTerm.toLowerCase())

    );
  }

  sortEvents(): void {
    if (!this.sortBy) {
      this.filteredEvents = [...this.events]; // No sorting, original order
    } else {
      this.filteredEvents.sort((a, b) => {
        if (a[this.sortBy] < b[this.sortBy]) {
          return -1;
        } else if (a[this.sortBy] > b[this.sortBy]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  updateDetail(eventId: number): void {
    this.router.navigateByUrl(`/update-event/${eventId}`);
  }

  enrollInEvent(eventId: number): void {
    if (!eventId) {
      console.error('Invalid event ID');
      return;
    }

    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    this.httpService.EnrollParticipant(eventId, userId)
      .subscribe(response => {
        console.log(`Successfully enrolled in event ID ${eventId}`, response);
        this.enrollmentStatus[eventId] = 'ENROLLED'; // Update status after successful enrollment
        this.loadEnrollmentStatus(); // Refresh enrollment status
      },
        ((error) => {
          console.error(`Error enrolling in event ID ${eventId}`, error);
        }));
  }

  GetEnrollmentDetail(eventId: any, userId: any): void {
    this.httpService.GetEnrollmentDetail(eventId, userId)
      .subscribe((detail: any) => {
        console.log(`Enrollment details for event ID ${eventId}`, detail);
        this.enrollmentStatus[eventId] = detail.status;
      },
        ((error) => {
          console.error(`Error fetching enrollment details for event ID ${eventId}`, error);
        }));
  }

  updateEventStatusBtn(eventId: any): void {
    this.router.navigateByUrl(`/update-event-status/${eventId}`);
  }

  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'short');
  }
}
