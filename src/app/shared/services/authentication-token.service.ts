import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare var signOutGoogle: any;

@Injectable()
export class AuthenticationTokenService {
    private TOKEN_KEY : string = 'sessionToken';

    constructor (
        private readonly router: Router
    ) {}

    public getToken(): string {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    public isLoggedIn(): boolean {
        var token = localStorage.getItem(this.TOKEN_KEY);
        if (!token) {
            return false;
        }

        var jwt = this.parseJwt(token);
        var current_time = new Date().getTime() / 1000;
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
        var sessionToken = localStorage.getItem(this.TOKEN_KEY);
        const user = this.parseJwt(sessionToken);
        return user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }

    private parseJwt(token): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
}