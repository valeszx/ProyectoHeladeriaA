import { Routes } from '@angular/router';
import { InicioComponent } from '../prueba/Inicio/inicio/inicio.component';
import { LoginComponent } from '../prueba/login/login.component';
import { ProductoComponent } from '../prueba/producto/producto.component';
import { WelcomeComponent } from '../prueba/Welcome/welcome/welcome.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'inicio/:id', component: InicioComponent, children: [
            // Cuando la URL es /Inicio, muestra el componente de bienvenida
            { path: '', component: WelcomeComponent },

            // Cuando la URL es /Inicio/Producto, muestra el ProductoComponent
            { path: 'Producto/:id', component: ProductoComponent },

            // Debes cambiar los routerLink en el menú para que usen esta ruta: ['/Inicio/Producto']
           
        ]
         
    },

];
