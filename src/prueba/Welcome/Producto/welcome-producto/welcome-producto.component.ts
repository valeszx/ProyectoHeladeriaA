import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../../servicios/producto.service';
import { Location } from '@angular/common';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  idCategoria: number;
}

@Component({
  selector: 'app-welcome-producto',
  templateUrl: './welcome-producto.component.html',
  styleUrl: './welcome-producto.component.scss'
})
export class WelcomeProductoComponent {
  idCategoria: string = '';
  productos: Producto[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private productoService: ProductoService,
    private location: Location
  ) {

    //Obtenemos el id que va en la ruta
    this.route.paramMap.subscribe(params => {
      this.idCategoria = params.get('idCategoria')!;
    });

    //Obtenemos los productos
    this.productoService.ObtenerProductos().subscribe({
      next: (data) => {
        this.productos = data.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          precio: item.precio,
          categoria: item.categorias,
          idCategoria: item.categorias.length > 0 ? item.categorias[0].id : 0
        }));

      //Filtramos los productos por la categoria seleccionada.
       this.productos = this.productos.filter(x=> x.idCategoria == parseInt(this.idCategoria))!

      }
    });

    

    
  }

  goBack() {
    // Regresar atras
    this.location.back();
  }
}
