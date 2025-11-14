import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'https://proyecto-libreria-distribuida-paralela.onrender.com/api/informes';

  constructor(private http: HttpClient) { }

  obtenerInforme(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
