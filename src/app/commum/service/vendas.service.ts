import { Vendas } from './../model/vendas.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VagnaoAPI } from 'src/app.api';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  constructor(private http: HttpClient) { }

  params = new HttpParams()

  getAllVendas(): Observable<HttpResponse<Vendas[]>> {
    return this.http.get<Vendas[]>(`${VagnaoAPI}/venda/`, { observe: 'response' })
  }

  getVenda(id:number): Observable<HttpResponse<Vendas>>{
    return this.http.get<Vendas>(`${VagnaoAPI}/venda/${id}`, { observe: 'response' })
  }

  getVendaComEnderecoEntrega(id:number): Observable<HttpResponse<Vendas>>{
    return this.http.get<Vendas>(`${VagnaoAPI}/venda/visualizar/${id}`, { observe: 'response' })
  }

  postVenda(form): Observable<HttpResponse<any>>{
    return this.http.post<Vendas>(`${VagnaoAPI}/venda/`, form, { observe: 'response' })
  }

  deleteVenda(id): Observable<HttpResponse<any>>{
    return this.http.delete<Vendas>(`${VagnaoAPI}/venda/${id}`, { observe: 'response' })
  }

  updateVenda(id:number, form): Observable<HttpResponse<any>>{
    return this.http.put<Vendas>(`${VagnaoAPI}/venda/${id}`, form, { observe: 'response' })
  }
  
}
