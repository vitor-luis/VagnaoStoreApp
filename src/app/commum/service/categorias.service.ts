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

  getCategoria(id:number): Observable<HttpResponse<Categorias>>{
    return this.http.get<Categorias>(`${VagnaoAPI}/categorias/${id}`, { observe: 'response' })
  
  }
}
