import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { ProdutoService } from 'src/app/commum/service/produto.service';
import { Produto } from 'src/app/commum/model/produtos.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-produto-por-categoria',
  templateUrl: './listar-produto-por-categoria.component.html',
  styleUrls: ['./listar-produto-por-categoria.component.css']
})
export class ListarProdutoPorCategoriaComponent implements OnInit {

  private httpReq: Subscription

  produtos: Produto
  messageApi: string

  constructor(
    private service: ProdutoService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    const idCategoria = this._activatedRoute.snapshot.params['id']

    this.getProdutosPorCategoria(idCategoria)
    
  }

  getProdutosPorCategoria(idCategoria: number){
    this.httpReq = this.service.getProdutosPorCategoria(idCategoria).subscribe(response =>{
      this.messageApi = response.body['message']
      this.produtos = response.body['data']
    })
  }

}
