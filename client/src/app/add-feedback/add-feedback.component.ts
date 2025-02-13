// import { DatePipe } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { HttpService } from '../../services/http.service';

// @Component({
//   selector: 'app-add-feedback',
//   templateUrl: './add-feedback.component.html',
//   styleUrls: ['./add-feedback.component.scss'],
//   providers: [DatePipe]
// })

// export class AddFeedbackComponent { //doto: complete missing code..
  
// }

// ================================================
// ================================================

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss'],
  providers: [DatePipe]
})
export class AddFeedbackComponent implements OnInit {

  feedbackForm: FormGroup;
  eventId: any;
  userId: any;
  userRole: string; // either 'professional' or 'participant'
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required]
    });
    // this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.userId = localStorage.getItem('userId');
    this.userRole = localStorage.getItem('role') || 'participant'; // assuming a role is stored in localStorage
    console.log(this.userId, this.userRole);
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get("eventId");
    console.log(this.eventId);
  }

  onSubmit(): void {
    console.log(this.feedbackForm.valid);
    console.log(this.feedbackForm.value);
    console.log(this.feedbackForm.value.feedback);
    if (this.feedbackForm.valid) {
      const feedbackDetails = { feedback: this.feedbackForm.value.feedback };

      if (this.userRole === 'PROFESSIONAL') {
        this.httpService.AddFeedback(this.eventId, this.userId, feedbackDetails).subscribe(
          response => {
            console.log('Feedback submitted successfully:', response);
            this.router.navigate(['/view-events']);
          },
          error => {
            console.error('Error submitting feedback:', error);
            this.errorMessage = 'Failed to submit feedback. Please try again later.';
          }
        );
      } else if (this.userRole === 'PARTICIPANTS') {
        this.httpService.AddFeedbackByParticipants(this.eventId, this.userId, feedbackDetails).subscribe(
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

