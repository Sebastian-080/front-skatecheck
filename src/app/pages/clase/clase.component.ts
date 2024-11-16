import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Clase } from '../../models/clase.model';
import { ApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-clase',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss'],
})
export class ClaseComponent  implements OnInit {
  frmClase: FormGroup;
  claseList: Clase[] = []; 

  constructor(private apiService: ApiService) {    
    this.frmClase = new FormGroup({
      fecha_clase: new FormControl('', Validators.required),
      hora_ingreso: new FormControl('', Validators.required),
      tiempo_clase: new FormControl('', Validators.required),
      cantidad_estudiantes: new FormControl('', Validators.required)
    });
  }

  getClases() {
    this.apiService.get<Clase[]>('/clase').subscribe({
      next: (response: ApiResponse<Clase[]>) => {
        this.claseList = response.body || [];
      },
      error: err => {
        console.error(err); // Log the error
      }
    });
  }

  ngOnInit() {
    this.getClases();
  }

  clase() {

    if (this.frmClase.invalid) {
      return;
    }

    this.apiService.post<ApiResponse<Clase>>('/clase', this.frmClase.value).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.frmClase.reset();
          alert("Clase Registrada.")
          this.getClases();
        }
      },
      error: err => {
        console.error(err);
      }
    });
  } 

}
