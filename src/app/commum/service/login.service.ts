import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'
import { VagnaoAPI } from 'src/app.api';
import { Produto } from '../model/produtos.model';
import { Login } from '../model/login.model';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  params = new HttpParams()

  postLogar(form: Login): Observable<HttpResponse<any>> {
    return this.http.post<Login>(`${VagnaoAPI}/login/logar`, form, { observe: 'response' })
  }

  postLogin(form: Login): Observable<HttpResponse<any>> {
    return this.http.post<Login>(`${VagnaoAPI}/login/`, form, { observe: 'response' })
  }

  getClientePorIdLogin(id):Observable<HttpResponse<any>> {
    return this.http.get<Cliente>(`${VagnaoAPI}/clientes/${id}`, { params: id, observe: 'response' })
  }
}
