import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {

  //Aqui se almacenara lo guardado en componente welcomeProducto y luego se escuchara en welcome
  item = new BehaviorSubject<CartItem[]>([]);
  cardItem$ = this.item.asObservable();

  

  addToCart(product: any, quantity: number): void {
    const currentItems = this.item.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      // Si ya existe, actualiza la cantidad
      existingItem.cantidad += quantity;
      existingItem.subtotal = existingItem.cantidad * existingItem.precio;
    } else {
      // Si es nuevo, lo agrega
      const newItem: CartItem = {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: quantity,
        subtotal: quantity * product.precio
      };
      currentItems.push(newItem);
    }

    // Emite la nueva lista a todos los suscriptores
    this.item.next(currentItems);
  }
  // 💡 Nuevo método para vaciar el carrito
  clearCart(): void {
    this.item.next([]); // Emite una lista vacía
  }

  removerDelCarro(itemToRemove: CartItem): void {
    const currentItems = this.item.getValue();
    
    // Encuentra el índice del producto a remover (por ID o referencia)
    const index = currentItems.findIndex(item => item.id === itemToRemove.id);

    if (index > -1) {
      currentItems.splice(index, 1); // Elimina 1 elemento en el índice
      this.item.next([...currentItems]); // Emite la nueva lista
    }
  }

  constructor() { }
}
