import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: string = '';

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  listarClientes(tipo: any, filtro: any): Observable<any> {
    // Request.
    return this._http.get(`${this.url}listarClientes/${tipo}/${filtro}`);
  }

  registroClienteAdmin(cliente: any): Observable<any> {
    // Request.
    return this._http.post(`${this.url}registroClienteAdmin`, cliente);
  }

  actualizarClienteAdmin(cliente: any): Observable<any> {
    // Request.
    return this._http.put(`${this.url}actualizarClienteAdmin/${cliente._id}`, cliente);
  }

  obtenerClienteAdmin(id: string): Observable<any> {
    // Request.
    return this._http.get(`${this.url}obtenerClienteAdmin/${id}`);
  }

  eliminarClienteAdmin(id: string): Observable<any> {
    // Request.
    return this._http.delete(`${this.url}eliminarClienteAdmin/${id}`);
  }

  buscarClientePorIdentificacion(identificacion: any): Observable<any> {
    // Request.
    return this._http.get(`${this.url}buscarClientePorIdentificacion/${identificacion}`);
  }


}
