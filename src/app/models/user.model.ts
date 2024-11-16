import { Estudiante } from "./estudiante.model";

export interface User {
  usuario_id: number;
  usuario: string;
  password: string;
  nombre: string;
  perfil_id: number;
  estudiante: Estudiante; // Campos de la tabla estudiante
}
