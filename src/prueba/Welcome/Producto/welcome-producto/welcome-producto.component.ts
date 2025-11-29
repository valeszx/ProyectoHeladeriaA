import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../../servicios/producto.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService } from '../../../../servicios/card.service';

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

  // 2. Variable para almacenar el producto seleccionado
  selectedProduct: Partial<Producto> = { nombre: '' };

  constructor(private router: Router, private route: ActivatedRoute, private productoService: ProductoService,
    private location: Location,
    private modalService: NgbModal,
    private cardService:CardService
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

   addToCart(quantity: string):void{
   const qty = parseInt(quantity, 10);
    
    if (this.selectedProduct && qty > 0) {
      
      // LLAMADA AL SERVICIO DE CARRITO
      this.cardService.addToCart(this.selectedProduct, qty);

      console.log(`Agregando ${qty} unidades de "${this.selectedProduct.nombre}" al carrito.`);
      
      // Cierra el modal de NgbModal
      this.modalService.dismissAll(); 
    }
   }

   // 3. Método para manejar el clic en la tarjeta (abre el modal)
  openQuantityModal(product: Producto, content: TemplateRef<any>): void {
    // Almacena el producto para mostrar su nombre en el modal
    this.selectedProduct = product; 
    // Nota: El modal se abre automáticamente gracias a los atributos de Bootstrap (data-bs-toggle/target) en el HTML.
    // Abrimos el modal. Usamos 'centered: true' para que se centre.
    this.modalService.open(content, { centered: true });
  }
}
