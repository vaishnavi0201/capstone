import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swiper from 'swiper';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  
  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
  

  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("working");
  }

  handleFormSubmit() {
    if (this.formData.valid) {
      console.log('Form submitted:', this.formData.value);
      this.formData.reset()
    }
  }

}
