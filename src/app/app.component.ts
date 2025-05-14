import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,       
    RouterLink,         
    RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  currentTitle = 'Registro de Estudiantes';
  year = new Date().getFullYear();

  constructor(public router: Router) {
    this.router.events.subscribe(() => {
      this.currentTitle =
        this.router.url === '/registro'
          ? 'Registro de Estudiantes'
          : 'Lista de Registros';
    });
  }
}
