import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'
import { VagnaoAPI } from 'src/app.api';
import { Produto } from '../model/produtos.model';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  params = new HttpParams()

  getEmailForValidation(email: string): Observable<HttpResponse<Login>>{
    return this.http.get<Login>(`${VagnaoAPI}/login/${email}`, {observe: 'response'})
  }

  postLogin(form: Login): Observable<HttpResponse<any>> {
    return this.http.post<Login>(`${VagnaoAPI}/login/`, form, { observe: 'response' })
  }
}
