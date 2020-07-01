import { NgxMaskModule } from 'ngx-mask';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../../../commum/service/produto.service';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { Produto } from './../../../commum/model/produtos.model';
import { Categorias } from 'src/app/commum/model/categorias.model';
import { ValidateBrService } from 'angular-validate-br';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {


  private httpReq: Subscription
  public produtoForm: FormGroup


  produto: Produto = null
  categorias: Categorias[] = null
  statusResponse: number
  messageApi: string
  mask: string

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutoService,
    private serviceC: CategoriasService,
    private router: Router,
    private _toastr: ToastrService,
    private _validateBrService: ValidateBrService

  ) { }

  ngOnInit(): void {
    if (variaveisGlobais.idAdm == null) {
      this.router.navigate(['/login'])
    } else {
      this.getAllCategorias()


      this.produtoForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        descricao: ['', [Validators.required, Validators.maxLength(250)]],
        preco: ['', [Validators.required]],
        quantidadeEstoque: ['', [Validators.required, Validators.maxLength(11)]],
        urlImagem: ['', [Validators.required, Validators.maxLength(1000)]],
        idCategoria: ['', [Validators.required]]
      })
    }
  }

  getAllCategorias() {
    this.httpReq = this.serviceC.getAllCategorias().subscribe(response => {
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      this.categorias = response.body['data']
    })
  }

  onSubmit() {
    this.httpReq = this.service.postProdutos(this.produtoForm.value).subscribe(res => {
      this.produtoForm.reset()
      this.router.navigate(['/administrativo/produtos'])
      this.showToastrSuccess()
    }, err => {
      this.produtoForm.reset()
      this.router.navigate(['/administrativo/produtos'])
      this.showToastrError()
    })
  }

  showToastrSuccess() {
    this._toastr.success('Cadastro de produtos realizado com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this._toastr.error('Houve um erro ao efetuar o cadastro de produtos. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  get nome() { return this.produtoForm.get('nome') }
  get descricao() { return this.produtoForm.get('descricao') }
  get preco() { return this.produtoForm.get('preco') }
  get quantidadeEstoque() { return this.produtoForm.get('quantidadeEstoque') }
  get urlImagem() { return this.produtoForm.get('urlImagem') }
  get idCategoria() { return this.produtoForm.get('idCategoria') }
}
