import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


import { AppComponent } from './app.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';

import { CreateEventComponent } from './create-event/create-event.component';
import { AddResourceComponent } from './add-resource/add-resource.component';

import { ViewEventsComponent } from './view-events/view-events.component';

import { AssignProfessionalComponent } from './assign-professional/assign-professional.component';
import { UpdateEventStatusComponent } from './update-event-status/update-event-status.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { ViewFeedbackComponent } from './components/view-feedback/view-feedback.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'create-event', component: CreateEventComponent },  
  { path: 'update-event/:eventId', component: UpdateEventComponent },  
  { path: 'add-resource', component: AddResourceComponent }, 
  { path: 'assign-professional', component: AssignProfessionalComponent },  
  { path: 'update-event-status/:eventId', component: UpdateEventStatusComponent }, 
  { path: 'add-feedback/:eventId', component: AddFeedbackComponent }, 
  { path: 'view-feedback', component: ViewFeedbackComponent }, 
  { path: 'view-events', component: ViewEventsComponent },  
  
  
 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
