import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private apiUrl = 'https://localhost:7191/api/Permiso';

  constructor(private http: HttpClient) { }

  // Método para hacer una solicitud GET
  ObtenerPermisos(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
