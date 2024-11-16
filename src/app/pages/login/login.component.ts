import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service'; // Verifica que la ruta sea correcta
import { User } from '../../models/user.model'; // Asegúrate de que esto esté correcto
import { ApiResponse } from '../../models/api-response.model'; // Importa el modelo de respuesta
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [IonicModule, ReactiveFormsModule],
  standalone: true,
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;

  constructor(private apiService: ApiService, private router: Router) {
    this.frmLogin = new FormGroup({
      usuario: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  Login() {
    console.log(this.frmLogin.value);

    // Aquí estamos asegurando que estamos usando ApiResponse<User>
    this.apiService.post<User>('/user/login', this.frmLogin.value).subscribe({
      next: (response) => {

        if (response.error) {
          // Aquí puedes manejar el error de la API si la propiedad "error" es true
          alert(response.msg || "Error en la autenticación.");
          return;
        }

        ;

        // Accedemos al body que contiene los datos del usuario
        const user: User = response.body;
    
        // Verificamos si usuario_id existe y lo almacenamos en sessionStorage
        if (user.usuario_id) {
          sessionStorage.setItem('usuario_id', user.usuario_id.toString());
        }
    
        // Redirigimos al usuario a la página principal
        this.router.navigate(['/']);
      },
      error: err => {
        console.error(err);
        alert("Datos incorrectos.");
      }
    });
    
  }
}
