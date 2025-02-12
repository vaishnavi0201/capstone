import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-event-status',
  templateUrl: './update-event-status.component.html',
  styleUrls: ['./update-event-status.component.scss'],
  providers: [DatePipe]
})
export class UpdateEventStatusComponent {
}

// --------------------------------------
// --------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { DatePipe } from '@angular/common';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-update-event-status',
//   templateUrl: './update-event-status.component.html',
//   styleUrls: ['./update-event-status.component.scss'],
//   providers: [DatePipe]
// })
// export class UpdateEventStatusComponent implements OnInit {
//   statusForm: FormGroup;
//   showError: boolean = false;
//   errorMessage: string = '';
//   showMessage: boolean = false;
//   responseMessage: string = '';
//   eventDetails: any;
//   statusOptions: string[] = ['Available', 'Unavailable', 'Pending'];

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private httpService: HttpService,
//     private datePipe: DatePipe,
//     private route: ActivatedRoute
//   ) {
//     this.statusForm = this.fb.group({
//       eventId: [null, Validators.required],
//       status: [null, Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     // Extract eventId from route parameters
//     this.route.params.subscribe(params => {
//       const eventId = params['eventId'];
//       if (eventId) {
//         this.statusForm.patchValue({ eventId });
//         this.getEventDetails(eventId);
//       }
//     });
//   }

//   getEventDetails(eventId: number): void {
//     this.httpService.getEventById(eventId).subscribe(
//       (response: any) => {
//         this.eventDetails = response;
//       },
//       (error: any) => {
//         this.showError = true;
//         this.errorMessage = 'Failed to load event details. Please try again later.';
//       }
//     );
//   }

//   onSubmit(): void {
//     if (this.statusForm.invalid) {
//       this.showError = true;
//       this.errorMessage = 'Please fill out all required fields.';
//       return;
//     }

//     const formData = this.statusForm.value;
//     this.updateEventStatus(formData.eventId, formData.status).subscribe(
//       (response: any) => {
//         this.showMessage = true;
//         this.responseMessage = 'Event status updated successfully.';
//         this.statusForm.reset();
//       },
//       (error: any) => {
//         this.showError = true;
//         this.errorMessage = 'Failed to update event status. Please try again later.';
//       }
//     );
//   }

//   updateEventStatus(eventId: any, status: any): Observable<any> {
//     return this.httpService.UpdateEventStatus(eventId, status);
//   }
// }
