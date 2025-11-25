import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'https://localhost:7191/api/Categoria';
 
   constructor(private http: HttpClient) { }
 
   // Método para hacer una solicitud GET
     ObtenerCategoria(): Observable<any> {
       return this.http.get<any>(`${this.apiUrl}`);
     }
 
     AgregarCategoria(formData: FormData): Observable<any> {
       return this.http.post<any>(`${this.apiUrl}`, formData);
     }
 
     ActualizarCategoria(formData: FormData): Observable<any> {
       return this.http.put<any>(`${this.apiUrl}`, formData);
     }
 
     EliminarCategoria(id: any): Observable<any> {
       return this.http.delete<any>(`${this.apiUrl}/${id}`);
     }
}
