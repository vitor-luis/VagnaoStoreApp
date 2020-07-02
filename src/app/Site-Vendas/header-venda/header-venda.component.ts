import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categorias } from 'src/app/commum/model/categorias.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/commum/model/produtos.model';
import { ProdutoService } from 'src/app/commum/service/produto.service';
import { VendasService } from 'src/app/commum/service/vendas.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ItemVendaService } from 'src/app/commum/service/item-venda.service';
import { ItemVenda } from 'src/app/commum/model/itemVenda.model';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from 'src/app/commum/login/login.component';
import { AppComponent } from 'src/app/app.component';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';
import { Cliente } from 'src/app/commum/model/cliente.model';

@Component({
  selector: 'app-header-venda',
  templateUrl: './header-venda.component.html',
  styleUrls: ['./header-venda.component.css']
})

export class HeaderVendaComponent implements OnInit {

  private httpReq: Subscription
  public vendaForm: FormGroup
  public itemVendaForm: FormGroup

  categorias: Categorias[] = null
  produtos: Produto[]
  itensVenda: ItemVenda[]
  itemVenda: ItemVenda
  statusResponse: number
  messageApi: string
  modalRef: BsModalRef
  quantidadeItens: number = null
  vendaId: number = null
  idLogin: number
  cliente: Cliente
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: CategoriasService,
    private _service: ProdutoService,
    private serviceVenda: VendasService,
    private ItemVendaService: ItemVendaService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.vendaId = variaveisGlobais.idVenda
    this.quantidadeItens = variaveisGlobais.quantidade
    if(variaveisGlobais.idlogin != null){
      this.idLogin = variaveisGlobais.idlogin
      this.cliente = variaveisGlobais.cliente[0]
    }
    this.iniciaFormVenda()
    this.getCategoriasParaMenu()
    this.getAllProdutos()
  }

  getCategoriasParaMenu() {
    this.httpReq = this.service.getAllCategoriasMenu().subscribe(response => {
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      this.categorias = response.body['data']
    })
  }

  direcionar(idCategoria: number) {
    if (idCategoria == null) {
      this.getAllProdutos()
    } else {
      this.getProdutosPorCategoria(idCategoria)
    }
  }

  getAllProdutos() {
    this.httpReq = this._service.getAllProdutos().subscribe(response => {
      this.messageApi = response.body['message']
      this.produtos = response.body['data']
    })
  }

  getProdutosPorCategoria(idCategoria: number) {
    this.httpReq = this._service.getProdutosPorCategoria(idCategoria).subscribe(response => {
      this.messageApi = response.body['message']
      this.produtos = response.body['data']
    })
  }

  adicionarCarrinho(produto: Produto) {
    if (this.vendaForm.value.id == null) {
      this.vendaForm.value.total = produto.preco
      this.vendaForm.value.data = new Date
      this.vendaForm.value.efetuada = 0
      this.httpReq = this.serviceVenda.postVenda(this.vendaForm.value).pipe().subscribe(res => {
        this.vendaForm.value.id = res.body['data']
        this.vendaId = this.vendaForm.value.id
        variaveisGlobais.idVenda = this.vendaForm.value.id
        this.adicionarItemVenda(produto)
      }, err => {
        this.vendaForm.reset()
        this.showToastrError
      })
    } else {
      let itemJaAdicionado
      this.httpReq = this.ItemVendaService.getItensDeUmaVenda(this.vendaForm.value.id).pipe().subscribe(res => {
        this.itensVenda = res.body['data']
        res.body['data'].forEach(element => {
          if (element.idProduto == produto.id) {
            itemJaAdicionado = true
            this.itemVenda = element
          }
        });
        if (itemJaAdicionado == true) {
          this.updateItemVenda(produto)
        } else {
          this.adicionarItemVenda(produto)
        }
      }, err => {
        this.showToastrError
      })
    }
  }

  updateItemVenda(produto: Produto) {
    this.itemVendaForm.value.id = this.itemVenda.id
    this.itemVendaForm.value.idProduto = this.itemVenda.idProduto
    this.itemVendaForm.value.idVenda = this.itemVenda.idVenda
    this.itemVendaForm.value.quantidade = this.itemVenda.quantidade + 1
    this.itemVendaForm.value.total = produto.preco * this.itemVendaForm.value.quantidade

    this.httpReq = this.ItemVendaService.updateItemVenda(this.itemVenda.id,this.itemVendaForm.value).subscribe(res=>{
      this.showToastrSuccess
      this.quantidadeItens++;
      variaveisGlobais.quantidade++;
    }, err =>{
      this.showToastrError
    })
  }

  adicionarItemVenda(produto: Produto) {
    this.itemVendaForm.value.idProduto = produto.id
    this.itemVendaForm.value.idVenda = this.vendaForm.value.id
    this.itemVendaForm.value.quantidade = 1
    this.itemVendaForm.value.total = produto.preco * this.itemVendaForm.value.quantidade

    this.httpReq = this.ItemVendaService.postItemVenda(this.itemVendaForm.value).subscribe(res => {
      this.itemVendaForm.reset()
      this.quantidadeItens++;
      variaveisGlobais.quantidade++;
      this.showToastrSuccess
    }, err => {
      this.itemVendaForm.reset()
      this.showToastrError
    })
  }

  iniciaFormVenda() {
    this.vendaForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      total: [''],
      data: ['', [Validators.required]],
      efetuada: ['']
    })

    this.itemVendaForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      idProduto: ['', [Validators.required]],
      idVenda: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      total: ['', [Validators.required]]
    })
  }

  logout(){
    variaveisGlobais.idlogin = null
    variaveisGlobais.cliente = null
    this.idLogin = null
    this.cliente = null
  }

  showToastrSuccess() {
    this.toastr.success('Produto adicionado ao carrinho com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this.toastr.error('Erro ao adicionar Produto. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }
}
