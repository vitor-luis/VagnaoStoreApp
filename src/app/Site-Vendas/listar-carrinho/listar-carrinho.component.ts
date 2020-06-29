import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';
import { Cliente } from 'src/app/commum/model/cliente.model';
import { ItemVenda } from 'src/app/commum/model/itemVenda.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ItemVendaService } from 'src/app/commum/service/item-venda.service';
import { ProdutoItemVenda } from 'src/app/commum/model/produtoItemVenda';
import { element } from 'protractor';

@Component({
  selector: 'app-listar-carrinho',
  templateUrl: './listar-carrinho.component.html',
  styleUrls: ['./listar-carrinho.component.css']
})
export class ListarCarrinhoComponent implements OnInit {
  private httpReq: Subscription
  public itemVendaForm: FormGroup
  
  idLogin: number = null
  cliente: Cliente = null
  itensVenda: ProdutoItemVenda[]
  totalCompra: number
  vendaId: number

  constructor(
    private _activatedRoute: ActivatedRoute,
    private service: ItemVendaService,
    private ItemVendaService: ItemVendaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.vendaId = this._activatedRoute.snapshot.params['id']
    this.iniciaForm()
    if(this.vendaId ==null){
      this.router.navigate['']
    }

    if(variaveisGlobais.idlogin != null){
      this.idLogin = variaveisGlobais.idlogin
      this.cliente = variaveisGlobais.cliente
    }
    
    this.getItensVenda(this.vendaId)
  }

  getItensVenda(vendaId: number){
    this.itensVenda = null
    this.httpReq = this.service.getProdutosDeUmaVenda(vendaId).pipe().subscribe(res =>{
      this.itensVenda = res.body['data']
      this.calcularTotal()
    })
  }

  adicionarProduto(itemVenda:ProdutoItemVenda){
    this.itemVendaForm.value.id = itemVenda.id
    this.itemVendaForm.value.idProduto = itemVenda.idProduto
    this.itemVendaForm.value.idVenda = itemVenda.idVenda
    this.itemVendaForm.value.quantidade = itemVenda.quantidade + 1
    this.itemVendaForm.value.total = itemVenda.preco * this.itemVendaForm.value.quantidade

    this.httpReq = this.ItemVendaService.updateItemVenda(itemVenda.id,this.itemVendaForm.value).subscribe(res=>{
      this.showToastrSuccess()
      this.itemVendaForm.reset()
      this.getItensVenda(this.vendaId)
    }, err =>{
      this.showToastrError()
      this.itemVendaForm.reset()
    })
  }

  retirarProduto(itemVenda:ProdutoItemVenda){
    this.itemVendaForm.value.id = itemVenda.id
    this.itemVendaForm.value.idProduto = itemVenda.idProduto
    this.itemVendaForm.value.idVenda = itemVenda.idVenda
    this.itemVendaForm.value.quantidade = itemVenda.quantidade - 1
    this.itemVendaForm.value.total = itemVenda.preco * this.itemVendaForm.value.quantidade

    this.httpReq = this.ItemVendaService.updateItemVenda(itemVenda.id,this.itemVendaForm.value).subscribe(res=>{
      this.showToastrSuccessRetirar()
      this.itemVendaForm.reset()
      this.getItensVenda(this.vendaId)
    }, err =>{
      this.showToastrErrorRetirar()
      this.itemVendaForm.reset()
    })
  }

  calcularTotal(){
    this.totalCompra = 0
    this.itensVenda.forEach(element =>{
      this.totalCompra = this.totalCompra + element.total
    })
  }

  iniciaForm(){
    this.itemVendaForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      idProduto: ['', [Validators.required]],
      idVenda: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      total: ['', [Validators.required]]
    })
  }

  showToastrSuccess() {
    this.toastr.success('Produto adicionado com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this.toastr.error('Erro ao adicionar quantidade. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrSuccessRetirar() {
    this.toastr.success('Quantidade retirada com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrErrorRetirar() {
    this.toastr.error('Erro ao retirar a quantidade. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }
}
