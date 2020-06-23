import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorias } from 'src/app/commum/model/categorias.model';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {

  private httpReq: Subscription

  categorias: Categorias[] = null
  statusResponse: number
  messageApi: string

  constructor(
    private service: CategoriasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCategorias()
  }

  getAllCategorias(){
    this.httpReq = this.service.getAllCategorias().subscribe(response =>{
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      this.categorias = response.body['data']
    })
  }
}
