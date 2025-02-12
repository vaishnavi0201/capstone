// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-update-event',
//   templateUrl: './update-event.component.html',
//   styleUrls: ['./update-event.component.scss']
// })
// export class UpdateEventComponent implements OnInit {
  
  //   constructor() { }
  
  //   ngOnInit(): void {
//   }

// }


// =====================================================
// =====================================================

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  
    eventForm: FormGroup;
    eventId: any;
  
    constructor(
      private fb: FormBuilder,
      private httpService: HttpService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.eventForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        schedule: ['', Validators.required],
        location: ['', Validators.required],
        status: [null, Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.eventId = this.route.snapshot.paramMap.get('eventId')!;
 
      // 🔴 fetch single event - we don't have api
      // this.httpService.getEvent(this.eventId).subscribe(event => {
      //   this.eventForm.patchValue(event);
      // });

      // 🟢for the time being - jugaar
      this.httpService.getEventByProfessional(localStorage.getItem('userId')).subscribe(events => {
        const event = events.find((e: any) => e.id === this.eventId);
        if (event) {
          this.eventForm.patchValue(event);
        }
      });

    }
  
    updateEvent(): void {
      if (this.eventForm.valid) {
        const updatedEvent = { ...this.eventForm.value, id: this.eventId };
        
        this.httpService.updateEvent(this.eventId ,updatedEvent).subscribe(() => {
          console.log('Event updated successfully');
          this.router.navigate(['/view-events']);
        }, error => {
          console.error('Error updating event:', error);
        });
      }
    }
  }
  