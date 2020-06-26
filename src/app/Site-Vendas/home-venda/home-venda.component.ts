import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/commum/model/produtos.model';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ProdutoService } from 'src/app/commum/service/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-venda',
  templateUrl: './home-venda.component.html',
  styleUrls: ['./home-venda.component.css']
})
export class HomeVendaComponent implements OnInit {

  private httpReq: Subscription
  public produtoForm: FormGroup

  
  produtos: Produto[] = null
  statusResponse: number
  messageApi: string

  constructor(
    private service: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProdutos()
  }

  getAllProdutos(){
    this.httpReq = this.service.getAllProdutos().subscribe(response =>{
      this.messageApi = response.body['message']
      this.produtos = response.body['data']
    })
  }

}
