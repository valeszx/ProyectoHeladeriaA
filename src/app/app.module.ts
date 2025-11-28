import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Aquí se importa HttpClientModule
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { LoginComponent } from '../prueba/login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuComponent } from '../prueba/Menu/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { InicioComponent } from '../prueba/Inicio/inicio/inicio.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProductoComponent } from '../prueba/producto/producto.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // Opcional, pero recomendado
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WelcomeComponent } from '../prueba/Welcome/welcome/welcome.component';
import { CategoriaComponent } from '../prueba/categoria/categoria/categoria.component';
import { WelcomeCategoriaComponent } from '../prueba/Welcome/Categoria/welcome-categoria/welcome-categoria.component';
import { WelcomeProductoComponent } from '../prueba/Welcome/Producto/welcome-producto/welcome-producto.component';
import { MatOption } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    InicioComponent,
    ProductoComponent,
    WelcomeComponent,
    CategoriaComponent,
    WelcomeCategoriaComponent,
    WelcomeProductoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule  // Asegúrate de incluirlo en los imports
    ,RouterModule.forRoot(routes)
    ,MatToolbarModule
    ,MatIconModule
    ,MatMenuModule
    ,MatButtonModule
    ,MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatOption,
    NgbModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }