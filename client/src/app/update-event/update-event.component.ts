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
 
      this.httpService.getEventByInstitutionId(localStorage.getItem('userId')).subscribe(events => {
        console.log("111111");
        console.log(events);
        const event = events.find((e: any) => { 
          console.log(e);
          return e.id == this.eventId
        } );
        console.log(event);
        if (event) {
          console.log(event);
          this.eventForm.patchValue(event);
        }
      }, (err) => console.log(err) );

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
  