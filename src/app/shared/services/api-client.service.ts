import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationTokenService } from './authentication-token.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiClientService {
    private api = environment.apiUrl;

    public constructor(
        private http: HttpClient,
        private authenticationTokenService: AuthenticationTokenService
    ) { }

    public post(path: string, data: any) {
        const headers = this.getCommonHeaders();
        return this.http.post(`${this.api}/${path}`, data, { headers })
            .pipe(catchError(this.handleError.bind(this)));
    }

    public get(path: string) {
        const headers = this.getCommonHeaders();
        return this.http.get(`${this.api}/${path}`, { headers })
            .pipe(catchError(this.handleError.bind(this)));
    }

    private handleError(error: any) {
        if (error.status === 401 || error.status === 403) {
            this.authenticationTokenService.logout();
        }
        throw error;
    }

    private getCommonHeaders(): HttpHeaders {
        let headers = new HttpHeaders({
            'content-type': 'application/json',
            'accept': 'application/json'
        });

        const token = this.authenticationTokenService.getToken();
        if (!!token) {
            headers = headers.append('Authorization', `Bearer ${token}`)
        }
        return headers;
    }
}