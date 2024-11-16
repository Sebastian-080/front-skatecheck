import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { ApiResponse } from '../../models/api-response.model';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { Asistencia } from '../../models/asistencia.model';
import { Clase } from '../../models/clase.model';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {
  frmAsistencia: FormGroup;
  claseList: Clase[] = []; 
  asistenciaList: Asistencia[] = []; 

  constructor(private apiService: ApiService) { 
    this.frmAsistencia = new FormGroup({
      clase_id: new FormControl('', Validators.required),
      usuario_id: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.apiService.get<Clase[]>('/clase').subscribe({
      next: (response: ApiResponse<Clase[]>) => {
        this.claseList = response.body || []; // Safely assign the response body
        console.log(this.claseList);
      },
      error: err => {
        console.error(err); // Log the error
      }
    });

    this.getAsistencias();
  }
  
  asistencia() {
    console.log(this.frmAsistencia.value);
    this.frmAsistencia.value.usuario_id = sessionStorage.getItem('usuario_id');

    // Aquí estamos asegurando que estamos usando ApiResponse<User>
    this.apiService.post<ApiResponse<Asistencia>>('/asistencia', this.frmAsistencia.value).subscribe({
      next: (response) => {
        // Aquí la respuesta es del tipo ApiResponse<User>
        console.log(response);
        this.frmAsistencia.reset();
        alert("Asistencia Registrada.")
        this.getAsistencias();
      },
      error: err => {
        console.error(err);
        alert("ERROR.")
      }
    });
  }

  getAsistencias() {
    const usuario_id = sessionStorage.getItem('usuario_id');
    this.apiService.get<Asistencia[]>(`/asistencia/${usuario_id}`).subscribe({
      next: (response: ApiResponse<Asistencia[]>) => {
        this.asistenciaList = response.body || [];
      },
      error: err => {
        console.error(err); // Log the error
      }
    });
  }
}
