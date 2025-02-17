import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-assign-professional',
  templateUrl: './assign-professional.component.html',
  styleUrls: ['./assign-professional.component.scss']
})
export class AssignProfessionalComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any = '';
  eventList: any[] = [];
  assignModel: any = {};
  showMessage: any = '';
  responseMessage: any = '';
  userId: any = localStorage.getItem('userId');
  professionalsList: any[] = [];
  professionalEvents: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {
    // Initialize form with validation rules
    this.itemForm = this.fb.group({
      eventId: [null, Validators.required],
      userId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getEvent();
    this.getProfessionals();
  }

  getEvent(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.showError = true;
      this.errorMessage = 'User ID is missing. Please log in again.';
      return;
    }

    this.httpService.getEventByInstitutionId(userId).subscribe(
      (response: any) => {
        this.eventList = response;
        console.log("Event List: ", response);
        this.mapProfessionalEvents();
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = 'Failed to load events. Please try again later.';
      }
    );
  }

  getProfessionals(): void {
    this.httpService.GetAllProfessionals().subscribe(
      (response: any) => {
        console.log("Hello");
        console.log(response);
        this.professionalsList = response;
        this.mapProfessionalEvents();
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = 'Failed to load professionals. Please try again later.';
      }
    );
  }

  mapProfessionalEvents(): void {
    this.professionalEvents = this.professionalsList.map(professional => {
      return {
        ...professional,
        events: this.eventList.filter(event => event.professionalId === professional.id)
      };
    });

  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      this.showError = true;
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    const formData = this.itemForm.value;
    console.log(formData);

    this.httpService.assignProfessionals(formData.eventId, formData.userId).subscribe(
      (response: any) => {
        this.showMessage = true;
        this.responseMessage = "Professional Assigned!";
        this.itemForm.reset();

        setTimeout(()=>{
          this.router.navigateByUrl('/dashboard');
        }, 2000)

      },
      (error: any) => {
        console.log(error);
        this.showError = true;
        this.errorMessage = 'Assignment failed. Please try again.';
      }
    );

  }
}
