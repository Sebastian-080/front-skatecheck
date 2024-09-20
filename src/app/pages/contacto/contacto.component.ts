import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent  implements OnInit {
  frmControles: FormGroup;

  constructor() { 
    this.frmControles = new FormGroup({
      nombre: new FormControl('',Validators.required),
      correo: new FormControl('',Validators.required),
      descripcion: new FormControl('',Validators.required),
    });
  }

  ngOnInit() {}

  login(){
    console.log(this.frmControles.value);
  }

}
