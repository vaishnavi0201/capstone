import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private serverName = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log(this.serverName);
  }

  // Set the headers with JWT token
  private setHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  // User Registration
  registerUser(details: { username: string; password: string; email: string; role: string; }): Observable<any> {
    return this.http.post(`${this.serverName}/api/user/register`, details);
  }

  // User Login
  loginUser(details: { username: string; password: string; }): Observable<any> {
    return this.http.post(`${this.serverName}/api/user/login`, details);
  }

  // Get Events by Institution ID
  getEventByInstitutionId(institutionId: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/institution/events?institutionId=${institutionId}`, { headers });
  }

  // Get Events by Professional ID
  getEventByProfessional(userId: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/professional/events?userId=${userId}`, { headers });
  }

  // Get All Professionals
  GetAllProfessionals(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/institution/event/professionals`, { headers });
  }

  // View All Events
  viewAllEvents(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/participant/events`, { headers });
  }

  // View Event Status
  viewEventStatus(eventId: number): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/participant/event/${eventId}/status`, { headers });
  }

  // Enroll Participant
  EnrollParticipant(eventId: number, userId: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.post(`${this.serverName}/api/participant/event/${eventId}/enroll?userId=${userId}`, {}, { headers });
  }

  // Create Event
  createEvent(details: { name: string; }): Observable<any> {
    const headers = this.setHeaders();
    return this.http.post(`${this.serverName}/api/institution/event`, details, { headers });
  }

  // Update Event
  updateEvent(eventId: number, details: { name: string; }): Observable<any> {
    const headers = this.setHeaders();
    return this.http.put(`${this.serverName}/api/institution/event/${eventId}`, details, { headers });
  }

  // Add Resource to Event
  addResource(details: { eventId: number; name: string; }): Observable<any> {
    const headers = this.setHeaders();
    return this.http.post(`${this.serverName}/api/institution/event/${details.eventId}/resource`, details, { headers });
  }

  // Assign Professionals to Event
  assignProfessionals(eventId: number, userId: number): Observable<any> {
    const headers = this.setHeaders();
    return this.http.post(`${this.serverName}/api/institution/event/${eventId}/professional?userId=${userId}`, {}, { headers });
  }

  // Update Event Status
  UpdateEventStatus(eventId: number, status: string): Observable<any> {
    const headers = this.setHeaders();
    return this.http.put(`${this.serverName}/api/professional/event/${eventId}/status?status=${status}`, {}, { headers });
  }

  // Add Feedback by Professionals
  AddFeedback(eventId: number, userId: number, details:any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.post(`${this.serverName}/api/professional/event/${eventId}/feedback?userId=${userId}`, details, { headers });
  }

  // Add Feedback by Participants
  AddFeedbackByParticipants(eventId: number, userId: number, details: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.post(`${this.serverName}/api/participant/event/${eventId}/feedback?userId=${userId}`, details, { headers });
  }

  // ------ CUSTOM API CREATED ------

  // FEEDBACK
  // 🔴 this may not work
  GetFeedbackByParticipant(userId: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/participant/event/${userId}/feedback`, { headers });
  }  

  GetFeedbackByProfessional(userId: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/professional/event/${userId}/feedback`, { headers });
  }

  GetAllResources(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/institution/event/resources`, { headers });
  }
  
  GetEventByInstitution(eventId: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/institution/event/${eventId}`, { headers });    
  }

  GetEventByProfessional(eventId: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/professional/event/${eventId}`, { headers });    
  }

  GetEventByParticipant(eventId: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/participant/event/${eventId}`, { headers });    
  }

  // {{URL_CAP}}/api/participant/event/{eventId}/enroll?userId=3
 
  GetEnrollmentDetail(eventId: any, userId: any) {
    const headers = this.setHeaders();
    return this.http.get(`${this.serverName}/api/participant/event/${eventId}/enroll?userId=${userId}`, {
      headers: headers,
      // params: { userId: userId }
    });
  }



}
