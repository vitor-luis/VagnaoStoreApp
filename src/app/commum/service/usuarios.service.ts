import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../model/login.model';
import { VagnaoAPI } from 'src/app.api';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  params = new HttpParams()

  getAllUsuarios(): Observable<HttpResponse<Login[]>> {
    return this.http.get<Login[]>(`${VagnaoAPI}/login/`, { observe: 'response' })
  }

  deleteLogin(id): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${VagnaoAPI}/login/${id}`, { params: id, observe: 'response' })
  }

  deleteCliente(id): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${VagnaoAPI}/clientes/${id}`, { params: id, observe: 'response' })
  }
}
