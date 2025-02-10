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
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.itemForm = this.fb.group({
      eventId: [null, Validators.required],
      type: [undefined, Validators.required],
      description: [undefined, Validators.required],
      availabilityStatus: [null, Validators.required]
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
    this.httpService.addResource(formData).subscribe(
      (response: any) => {
        this.router.navigate(['/some-success-route']); // Replace with actual success route
      },
      (error: any) => {
        this.errorMessage = 'Adding resource failed. Please try again.';
      }
    );
  }
}
