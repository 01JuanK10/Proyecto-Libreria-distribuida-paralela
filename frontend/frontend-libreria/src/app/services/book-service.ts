import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://proyecto-libreria-distribuida-paralela.onrender.com/api/libros'; 

  private libroSubject = new BehaviorSubject<boolean>(false);
  libro$ = this.libroSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  create(libro: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, libro);
  }

  update(id: number, libro: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, libro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  prestarLibro(libroId: number, clienteCc: number): Observable<any> {
    const requestBody = { libroId, clienteCc };
    return this.http.post<any>(`${this.apiUrl}/prestar`, requestBody);
  }

  devolverLibro(libroId: number, clienteCc: number): Observable<any> {
    const requestBody = { libroId, clienteCc };
    return this.http.post<any>(`${this.apiUrl}/devolver`, requestBody);
  }

  notifyChange() {
    this.libroSubject.next(true);
  }
}
