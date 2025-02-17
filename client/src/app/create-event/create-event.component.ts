import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  itemForm!: FormGroup;
  errorMessage: string | null = null;
  id: any = localStorage.getItem('userId');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      schedule: ['', [Validators.required,this.dateValidator()]],
      location: ['', Validators.required],
      status: ["Pending", Validators.required]
    });
  }

 dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);

    return selectedDate < today ? { 'minDate': { value: control.value } } : null;
  };
}
  
  onSubmit(): void {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;

      this.httpService.createEvent({...formData, institutionId:this.id }).subscribe(
        response => {
          console.log('Event created successfully:', response);
          this.router.navigate(['/view-events']);
        },
        error => {
          console.error('Error creating event:', error);
          this.errorMessage = 'Failed to create event. Please try again later.';
        }
      );
    }
  }
}
