import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; // 👈 Clase para manejar datos
import { MatPaginator } from '@angular/material/paginator';
import { ProductoService } from '../../servicios/producto.service';

export interface Producto {
  nombre: string;
  descripcion: string;
  cantidad: string;
  precio: number;
}


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
// La primera columna invisible para los puntos suspensivos (menú de acciones)
 SOLICITUDES_DATA: Producto[] = [];
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Cantidad','Precio'];


  dataSource = new MatTableDataSource<Producto>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(private productoService: ProductoService) {
     
    }

  ngOnInit() {
    // Esto se haría en ngAfterViewInit si los datos fueran asíncronos
    
    this.productoService.ObtenerProductos().subscribe({
      next: (data) => {
        var productos = data.map((item: any) => ({
          nombre: item.nombre,
          descripcion: item.descripcion,  
          cantidad: item.cantidad,
          precio: item.precio
      }));

      this.SOLICITUDES_DATA = productos;
      this.dataSource = new MatTableDataSource<Producto>(this.SOLICITUDES_DATA);
      this.dataSource.paginator = this.paginator; 
    }
  });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
