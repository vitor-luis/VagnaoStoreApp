import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categorias } from 'src/app/commum/model/categorias.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { Router } from '@angular/router';
import { Produto } from 'src/app/commum/model/produtos.model';
import { ProdutoService } from 'src/app/commum/service/produto.service';

@Component({
  selector: 'app-header-venda',
  templateUrl: './header-venda.component.html',
  styleUrls: ['./header-venda.component.css']
})
export class HeaderVendaComponent implements OnInit {

  private httpReq: Subscription

  categorias: Categorias[] = null
  produtos: Produto[]
  statusResponse: number
  messageApi: string
  modalRef: BsModalRef

  constructor(
    private service: CategoriasService,
    private _service: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategoriasParaMenu()
    this.getAllProdutos()
  }

  getCategoriasParaMenu(){
    this.httpReq = this.service.getAllCategorias().subscribe(response => {
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      this.categorias = response.body['data']
    })
  }

  direcionar(idCategoria: number){
    if(idCategoria == null){
      this.getAllProdutos()
    }else{
      this.getProdutosPorCategoria(idCategoria)
    }
    // this.router.navigate(['/listar', idCategoria])
  }

  getAllProdutos(){
    this.httpReq = this._service.getAllProdutos().subscribe(response =>{
      this.messageApi = response.body['message']
      this.produtos = response.body['data']
    })
  }

  getProdutosPorCategoria(idCategoria: number){
    this.httpReq = this._service.getProdutosPorCategoria(idCategoria).subscribe(response =>{
      this.messageApi = response.body['message']
      this.produtos = response.body['data']
    })
  }

}
