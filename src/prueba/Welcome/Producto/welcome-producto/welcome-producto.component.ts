import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router,private route: ActivatedRoute){}

  goBack(){
    // Esto navega "un nivel arriba" relativo a donde estás
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
