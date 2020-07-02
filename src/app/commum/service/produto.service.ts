import { Produto } from '../model/produtos.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VagnaoAPI } from 'src/app.api';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
 
  constructor(private http: HttpClient) { }

  params = new HttpParams()

  getAllProdutos(): Observable<HttpResponse<Produto[]>> {
    return this.http.get<Produto[]>(`${VagnaoAPI}/produtos/`, { observe: 'response' })
  }
  
  
  getProduto(id:number): Observable<HttpResponse<Produto>>{
    return this.http.get<Produto>(`${VagnaoAPI}/produtos/${id}`, { observe: 'response' })
  
  }

  postProdutos(form: Produto): Observable<HttpResponse<any>> {
    return this.http.post<Produto>(`${VagnaoAPI}/produtos/`, form, { observe: 'response' })
  }
  
  updateProdutos(data:Produto, id ): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${VagnaoAPI}/produtos/${id}`, data, { observe: 'response' })
  }

  deleteProdutos(id):Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${VagnaoAPI}/produtos/${id}`, {params: id, observe: 'response' })
  }

  getProdutosPorCategoria(id: number): Observable<HttpResponse<Produto>>{
    return this.http.get<Produto>(`${VagnaoAPI}/produtos/categoria/${id}`, { observe: 'response' })
  }
}












