import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; // 👈 Clase para manejar datos
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../producto/producto.component';
import { ProductoService } from '../../../servicios/producto.service';
import { PermisoService } from '../../../servicios/permiso.service';
import { CategoriaService } from '../../../servicios/categoria.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface Categoria {
  id: number;
  nombre: string;
  tipoCategoria: string;
  rutaImagen: string;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  // La primera columna invisible para los puntos suspensivos (menú de acciones)
  SOLICITUDES_DATA: Categoria[] = [];
  displayedColumns: string[] = ['Nombre', 'TipoCategoria', 'Imagen', 'Acciones'];
  PuedeVer: boolean = false;
  @Input() id!: string
  formulario!: FormGroup;
  idCategoriaEditar: number = 0;
  Modal: boolean = false;
  ModalEliminar: boolean = false;
  AddCategoria!: Categoria;
  titulo: string = 'Agregar Nueva Categoria'
  tituloEliminar: string = 'Eliminar Categoria'
  idProductoEliminar: number = 0;
  categorias: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  private readonly API_URL_BASE = 'https://localhost:7191';
  // 1. Referencias a los templates del HTML
  @ViewChild('categoriaModal') categoriaModalRef!: TemplateRef<any>;
  @ViewChild('eliminarModal') eliminarModalRef!: TemplateRef<any>;

  dataSource = new MatTableDataSource<Categoria>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoriaService: CategoriaService, private permisoService: PermisoService,
    private route: ActivatedRoute, private fg: FormBuilder,
    private modalService: NgbModal
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
          tipoCategoria: item.tipoCategoria,
          // Concatena la URL base a la ruta relativa (item.ruta)
          rutaImagen: item.ruta
            ? `${this.API_URL_BASE}${item.ruta}`
            : null // Maneja el caso en que la ruta sea null
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

    this.ObtenerCategorias();
  }

  //Filtro de busqueda
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

    // 1. Crear el objeto FormData
    const formData = new FormData();

    // 2. Agregar los datos del formulario (nombre y tipoCategoria)
    const forms = this.formulario.value;
    formData.append('nombre', forms.nombre);
    formData.append('tipoCategoria', forms.tipoCategoria);

    // 3. Agregar el archivo de imagen si existe
    // 'imagen' es la clave que tu API backend esperará para el archivo.
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    if (this.titulo == 'Agregar Nueva Categoria') {

      this.categoriaService.AgregarCategoria(formData).subscribe({
        next: (data) => {
          if (data) {
            //Cierra el modal de forma programática
            this.modalService.dismissAll();
            this.limpiarFormulario();
            this.ngOnInit();
          }
        }
      });
    }
    else {

      // Para actualizar, también debemos enviar el ID, que no está en el formulario.
      // Lo adjuntamos directamente al FormData.
      formData.append('id', this.idCategoriaEditar.toString());

      this.categoriaService.ActualizarCategoria(formData).subscribe({
        next: (data) => {
          if (data) {
            //Cierra el modal de forma programática
            this.modalService.dismissAll();
            this.limpiarFormulario();
            this.ngOnInit();
          }
        }
      });
    }

  }

  //boton agregar producto levanta el modal
  agregarProducto() {
    // Abrir el modal usando el servicio y la referencia al template
    this.modalService.open(this.categoriaModalRef, { size: 'md', centered: true });
    this.titulo = 'Agregar Nueva Categoria';
  }

  //boton editar producto levanta el modal con los datos cargados
  editarProducto(categoria: any) {
    this.modalService.open(this.categoriaModalRef, { size: 'md', centered: true });
    this.titulo = 'Editar categoria';

    this.idCategoriaEditar = categoria.id;

    this.formulario.patchValue({ 'nombre': categoria.nombre })
    this.formulario.patchValue({ 'tipoCategoria': categoria.tipoCategoria })

    // 2. Manejar la imagen existente (la ruta)
    // Limpiamos cualquier archivo que se haya seleccionado antes.
    this.selectedFile = null;
    // Verificamos si la categoría tiene una ruta de imagen guardada en la BD.
    if (categoria.rutaImagen) {
      // Concatena la URL base para crear la URL completa que el navegador puede cargar
      this.imagePreview = `${categoria.rutaImagen}`;
    } else {
      // Si no hay imagen guardada, limpiamos la previsualización.
      this.imagePreview = null;
    }
  }

  //Cuando se guarda o cancela el modal se limpia el formulario
  limpiarFormulario() {
    this.formulario.reset();
  }

  //Boton eliminar del modal eliminar
  eliminar() {
    this.categoriaService.EliminarCategoria(this.idProductoEliminar).subscribe({
      next: (data) => {
        if (data) {
          //Cierra el modal de forma programática
          this.modalService.dismissAll();
          this.limpiarFormulario();
          this.ngOnInit();
        }
      }
    });
  }

  //boton eliminar producto levanta el modal eliminar
  EliminarProducto(producto: any) {
    this.idProductoEliminar = producto.id;
    this.modalService.open(this.eliminarModalRef, { size: 'md', centered: true });
  }

  //Boton cancelar del modal eliminar
  CancelarEliminar() {
    //Cierra el modal de forma programática
    this.modalService.dismissAll();
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
          // Concatena la URL base a la ruta relativa (item.ruta)
          rutaImagen: item.ruta
            ? `${this.API_URL_BASE}${item.ruta}`
            : null // Maneja el caso en que la ruta sea null
        }));

      }
    });
  }

  /**
     * Maneja la selección del archivo de imagen.
     * @param event Evento de cambio del input file.
     */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      // Lógica para la previsualización de la imagen
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }
}
