import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<string | null>(null);

  private mockUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' },
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      this.loggedIn.next(true);
      this.user.next(username);
      return true;
    } else {
      this.loggedIn.next(false);
      this.user.next(null);
      return false;
    }
  }

  logout(): void {
    this.loggedIn.next(false);
    this.user.next(null);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUser() {
    return this.user.asObservable();
  }
}
