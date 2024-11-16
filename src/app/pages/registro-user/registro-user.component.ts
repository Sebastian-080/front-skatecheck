import { Component, OnInit } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { User } from '../../models/user.model'; // Asegúrate de que esto esté correcto
import { ApiResponse } from '../../models/api-response.model'; // Importa el modelo de respuesta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-user',
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  providers: [ApiService],
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.scss'],
})
export class RegistroUserComponent  implements OnInit {
  frmRegister: FormGroup;
  edad: number | null = null;
  esMenor: boolean = false;
  usuariosList: User[] = [];

  constructor(private apiService: ApiService) {
    this.frmRegister = new FormGroup({
      doc: new FormControl('',Validators.required),
      nombre: new FormControl('',Validators.required),
      apellido: new FormControl('',Validators.required),
      nacimiento: new FormControl('',Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('',Validators.required),
      nombre_acudiente: new FormControl(''),
      correo_acudiente: new FormControl(''),
      telefono_acudiente: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.getUsuarios();
  }

  Registro(){
    console.log(this.frmRegister.value);

    if (this.frmRegister.invalid) {
      alert("Datos Incompletos.")
    } else {
      // Aquí estamos asegurando que estamos usando ApiResponse<User>
      this.apiService.post<ApiResponse<User>>('/user', this.frmRegister.value).subscribe({
        next: (response) => {
          // Aquí la respuesta es del tipo ApiResponse<User>
          console.log(response);
          alert("Usuario Creado Existosamente.")
  
          this.frmRegister.reset();
          this.getUsuarios();
        },
        error: err => {
          console.error(err);
          alert("ERROR!.")
        }
      });
    }
  }

  // Método para calcular la edad
  onBirthdateChange(event: any): void {
    const fechaNacimiento = new Date(event.detail.value);
    const hoy = new Date();
    const edadCalculada = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      this.edad = edadCalculada - 1;
    } else {
      this.edad = edadCalculada;
    }

    // Verificar si es menor de 18 años
    this.esMenor = this.edad < 18;
  }

  getUsuarios() {
    this.apiService.get<User[]>(`/user`).subscribe({
      next: (response: ApiResponse<User[]>) => {
        this.usuariosList = response.body || [];
      },
      error: err => {
        console.error(err); // Log the error
      }
    });
  }

}
