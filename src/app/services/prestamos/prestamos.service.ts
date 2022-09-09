import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  apiBase = "http://localhost:8080/"
  constructor(
    private http: HttpClient
  ) { }

  getPrestamosByClient(clientId:string){
    return this.http.get(this.apiBase+'prestamos/byUser/'+clientId, {});
  }

  addPrestamo(prestamo:any){
    prestamo.pago_semanal += '';
    prestamo.monto_total += '';
    return this.http.post(this.apiBase+'prestamos', prestamo);
  }

}
