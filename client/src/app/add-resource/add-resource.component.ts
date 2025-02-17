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
  resourceList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) {
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
    // fetching the list of events from the API
    this.getEvent();
    // fetching the list of resources from the API
    this.getResources();

    // resetting
    this.formModel.availabilityStatus = null;
  }

  getEvent(): void {
    const userId = localStorage.getItem('userId');
    console.log(userId);

    // validate userId
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

  getResources(): void {
    this.httpService.GetAllResources().subscribe(
      (resources: any) => {
        this.resourceList = resources;
        console.log('Resources fetched successfully:', this.resourceList);
      },
      (error: any) => {
        console.error('Error fetching resources:', error);
        this.errorMessage = 'Failed to fetch resources. Please try again later.';
      }
    );
  }

  onSubmit(): void {    
    if (this.itemForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      this.showError = true;
      return;
    }

    const formData = this.itemForm.value;
    this.httpService.addResource(formData).subscribe(
      (response: any) => {
        this.getResources();
        this.router.navigate(['/add-resource']); 
        this.responseMessage = 'Resource added successfully!';

        // reset after frm submission
        setTimeout(() => {
          this.responseMessage = '';
        }, 2000);
        setTimeout(() => {
          this.itemForm.reset();
        }, 0); 
      },
      (error: any) => {
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