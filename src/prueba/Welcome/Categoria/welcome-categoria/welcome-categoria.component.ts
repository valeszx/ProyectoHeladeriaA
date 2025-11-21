import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../../../servicios/categoria.service';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  tipoCategoria: string;
  imagen: string
}

@Component({
  selector: 'app-welcome-categoria',
  templateUrl: './welcome-categoria.component.html',
  styleUrl: './welcome-categoria.component.scss'
})
export class WelcomeCategoriaComponent {
  categorias: any[] = [];
// Esta lista simula tu base de datos. 
  // Luego conectaremos esto a tu Servicio real.
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

  constructor(private route: Router,private router: ActivatedRoute,private categoriaService: CategoriaService){
    this.ObtenerCategorias();
  }

  ObtenerProductos(){
   this.route.navigate(['welcomeProducto'], { relativeTo: this.router.parent });
  }

   ObtenerCategorias() {
    //Obtenemos las categorias
    this.categoriaService.ObtenerCategoria().subscribe({
      next: (data) => {
        console.log(data)
        this.categorias = data.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          tipoCategoria: item.tipoCategoria,
          imagen: 'assets/Imagenes/user.png'
        }));

      }
    });
  }
}
