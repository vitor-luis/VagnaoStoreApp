import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { VagnaoAPI } from 'src/app.api';
import { Produto } from '../model/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<HttpResponse<Produto>> {
    return this.http.get<Produto>(`${VagnaoAPI}/produtos`, { observe: 'response' });
  }
}
