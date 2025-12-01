import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

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

  currentDate: Date = new Date();
  constructor(public activeModal: NgbActiveModal) { }
}
