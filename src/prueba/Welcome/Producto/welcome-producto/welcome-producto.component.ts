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
}

@Component({
  selector: 'app-welcome-producto',
  templateUrl: './welcome-producto.component.html',
  styleUrl: './welcome-producto.component.scss'
})
export class WelcomeProductoComponent {
  idCategoria: string = '';
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Copa Suprema',
      precio: 150,
      descripcion: 'Deliciosa mezcla de vainilla, nueces y caramelo.',
      imagen: 'assets/Imagenes/user.png' // Asegúrate de tener imágenes o usar urls de prueba
    },
    {
      id: 2,
      nombre: 'Matcha Delight',
      precio: 180,
      descripcion: 'Helado de té verde con topping de chocolate blanco.',
      imagen: 'assets/Imagenes/user.png'
    },
    {
      id: 3,
      nombre: 'Mango Tropical',
      precio: 120,
      descripcion: 'Sorbete refrescante de mango con trozos de fruta.',
      imagen: 'assets/Imagenes/user.png'
    },
    {
      id: 4,
      nombre: 'Choco Brownie',
      precio: 200,
      descripcion: 'Intenso chocolate oscuro con trozos de brownie casero.',
      imagen: 'assets/Imagenes/user.png'
    },
    // Puedes agregar más aquí...
  ];

  constructor(private router: Router, private route: ActivatedRoute, private productoService: ProductoService,
    private location: Location
  ) {

    //Obtenemos los productos
    this.productoService.ObtenerProductos().subscribe({
      next: (data) => {
        var productos = data.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          precio: item.precio,
          categoria: item.categorias,
          idCategoria: item.categorias.length > 0 ? item.categorias[0].id : 0
        }));

      }
    });

    this.route.paramMap.subscribe(params => {
      this.idCategoria = params.get('id')!;
    });

    console.log("idc",this.idCategoria)
  }

  goBack() {
    // Esto navega "un nivel arriba" relativo a donde estás
    this.location.back();
  }
}
