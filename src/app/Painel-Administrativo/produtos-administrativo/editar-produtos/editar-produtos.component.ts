import { Produto } from './../../../commum/model/produtos.model';
import { ProdutoService } from '../../../commum/service/produto.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {

  private httpReq: Subscription
  public produtoForm: FormGroup
  public Id ;
  public valor: number;

  
  produto: Produto = null
  statusResponse: number
  messageApi: string

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutoService,
    private router: Router,
    private _toastr: ToastrService,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(params => this.Id = params['id']);
       
  }

  
  ngOnInit(): void {

this.getProduto(this.Id)

this.produtoForm = this.formBuilder.group({
  
  nome: this.formBuilder.control(''),
  descricao: this.formBuilder.control(''),
  preco: this.formBuilder.control(''),
  quantidadeEstoque: this.formBuilder.control(''),      
  urlImagem: this.formBuilder.control(''),
  idCategoria: this.formBuilder.control('')
})
  }


 
   getProduto(produto:Produto){
    this.httpReq = this.service.getProduto(this.Id).subscribe(response =>{
      this.messageApi = response.body['message']
      produto = response.body['data']
      console.log(produto)
    
       
    })
  }
  
  updateProdutos() {
//arrumar
    this.httpReq = this.service.updateProdutos(this.Id,this.produto).subscribe(res =>{
      this.produtoForm.reset()
      this.router.navigate(['/administrativo/produtos'])
      this.showToastrSuccess()
    }, err =>{
      this.produtoForm.reset()
      this.router.navigate(['/administrativo/produtos'])
      this.showToastrError()
    })
  }

  
  showToastrSuccess() {
    this._toastr.success('Cadastro realizado com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this._toastr.error('Houve um erro ao efetuar o cadastro. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }



    
  }

