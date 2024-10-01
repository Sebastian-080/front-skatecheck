import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  urlApi: string= 'http:localhost/3000'

  constructor( ) { }
}
