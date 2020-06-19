
import { Produto } from './../../../commum/model/produtos.model';
import { ProdutoService } from '../../../commum/service/produto.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  
  private httpReq: Subscription
  public produtoForm: FormGroup

  produto: Produto = null
  statusResponse: number
  messageApi: string

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutoService,
    private router: Router,
    private _toastr: ToastrService
  ) {

  }

  
  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
      nome: this.formBuilder.control(''),
      descricao: this.formBuilder.control(''),
      preco: this.formBuilder.control(''),
      quantidadeEstoque: this.formBuilder.control(''),      
      urlImagem: this.formBuilder.control(''),
      idCategoria: this.formBuilder.control('')
    })
  }


  


  onSubmit() {
    this.httpReq = this.service.postProdutos(this.produtoForm.value).subscribe(res =>{
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
