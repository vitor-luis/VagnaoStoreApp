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

  getAllCategoriasMenu(): Observable<HttpResponse<Categorias[]>> {
    return this.http.get<Categorias[]>(`${VagnaoAPI}/categorias/`, { observe: 'response' })
  }
  getAllCategorias(): Observable<HttpResponse<Categorias[]>> {
    return this.http.get<Categorias[]>(`${VagnaoAPI}/categorias/todas/`, { observe: 'response' })
  }

  getCategoria(id:number): Observable<HttpResponse<Categorias>>{
    return this.http.get<Categorias>(`${VagnaoAPI}/categorias/${id}`, { observe: 'response' })
  }
  
  updateCategorias(data:Categorias, id ): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${VagnaoAPI}/categorias/${id}`,data, { observe: 'response' })
  }

  postCategorias(form: Categorias) : Observable<HttpResponse<any>>{
    return this.http.post<Categorias>(`${VagnaoAPI}/categorias/`, form, { observe: 'response' })
  }

  deleteCategorias(id):Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${VagnaoAPI}/categorias/${id}`, {params: id, observe: 'response' })
  }
}
