import { Component, OnInit } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { User } from '../../models/user.model'; // Asegúrate de que esto esté correcto
import { ApiResponse } from '../../models/api-response.model'; // Importa el modelo de respuesta

@Component({
  selector: 'app-registro-user',
  imports: [IonicModule, ReactiveFormsModule],
  standalone: true,
  providers: [ApiService],
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.scss'],
})
export class RegistroUserComponent  implements OnInit {
  frmRegister: FormGroup;

  constructor(private apiService: ApiService) {
    this.frmRegister = new FormGroup({
      nombre: new FormControl('',Validators.required),
      correo: new FormControl('',Validators.required),
      telefono: new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required),
      usuario: new FormControl('',Validators.required),
      pass: new FormControl('',Validators.required)
    });
   }

  ngOnInit() {}

  Registro(){
    console.log(this.frmRegister.value);

    if (this.frmRegister.invalid) {
      alert("Datos Incompletos.")
    } else {
      // Aquí estamos asegurando que estamos usando ApiResponse<User>
      this.apiService.post<ApiResponse<User>>('/user/register', this.frmRegister.value).subscribe({
        next: (response) => {
          // Aquí la respuesta es del tipo ApiResponse<User>
          console.log(response);
          alert("Usuario Creado Existosamente.")
  
          this.frmRegister.reset();
        },
        error: err => {
          console.error(err);
          alert("ERROR!.")
        }
      });
    }
  }

}
