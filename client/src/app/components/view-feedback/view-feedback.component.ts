import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.scss']
})
export class ViewFeedbackComponent implements OnInit {
  feedbackList: any[] = [];
  filteredFeedbackList: any[] = [];
  feedbackForm: FormGroup;
  eventId: any;
  userId: any;
  userRole: any;
  eventList: any[] = [];
  errorMessage: string | null = null;
  responseMessage: string | null = null;
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.feedbackForm = this.fb.group({
      eventId: [null, Validators.required],
      feedback: ['', Validators.required]
    });
    this.userId = localStorage.getItem('userId');
    this.userRole = localStorage.getItem('role'); 
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get("eventId");
    this.getEventList();
    if (this.userRole == 'PARTICIPANT') {
      this.getFeedbackByParticipant();
    } else {
      this.getFeedback();
    }
  }

  getFeedback(): void {
    this.httpService.GetFeedbackByProfessional(this.userId).subscribe(
      response => {
        this.feedbackList = response;
        this.filteredFeedbackList = response;
      },
      error => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  getFeedbackByParticipant(): void {
    this.httpService.GetFeedbackByParticipant(this.userId).subscribe(
      response => {
        this.feedbackList = response;
        this.filteredFeedbackList = response;
      },
      error => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  getEventList(): void {    
    if (this.userRole == 'PROFESSIONAL') {
      this.httpService.getEventByProfessional(this.userId).subscribe(
        response => {
        this.eventList = response;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  } else {    
    this.httpService.viewAllEvents().subscribe( 
      (response) => {              
        this.eventList = response.map((event:any)=>({title:event.title, id:event.id}));
      })
    }
  }

  filterFeedback(): void {
    this.filteredFeedbackList = this.feedbackList.filter(feedback =>
      feedback.eventTitle.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
 

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const feedbackDetails = { content: this.feedbackForm.value.feedback, timestamp };

      if (this.userRole === 'PROFESSIONAL') {
        this.httpService.AddFeedback(this.feedbackForm.value.eventId, this.userId, feedbackDetails).subscribe(
          response => {
            this.getEventList();
            this.getFeedback();
            this.feedbackForm.reset();
            this.router.navigate(['/view-feedback']);
          },
          error => {
            console.error('Error submitting feedback:', error);
            this.errorMessage = 'Failed to submit feedback. Please try again later.';
          }
        );
      } else if (this.userRole === 'PARTICIPANT') {
        let id = this.eventList.filter((eId)=>eId.title === this.feedbackForm.value.eventId)
        this.httpService.AddFeedbackByParticipants(this.feedbackForm.value.eventId, this.userId, feedbackDetails).subscribe(
          response => {
            this.getFeedbackByParticipant();
            this.getEventList();
            this.feedbackForm.reset();
            this.router.navigate(['/view-feedback']);
          },
          error => {
            console.error('Error submitting feedback:', error);
            this.errorMessage = 'Failed to submit feedback. Please try again later.';
          }
        );
      }
    }
  }
}
