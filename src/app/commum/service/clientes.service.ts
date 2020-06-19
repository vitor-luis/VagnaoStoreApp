import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Cliente } from '../model/cliente.model';
import { Observable } from 'rxjs';
import { VagnaoAPI } from 'src/app.api';
import { Usuario } from '../model/usuario.model';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  params = new HttpParams()

  postCliente(form: Cliente) : Observable<HttpResponse<any>>{
    return this.http.post<Cliente>(`${VagnaoAPI}/clientes/`, form, { observe: 'response' })
  }

  getCliente(email: string): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${VagnaoAPI}/login/${email}`, { observe: 'response' })
  }

  updateCliente(data:Usuario, id): Observable<HttpResponse<any>>{
    return this.http.put<any>(`${VagnaoAPI}/clientes/${id}`,data, { observe: 'response'} )
  }

  updateLogin(data:Login, id): Observable<HttpResponse<any>>{
    return this.http.put<any>(`${VagnaoAPI}/login/${id}`,data, { observe: 'response'} )
  }
}
