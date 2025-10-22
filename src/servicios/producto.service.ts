import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://localhost:7191/api/Producto';

  constructor(private http: HttpClient) { }

  // Método para hacer una solicitud GET
    ObtenerProductos(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}`);
    }
}
