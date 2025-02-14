import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.itemForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    console.log(this.itemForm);
    console.log(this.itemForm.invalid);
    console.log(this.itemForm.value);

    if (this.itemForm.invalid) {
      return;
    }

    this.httpService.loginUser(this.itemForm.value).subscribe(
      (response: any) => {
        if (response.token) {
          console.log("Logged In - Success.");
          

          // this.authService.saveToken(response.token);
          console.log(response);
          this.authService.saveToken(response.token, response.role, response.userId);

          this.router.navigate(['/']);
          setTimeout(() => {
            window.location.reload();
          }, 100);
          
        }
      },
      (error: any) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
