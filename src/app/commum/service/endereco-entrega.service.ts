import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { EnderecoEntrega } from '../model/enderecoEntrega.model';
import { VagnaoAPI } from 'src/app.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoEntregaService {

  constructor(private http: HttpClient) { }

  params = new HttpParams()

  getEnderecoEntregaPorCliente(id: number) : Observable<HttpResponse<any>>{
    return this.http.get<EnderecoEntrega[]>(`${VagnaoAPI}/enderecoEntregas/${id}`, { observe: 'response' })
  }

  postEnderecoEntrega(form: EnderecoEntrega): Observable<HttpResponse<any>> {
    console.log(form)
    return this.http.post<EnderecoEntrega>(`${VagnaoAPI}/enderecoEntregas/`, form, { observe: 'response' })
  }

}
