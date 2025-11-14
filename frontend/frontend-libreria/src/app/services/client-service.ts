import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, Observable, of, Subject, tap, throwError } from 'rxjs';

export interface Cliente {
  cc: number;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: number;
}

export interface ClienteEvent {
  cliente?: Cliente;
  deletedCc?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private baseUrl = 'https://proyecto-libreria-distribuida-paralela.onrender.com/api/clientes';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private useMock = false;

  private clienteSubject = new Subject<ClienteEvent>();
  cliente$ = this.clienteSubject.asObservable();

  private clientesMock: Cliente[] = [];

  constructor() {}

  getAll(): Observable<Cliente[]> {
    if (this.useMock) {
      return of(this.clientesMock).pipe(
        delay(300),
        tap(data => console.log('📦 Fetched clientes (mock):', data))
      );
    } else {
      return this.http.get<Cliente[]>(this.baseUrl).pipe(
        tap(data => console.log('📦 Fetched clientes (API):', data)),
        catchError(this.handleError)
      );
    }
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    if (this.useMock) {
      this.clientesMock.push(cliente);
      this.clienteSubject.next({ cliente });
      return of(cliente);
    } else {
      return this.http.post<Cliente>(this.baseUrl, cliente, { headers: this.headers }).pipe(
        tap(newCliente => this.clienteSubject.next({ cliente: newCliente })),
        catchError(this.handleError)
      );
    }
  }

  update(cliente: Cliente): Observable<Cliente> {
    if (this.useMock) {
      const index = this.clientesMock.findIndex(c => c.cc === cliente.cc);
      if (index !== -1) this.clientesMock[index] = cliente;
      this.clienteSubject.next({ cliente });
      return of(cliente);
    } else {
      return this.http.put<Cliente>(`${this.baseUrl}/${cliente.cc}`, cliente, { headers: this.headers }).pipe(
        tap(updated => this.clienteSubject.next({ cliente: updated })),
        catchError(this.handleError)
      );
    }
  }

  delete(cc: number): Observable<void> {
    if (this.useMock) {
      this.clientesMock = this.clientesMock.filter(c => c.cc !== cc);
      this.clienteSubject.next({ deletedCc: cc });
      return of(void 0);
    } else {
      return this.http.delete<void>(`${this.baseUrl}/${cc}`).pipe(
        tap(() => this.clienteSubject.next({ deletedCc: cc })),
        catchError(this.handleError)
      );
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Server error (${error.status}): ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
