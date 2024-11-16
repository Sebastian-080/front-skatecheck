import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IonicModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Cambia aquí a styleUrls
})
export class AppComponent {
  showMenu: boolean = false; // Variable que controla si se muestra el menú
  title = 'logistica';

  constructor(private router: Router) {}

  // Función para verificar si el usuario está autenticado
  ngOnInit(): void {
    // Verificamos si el 'usuario_id' existe en sessionStorage
    this.showMenu = (sessionStorage.getItem('usuario_id') !== null);
  }

  logout() {
    // Eliminamos el 'usuario_id' de sessionStorage
    sessionStorage.removeItem('usuario_id');    
    // Actualizar la visibilidad del menú
    this.showMenu = false;
    // Redireccionamos al login
    this.router.navigate(['/login']);
  }
}
