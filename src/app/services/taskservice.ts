import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Taskservice {

    constructor(private http: HttpClient) {}

    fetchTasks(loginId: string):Observable<any> {
        const url = `http://localhost:8080/api/tasks/${loginId}`;
        return this.http.get(url);
   }

   addItem(loginId: string, taskName: string): Observable<any> {
        const url = 'http://localhost:8080/api/tasks';
        const body = { loginId, taskName };
        return this.http.post(url, body);
    }

    removeItem(loginId: string, taskName: string): Observable<any> {
        const url = 'http://localhost:8080/api/tasks/delete';
        const body = { loginId, taskName };
        return this.http.delete(url, { body });
    }
}
