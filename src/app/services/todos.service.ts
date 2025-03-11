import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = environment.apiUrl;
  path = "/todos"

  constructor(private httpClient: HttpClient) { }

  public createTodo(todoData: { task: string }): Observable<any> {
    return this.httpClient.post(this.url + this.path, todoData, { withCredentials: true });
  }
}
