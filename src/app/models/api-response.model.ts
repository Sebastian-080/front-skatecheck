export interface ApiResponse<T> {
  error: boolean;   // Puede ser false si no hay error
  status: number;   // El código de estado HTTP
  msg: string;      // Mensaje de la respuesta
  body: T;          // El cuerpo de la respuesta, que en este caso es de tipo User
}

  