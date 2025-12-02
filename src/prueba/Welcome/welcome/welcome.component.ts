import { Component } from '@angular/core';
import { CardService } from '../../../servicios/card.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacturaCompraComponent } from '../FacturaCompra/factura-compra/factura-compra.component';

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  // Esta lista simula tu base de datos. 


  // El carrito será un array de productos
  cartItems: CartItem[] = [];

  // Variables para el contador de productos y el total
  cartItemCount: number = 0;
  cartTotal: number = 0;
  isCartVisible: boolean = false; // Para controlar la visibilidad del carrito

  constructor(private cardService: CardService, private modalService: NgbModal) {

    cardService.cardItem$.subscribe((resultado) => {
      this.cartTotal = 0;
      this.cartItems = resultado;
      this.cartItemCount = this.cartItems.length;

      this.cartItems.map((x) => {
        let total = (x.cantidad * x.precio)
        this.cartTotal = this.cartTotal + total
      })
    })
  }

  ngOnInit(): void {
    // Aquí llamaríamos a tu servicio: this.productoService.getProductos()...
  }

  // Método para agregar un producto al carrito
  agregarAlCarrito(producto: CartItem): void {
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
  eliminarDelCarrito(producto: CartItem): void {
    const index = this.cartItems.indexOf(producto);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.actualizarCarrito();
    }
  }

  checkout() {
    // Obtiene los valores actuales del carrito de los Observables
    // Usamos .pipe(take(1)) para obtener el valor actual y desuscribirnos inmediatamente
    this.cardService.cardItem$.subscribe(items => {

      // Abre el modal de la factura
      const modalRef = this.modalService.open(FacturaCompraComponent, { centered: true });

      // Pasa los datos al componente del modal
      modalRef.componentInstance.cartItems = items;
      modalRef.componentInstance.cartTotal = this.cartTotal;

      // Cuando el modal se cierre (ej: el usuario presiona "Aceptar")
      modalRef.result.then((result) => {
        if (result === 'Ok click') {
          this.cardService.clearCart(); // Vacía el carrito
          this.isCartVisible = false; // Opcional: cierra el desplegable del carrito
        }
      }, (reason) => {
        console.log(`Modal dismiss: ${reason}`); // Si el modal se cierra sin acción (ej. escape)
      });

    }).unsubscribe(); // Desuscribe para evitar fugas de memoria

  }

  //Remove item del carrito
  removerItemCarrito(item: CartItem): void {
    
    this.cardService.removerDelCarro(item);
  }
}
