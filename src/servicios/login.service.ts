import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   private apiUrl = 'https://localhost:7191/api/Login';

  constructor(private http: HttpClient) { }

  // Método para hacer una solicitud GET
  ValidarUsuario(usuario:string, password:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${usuario}/${password}/validar`);
  }
}
