import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  public constructor(
    private _router: Router
  ) {}

  public static getToken(): string {
    return localStorage.getItem('crossoverBootcampUserToken');
  }

  public setToken(token: string, userData: any): void {
    localStorage.setItem('crossoverBootcampUserToken', token);
    localStorage.setItem('crossoverBootcampUserData', JSON.stringify(userData));
  }

  public isLoggedIn(): boolean {
    return AuthenticationService.getToken() !== null;
  }

  public logout(): void {
    localStorage.removeItem('crossoverBootcampUserToken');
    localStorage.removeItem('crossoverBootcampUserData');
    this._router.navigate(['/login']);
  }

  public login(credentials: {username: string, password: string}) {
    const user: {username: string, password: string} = {
      username: credentials.username,
      password: credentials.password
    };

    this.setToken(
      btoa(`${credentials.username}:${credentials.password}`),
      user
    );

    this._router.navigate(['/']);
  }
}
