import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  id: string = '';
 constructor(private route: ActivatedRoute){
  this.route.paramMap.subscribe(params => {
  this.id = params.get('id')!;
  console.log('ID recibido:', this.id);
});
 }
}
