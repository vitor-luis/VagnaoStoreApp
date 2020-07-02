import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { ItemVenda } from '../model/itemVenda.model';
import { VagnaoAPI } from 'src/app.api';
import { Observable } from 'rxjs';
import { ProdutoItemVenda } from '../model/produtoItemVenda';

@Injectable({
  providedIn: 'root'
})
export class ItemVendaService {

  constructor(private http: HttpClient) { }

  params = new HttpParams()

  public postItemVenda(form: ItemVenda): Observable<HttpResponse<any>> {
    return this.http.post<ItemVenda>(`${VagnaoAPI}/itemVendas`, form, { observe: 'response' })
  }

  getItensDeUmaVenda(id):Observable<HttpResponse<any>> {
    return this.http.get<ItemVenda>(`${VagnaoAPI}/itemVendas/venda/${id}`, { params: id, observe: 'response' })
  }

  updateItemVenda(id: number, form: ItemVenda):  Observable<HttpResponse<any>> {
    return this.http.put<ItemVenda>(`${VagnaoAPI}/itemVendas/${id}`, form, { observe: 'response' })
  }
  
  getProdutosDeUmaVenda(id):Observable<HttpResponse<any[]>> {
    return this.http.get<ProdutoItemVenda[]>(`${VagnaoAPI}/itemVendas/produto/${id}`, { params: id, observe: 'response' })
  }

  deleteItemVenda(id):Observable<HttpResponse<any[]>> {
    return this.http.delete<ProdutoItemVenda[]>(`${VagnaoAPI}/itemVendas/${id}`, { params: id, observe: 'response' })
  }

  getVendasPorItemVenda(id):Observable<HttpResponse<any[]>> {
    return this.http.get<ProdutoItemVenda[]>(`${VagnaoAPI}/itemVendas/produtos/${id}`, { params: id, observe: 'response' })
  }
}
