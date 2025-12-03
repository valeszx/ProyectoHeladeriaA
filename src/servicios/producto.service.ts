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

    AgregarProducto(producto: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, producto);
    }

    ActualizarProducto(producto: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}`, producto);
    }

    ActualizarCantidad(id: number,cantidad:number): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}/${cantidad}`,{});
    }

    EliminarProducto(id: any): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
