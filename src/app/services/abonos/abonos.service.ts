import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbonosService {
  apiBase = "http://localhost:8080/"
  constructor(
    private http: HttpClient
  ) { }

  addAbono(abono:any){
    abono.cantidad_abonada += '';
    return this.http.post(this.apiBase+'abonos', abono);
  }

}
