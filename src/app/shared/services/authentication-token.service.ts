import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/constants/roles.constants';
declare var signOutGoogle: any;

@Injectable()
export class AuthenticationTokenService {
    private TOKEN_KEY = 'sessionToken';

    constructor (
        private readonly router: Router
    ) {}

    public getToken(): string {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (!token) {
            return false;
        }

        const jwt = this.parseJwt(token);
        const current_time = new Date().getTime() / 1000;
        return current_time < jwt.exp - 10;
    }

    public logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        signOutGoogle();
        this.router.navigate(['login']);
    }

    public saveToken(sessionToken: string): void {
        localStorage.setItem(this.TOKEN_KEY, sessionToken);
    }

    public getUserRole(): string {
        if (!this.isLoggedIn()) {
            return null;
        }
        const sessionToken = localStorage.getItem(this.TOKEN_KEY);
        const user = this.parseJwt(sessionToken);
        return user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }

    public getStudentStartDate(): Date {
        if (!this.isLoggedIn()) {
            return null;
        }
        const sessionToken = localStorage.getItem(this.TOKEN_KEY);
        const user = this.parseJwt(sessionToken);
        const startDateUnixTime = user['application/claims/StartDate'];
        if (startDateUnixTime) {
            return new Date(parseFloat(startDateUnixTime));
        }
        return null;
    }

    public hasICStarted(): boolean {
        const startDate = this.getStudentStartDate();
        return startDate && this.convertLocalDateToUtcDate(new Date()) >= startDate;
    }

    public isUserAdmin(): boolean {
        const role = this.getUserRole();
        return role && role.toLowerCase() === Roles.admin;
    }

    private parseJwt(token): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    private convertLocalDateToUtcDate(date): Date {
        const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        const offset = date.getTimezoneOffset() / 60;
        const hours = date.getHours();
        newDate.setHours(hours + offset);
        return newDate;
    }
}
