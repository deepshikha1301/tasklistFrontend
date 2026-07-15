import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {}

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
        localStorage.removeItem('access_token');
    }

    setToken(token: string): void {
        localStorage.setItem('access_token', token);
    }

    setLoginId(loginId: string): void {
        localStorage.setItem('loginId', loginId);
    }
}
