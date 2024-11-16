import { Clase } from "./clase.model";
import { User } from "./user.model";

export interface Asistencia {
  asistencia_id: string;
  clase_id: string;
  usuario_id: string;
  clase: Clase;  // Campos de la tabla clase
  usuario: User; // Campos de la tabla usuario
}
