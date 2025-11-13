import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/libros'; // Ajusta el puerto si tu backend usa otro

  // Observable para notificar cambios en la lista de libros
  private libroSubject = new BehaviorSubject<boolean>(false);
  libro$ = this.libroSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 📚 Obtener todos los libros
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // 🔍 Obtener un libro por ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ➕ Crear un nuevo libro
  create(libro: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, libro);
  }

  // ✏️ Actualizar un libro existente
  update(id: number, libro: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, libro);
  }

  // 🗑️ Eliminar un libro
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 📖 Registrar un préstamo
  prestarLibro(libroId: number, clienteCc: number): Observable<any> {
    const requestBody = { libroId, clienteCc };
    return this.http.post<any>(`${this.apiUrl}/prestar`, requestBody);
  }

  // 🔁 Registrar devolución
  devolverLibro(libroId: number, clienteCc: number): Observable<any> {
    const requestBody = { libroId, clienteCc };
    return this.http.post<any>(`${this.apiUrl}/devolver`, requestBody);
  }

  // 🔄 Notificar cambios (por ejemplo, al agregar o modificar un libro)
  notifyChange() {
    this.libroSubject.next(true);
  }
}
