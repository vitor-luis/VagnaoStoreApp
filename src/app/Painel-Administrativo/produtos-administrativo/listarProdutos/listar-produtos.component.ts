import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoService } from './../../../commum/service/produto.service';
import { Produto } from './../../../commum/model/produtos.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  private httpReq: Subscription
  public produtoForm: FormGroup

  
  produto: Produto[] = null
  statusResponse: number
  messageApi: string

  constructor(
    private service: ProdutoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllProdutos()
    console.log(this.produto);
  }

  getAllProdutos(){
    this.httpReq = this.service.getAllProdutos().subscribe(response =>{
      this.messageApi = response.body['message']
      this.produto = response.body['data']
      
      
    })
    return this.produto;
  }


  deleteProdutos(produto: Produto) {
    this.service.deleteProdutos(produto).subscribe(() => {
      this.getAllProdutos();
    });
  }

  

}
