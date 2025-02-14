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
  feedbackForm: FormGroup;
  eventId: any;
  userId: any;
  userRole: any;
  eventList: any[] = [];
  errorMessage: string | null = null;
  responseMessage: string | null = null;

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
    this.userRole = localStorage.getItem('role'); // assuming a role is stored in localStorage
    console.log(this.userId, this.userRole);
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get("eventId");
    console.log(this.eventId);
    this.getEventList();
    if (this.userRole === 'PARTICIPANT') {
      this.getFeedbackByParticipant();
    } else {
      this.getFeedback();
    }
  }

  getFeedback(): void {
    this.httpService.GetFeedbackByProfessional(this.userId).subscribe(
      response => {
        console.log(response);
        this.feedbackList = response;
        console.log('Feedback fetched successfully:', this.feedbackList);
      },
      error => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  getFeedbackByParticipant(): void {
    this.httpService.GetFeedbackByParticipant(this.userId).subscribe(
      response => {
        console.log(response);
        this.feedbackList = response;
        console.log('Feedback fetched successfully:', this.feedbackList);
      },
      error => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  getEventList(): void {
    this.httpService.getEventByProfessional(this.userId).subscribe(
      response => {
        console.log(response);
        this.eventList = response;
        console.log('Events fetched successfully:', this.eventList);
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const feedbackDetails = { content: this.feedbackForm.value.feedback, timestamp };
      console.log(feedbackDetails);
      console.log(this.userRole);
      if (this.userRole === 'PROFESSIONAL') {
        this.httpService.AddFeedback(this.feedbackForm.value.eventId, this.userId, feedbackDetails).subscribe(
          response => {
            console.log('Feedback submitted successfully:', response);
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
        this.httpService.AddFeedbackByParticipants(this.feedbackForm.value.eventId, this.userId, feedbackDetails).subscribe(
          response => {
            console.log('Feedback submitted successfully:', response);
            this.router.navigate(['/view-events']);
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
