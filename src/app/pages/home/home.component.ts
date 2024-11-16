import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactoComponent } from "../contacto/contacto.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [IonicModule, ReactiveFormsModule, ContactoComponent, RouterLink],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
