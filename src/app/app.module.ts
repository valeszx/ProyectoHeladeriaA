import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Aquí se importa HttpClientModule
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { LoginComponent } from '../prueba/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule  // Asegúrate de incluirlo en los imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }