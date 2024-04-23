import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../todo';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = 'https://jsonplaceholder.typicode.com'; // Corrected base URL

  constructor(private http: HttpClient) {}

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
  }

  addTodo(postData: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}/todos`, postData);
  }

  updateTodo(postData: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.baseUrl}/todos/${postData.id}`, postData);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/todos/${id}`);
  }
}
