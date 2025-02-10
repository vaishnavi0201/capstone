import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-assign-professional',
  templateUrl: './assign-professional.component.html',
  styleUrls: ['./assign-professional.component.scss']
})
export class AssignProfessionalComponent implements OnInit {
  itemForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.itemForm = this.fb.group({
      eventId: [null, Validators.required],
      userId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic, if any
  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      return;
    }

    const formData = this.itemForm.value;
    this.httpService.assignProfessionals(formData.eventId, formData.userId).subscribe(
      (response: any) => {
        this.router.navigate(['/some-success-route']); // Replace with actual success route
      },
      (error: any) => {
        this.errorMessage = 'Assigning professional failed. Please try again.';
      }
    );
  }
}
