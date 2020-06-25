import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { VagnaoAPI } from 'src/app.api';
import { Categorias } from '../model/categorias.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  params = new HttpParams()

  getAllCategorias(): Observable<HttpResponse<Categorias[]>> {
    return this.http.get<Categorias[]>(`${VagnaoAPI}/categorias/`, { observe: 'response' })
  }

<<<<<<< HEAD
  getCategoria(id:number): Observable<HttpResponse<Categorias>>{
    return this.http.get<Categorias>(`${VagnaoAPI}/categorias/${id}`, { observe: 'response' })
  }
  
=======
    getCategorias(id:number): Observable<HttpResponse<Categorias>>{
    return this.http.get<Categorias>(`${VagnaoAPI}/categorias/${id}`, { observe: 'response' })
  }

  updateCategorias(data:Categorias, id ): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${VagnaoAPI}/categorias/${id}`,data, { observe: 'response' })
  }

>>>>>>> fa513b7... criacao do adicionar/editar/excluir de categorias
  postCategorias(form: Categorias) : Observable<HttpResponse<any>>{
    return this.http.post<Categorias>(`${VagnaoAPI}/categorias/`, form, { observe: 'response' })
  }

  deleteCategorias(categorias: Categorias) {
    return this.http.delete<Categorias>(`${VagnaoAPI}/categorias/${categorias.id}`, { observe: 'response' })
  }


}
