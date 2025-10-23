import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; // 👈 Clase para manejar datos
import { MatPaginator } from '@angular/material/paginator';
import { ProductoService } from '../../servicios/producto.service';
import { PermisoService } from '../../servicios/permiso.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Producto {
  nombre: string;
  descripcion: string;
  cantidad: string;
  precio: number;
}


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  // La primera columna invisible para los puntos suspensivos (menú de acciones)
  SOLICITUDES_DATA: Producto[] = [];
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Cantidad', 'Precio'];
  PuedeVer: boolean = false;
  @Input() id!: string
  formulario!: FormGroup;
  Modal: boolean = false;
  AddProducto!:Producto;

  dataSource = new MatTableDataSource<Producto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productoService: ProductoService, private permisoService: PermisoService,
    private route: ActivatedRoute, private fg: FormBuilder
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.formulario = fg.group(
      {
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        cantidad: ['', Validators.required],
        precio: ['', Validators.required]
      }
    )
  }

  ngOnInit() {
    // Esto se haría en ngAfterViewInit si los datos fueran asíncronos

    //Obtenemos los productos
    this.productoService.ObtenerProductos().subscribe({
      next: (data) => {
        var productos = data.map((item: any) => ({
          nombre: item.nombre,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          precio: item.precio
        }));

        this.SOLICITUDES_DATA = productos;
        this.dataSource = new MatTableDataSource<Producto>(this.SOLICITUDES_DATA);
        this.dataSource.paginator = this.paginator;
      }
    });

    //Validamos si el usuario que ingreso al sistema tiene permiso para ver el boton de agregar
    this.permisoService.ObtenerPermisos(parseInt(this.id)).subscribe({
      next: (data) => {
        this.PuedeVer = data.tienePermiso;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Boton cancelar del modal
  cancelar() {
    this.Modal = false;
    this.limpiarFormulario();
  }

  //Boton guardar del modal
  guardar() {

    var forms = this.formulario.value;

    this.AddProducto = {
      nombre: forms.nombre,
      descripcion: forms.descripcion,
      cantidad: forms.cantidad,
      precio: forms.precio
    };

    this.productoService.AgregarProducto(this.AddProducto).subscribe({
      next: (data) => {
       if(data){
        this.Modal = false;
        this.limpiarFormulario();
        this.ngOnInit();
       }
      }
    });
  }

  //boton agregar producto levanta el modal
  agregarProducto() {
    this.Modal = true;
  }

  //Cuando se guarda o cancela el modal se limpia el formulario
  limpiarFormulario() {
    this.formulario.reset();
  }

}
