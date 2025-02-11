import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setToken(token: any) {
    throw new Error('Method not implemented.');
  }

  private token: string | null = null;
  private isLoggedIn: boolean = false;

  constructor() {}

  // Method to save token received from login along with role and userId
  saveToken(token: string, role: string, userId: string) {
    this.token = token;
    this.isLoggedIn = true;
    // Optionally, you can save the token, role, and userId to local storage or a cookie for persistence
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
  }

  setRole(role: any) {
    localStorage.setItem('role', role);
  }

  get getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Method to retrieve login status
  get getLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    this.token = localStorage.getItem('token');
    return this.token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.token = null;
    this.isLoggedIn = false;
  }

  saveUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }
}
