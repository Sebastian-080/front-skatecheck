import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service'; // Verifica que la ruta sea correcta
import { User } from '../../models/user.model'; // Asegúrate de que esto esté correcto
import { ApiResponse } from '../../models/api-response.model'; // Importa el modelo de respuesta

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

  constructor(private apiService: ApiService) {
    this.frmLogin = new FormGroup({
      usuario: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  Login() {
    console.log(this.frmLogin.value);

    // Aquí estamos asegurando que estamos usando ApiResponse<User>
    this.apiService.post<ApiResponse<User>>('/user/login', this.frmLogin.value).subscribe({
      next: (response) => {
        // Aquí la respuesta es del tipo ApiResponse<User>
        console.log(response);
        alert("Datos correctos.")
      },
      error: err => {
        console.error(err);
        alert("Datos incorrectos.")
      }
    });
  }
}
