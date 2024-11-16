import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IonicModule, HttpClientModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Cambia aquí a styleUrls
})
export class AppComponent {
  title = 'logistica';
}
