import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private readonly key = 'loginId';

    setLoginId(loginId: string): void {
        localStorage.setItem(this.key, loginId);
    }

    getLoginId(): string | null {
        return localStorage.getItem(this.key);
    }

    clearLoginId(): void {
        localStorage.removeItem(this.key);
    }
}
