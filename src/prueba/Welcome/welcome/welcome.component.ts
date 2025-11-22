import { Component } from '@angular/core';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  
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

  // El carrito será un array de productos
  cartItems: Producto[] = [];

  // Variables para el contador de productos y el total
  cartItemCount: number = 0;
  cartTotal: number = 0;
  isCartVisible: boolean = false; // Para controlar la visibilidad del carrito

  constructor() { }

  ngOnInit(): void {
    // Aquí llamaríamos a tu servicio: this.productoService.getProductos()...
  }

  // Método para agregar un producto al carrito
  agregarAlCarrito(producto: Producto): void {
    this.cartItems.push(producto);
    this.actualizarCarrito();
  }

  // Método para actualizar el carrito: contador y total
  actualizarCarrito(): void {
    this.cartItemCount = this.cartItems.length;
    this.cartTotal = this.cartItems.reduce((total, producto) => total + producto.precio, 0);
  }

  // Método para alternar la visibilidad del carrito
  toggleCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }

    // Método para eliminar un producto del carrito (opcional)
  eliminarDelCarrito(producto: Producto): void {
    const index = this.cartItems.indexOf(producto);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.actualizarCarrito();
    }
  }
}
