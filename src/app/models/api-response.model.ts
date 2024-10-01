export interface ApiResponse<T> {
    error: string;
    status: number;
    body: T;
  }
  