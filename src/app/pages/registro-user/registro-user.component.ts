import { Component, OnInit } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registro-user',
  imports: [IonicModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.scss'],
})
export class RegistroUserComponent  implements OnInit {
  frmRegister: FormGroup;

  constructor() {
    this.frmRegister = new FormGroup({
      nombre: new FormControl('',Validators.required),
      correoE: new FormControl('',Validators.required),
      telefono: new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required),
      usuario: new FormControl('',Validators.required),
      pass: new FormControl('',Validators.required)
    });
   }

  ngOnInit() {}

  Registro(){
    console.log(this.frmRegister.value);
    this.frmRegister.reset();
    alert("Registrado Existosamente");
  }

}
