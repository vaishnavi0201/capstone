import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.scss']
})
export class ViewFeedbackComponent implements OnInit {
  feedbackList: any[] = [];
  userId: any;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.getFeedback();
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
}
