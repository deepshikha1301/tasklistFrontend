import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private accessToken = '';

    constructor(private http: HttpClient, private router: Router) {}

    login(loginId: string, password: string): Observable<any> {
        const url = '/api/users/login';
        const body = {
            loginId: loginId,
            password: password
        };
        return this.http.post(url, body);
    }

    logout():void{
        localStorage.removeItem('loginId');
        this.accessToken = '';
        this.router.navigate(['/login']);
    }

    setToken(token: string): void {
        this.accessToken = token;
    }

    setLoginId(loginId: string): void {
        localStorage.setItem('loginId', loginId);
    }

    getToken(): string {
        return this.accessToken;
    }

    refreshAccessToken(): Observable<any> {
        console.log('Refreshing access token...');
        const url = '/api/users/refreshToken';
        return this.http.post(url, {});
    }
}
