import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; // 👈 Clase para manejar datos
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../producto/producto.component';
import { ProductoService } from '../../../servicios/producto.service';
import { PermisoService } from '../../../servicios/permiso.service';
import { CategoriaService } from '../../../servicios/categoria.service';


export interface Categoria {
  id:number;
  nombre: string;
  tipoCategoria: string;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
 // La primera columna invisible para los puntos suspensivos (menú de acciones)
  SOLICITUDES_DATA: Categoria[] = [];
  displayedColumns: string[] = ['Nombre', 'TipoCategoria', 'Editar', 'Eliminar'];
  PuedeVer: boolean = false;
  @Input() id!: string
  formulario!: FormGroup;
  idProductoEditar:number =0;
  Modal: boolean = false;
  ModalEliminar: boolean = false;
  AddProducto!: Producto;
  titulo: string = 'Agregar Nuevo Producto'
  tituloEliminar: string = 'Eliminar Producto'
  idProductoEliminar:number =0;

  dataSource = new MatTableDataSource<Categoria>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoriaService: CategoriaService, private permisoService: PermisoService,
    private route: ActivatedRoute, private fg: FormBuilder
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.formulario = fg.group(
      {
        nombre: ['', Validators.required],
        tipoCategoria: ['', Validators.required]
      }
    )
  }

  ngOnInit() {
    // Esto se haría en ngAfterViewInit si los datos fueran asíncronos

    //Obtenemos los productos
    this.categoriaService.ObtenerCategoria().subscribe({
      next: (data) => {
        console.log(data)
        var categoria = data.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          tipoCategoria: item.tipoCategoria
        }));

        this.SOLICITUDES_DATA = categoria;
        this.dataSource = new MatTableDataSource<Categoria>(this.SOLICITUDES_DATA);
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
        id :0,
        nombre: forms.nombre,
        descripcion: forms.descripcion,
        cantidad: forms.cantidad,
        precio: forms.precio
      };

    if (this.titulo == 'Agregar Nuevo Producto') {
    
      this.categoriaService.AgregarCategoria(this.AddProducto).subscribe({
        next: (data) => {
          if (data) {
            this.Modal = false;
            this.limpiarFormulario();
            this.ngOnInit();
          }
        }
      });
    }
    else{

      this.AddProducto = {
        id :this.idProductoEditar,
        nombre: forms.nombre,
        descripcion: forms.descripcion,
        cantidad: forms.cantidad,
        precio: forms.precio
      };
      
      this.categoriaService.ActualizarCategoria(this.AddProducto).subscribe({
        next: (data) => {
          if (data) {
            this.Modal = false;
            this.limpiarFormulario();
            this.ngOnInit();
          }
        }
      });
    }

  }

  //boton agregar producto levanta el modal
  agregarProducto() {
    this.Modal = true;
    this.titulo = 'Agregar Nuevo Producto';
  }

  editarProducto(producto: any) {
    this.Modal = true;
    this.titulo = 'Editar producto';

    this.idProductoEditar = producto.id;

    this.formulario.patchValue({ 'nombre': producto.nombre })
    this.formulario.patchValue({ 'descripcion': producto.descripcion })
    this.formulario.patchValue({ 'cantidad': producto.cantidad })
    this.formulario.patchValue({ 'precio': producto.precio })

  }

  //Cuando se guarda o cancela el modal se limpia el formulario
  limpiarFormulario() {
    this.formulario.reset();
  }

  eliminar(){
    this.categoriaService.EliminarCategoria(this.idProductoEliminar).subscribe({
        next: (data) => {
          if (data) {
            this.ModalEliminar = false;
            this.limpiarFormulario();
            this.ngOnInit();
          }
        }
      });
  }

  EliminarProducto(producto: any){
    this.idProductoEliminar = producto.id;
    this.ModalEliminar = true;
  }

  CancelarEliminar(){
    this.ModalEliminar = false;
  }
}
