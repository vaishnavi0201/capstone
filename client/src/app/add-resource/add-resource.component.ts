// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-add-resource',
//   templateUrl: './add-resource.component.html',
//   styleUrls: ['./add-resource.component.scss']
// })
// export class AddResourceComponent implements OnInit {
//   itemForm!: FormGroup;
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private httpService: HttpService,
//     private authService: AuthService
//   ) {
//     this.itemForm = this.fb.group({
//       eventId: [null, Validators.required],
//       type: [undefined, Validators.required],
//       description: [undefined, Validators.required],
//       availabilityStatus: [null, Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     // Initialization logic, if any
//   }

//   onSubmit(): void {
//     if (this.itemForm.invalid) {
//       return;
//     }

//     const formData = this.itemForm.value;
//     this.httpService.addResource(formData).subscribe(
//       (response: any) => {
//         this.router.navigate(['/some-success-route']); // Replace with actual success route
//       },
//       (error: any) => {
//         this.errorMessage = 'Adding resource failed. Please try again.';
//       }
//     );
//   }
// }

// -------------------

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  eventList: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    // Initializing dependencies and creating the form with validation rules
    this.formModel = {
      status: null
    };
    this.itemForm = this.fb.group({
      eventId: [null, Validators.required],
      type: [undefined, Validators.required],
      description: [undefined, Validators.required],
      availabilityStatus: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetching the list of events from the API
    this.getEvent();

    // Resetting availabilityStatus in formModel
    this.formModel.availabilityStatus = null;
  }

  getEvent(): void {
    // const userId = this.authService.getUserId();
    const userId = localStorage.getItem('userId');
    console.log(userId);

    // Validate userId before making an API request
    if (!userId) {
      this.errorMessage = 'User not logged in.';
      return;
    }

    this.httpService.getEventByInstitutionId(userId).subscribe(
      (events: any) => {
        console.log("hello");   
        this.eventList = events;
        console.log(events);
      },
      (error: any) => {
        // Improving error handling by displaying appropriate messages based on error codes
        if (error.status === 404) {
          this.errorMessage = 'Events not found.';
        } else if (error.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      }
    );
  }

  onSubmit(): void {
    // Submitting the resource details if the form is valid
    if (this.itemForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      this.showError = true;
      return;
    }

    const formData = this.itemForm.value;
    this.httpService.addResource(formData).subscribe(
      (response: any) => {
        this.router.navigate(['/some-success-route']); // Replace with the actual success route
        this.responseMessage = 'Resource added successfully!';
      },
      (error: any) => {
        // Adding user-friendly messages when the form submission fails due to validation errors
        if (error.status === 400) {
          this.errorMessage = 'Validation error. Please check your input.';
        } else if (error.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'Adding resource failed. Please try again.';
        }
        this.showError = true;
      }
    );
  }
}
