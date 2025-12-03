import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CardService } from '../../../../servicios/card.service';
import { ProductoService } from '../../../../servicios/producto.service';

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-factura-compra',
  templateUrl: './factura-compra.component.html',
  styleUrl: './factura-compra.component.scss'
})
export class FacturaCompraComponent {
  @Input() cartItems: CartItem[] = []; // Recibirá los ítems del carrito
  @Input() cartTotal: number = 0; // Recibirá el total del carrito
  deduccion: CartItem[] = [];

  currentDate: Date = new Date();
  constructor(public activeModal: NgbActiveModal, private cardService:CardService,
    private productoService: ProductoService
  ) { 
    this.cardService.cardItem$.subscribe({
      next: (value) =>{
       this.deduccion =value;
      }
    })
  }

 deduccionCantidadProducto() {
  this.deduccion.forEach(item => {
    this.productoService.ActualizarCantidad(item.id, item.cantidad)
      .subscribe({
        next: () => {},
        error: (err) => console.error(err)
      });
  });
}
}
