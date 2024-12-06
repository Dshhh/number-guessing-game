import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  session = false;

  constructor() { }

  isSession() {
    return this.session;
  }

  login() {
    this.session = true;
  }

  logout() {
    this.session = false;
  }
}
