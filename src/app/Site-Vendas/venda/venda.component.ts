import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/commum/model/cliente.model';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';
import { EnderecoEntregaService } from 'src/app/commum/service/endereco-entrega.service';
import { Subscription } from 'rxjs';
import { EnderecoEntrega } from 'src/app/commum/model/enderecoEntrega.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VendasService } from 'src/app/commum/service/vendas.service';
import { Vendas } from 'src/app/commum/model/vendas.model';
import { ToastrService } from 'ngx-toastr';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  private httpReq: Subscription
  public enderecoForm: FormGroup
  public vendaForm: FormGroup

  vendaId: number = null
  idLogin: number = null
  cliente: Cliente
  enderecos: EnderecoEntrega[] = null
  venda: Vendas = null
  

  constructor(
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: EnderecoEntregaService,
    private vendaService: VendasService,
    private router: Router,
    private toastr: ToastrService,
    private _validateBrService: ValidateBrService
  ) { }

  ngOnInit(): void {
    this.vendaId = this._activatedRoute.snapshot.params['id']

    this.getDadosVenda(this.vendaId)
    
    if (variaveisGlobais.idlogin != null) {
      this.idLogin = variaveisGlobais.idlogin
      this.cliente = variaveisGlobais.cliente[0]
    }
    this.iniciaForm()
  }

  getEnderecos(){
    this.httpReq = this.service.getEnderecoEntregaPorCliente(this.cliente.id).pipe().subscribe(res =>{
      if(res.body['data'].length > 0){
        this.enderecos = res.body['data']
      }else{
        this.enderecos = null
      }      
    }, err =>{

    })
  }

  iniciaForm(){
    this.enderecoForm = this.formBuilder.group({
      rua: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(400)]],
      numero: ['', [Validators.required, Validators.maxLength(5)]],
      bairro: ['', [Validators.required, Validators.maxLength(400)]],
      cidade: ['', [Validators.required, Validators.maxLength(50)]],
      estado: ['', [Validators.required, Validators.maxLength(2)]],
      cep: ['', [Validators.required, Validators.maxLength(50)]],
      complemento: ['', [Validators.maxLength(1000)]],
      idCliente: [0, [Validators.required]]
    }),

    this.vendaForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      total: ['', [Validators.required]],
      data: ['', [Validators.required]],
      efetuada: [1, [Validators.required]],
      idEnderecoVenda: ['', [Validators.required]]
    })

    this.getEnderecos()
  }

  onSubmit(){
    this.enderecoForm.value.idCliente = this.cliente.id
    this.httpReq = this.service.postEnderecoEntrega(this.enderecoForm.value).pipe().subscribe(response =>{
      this.enderecoForm.reset()
      this.getEnderecos()
    }, err =>{
      this.enderecoForm.reset()
    })
  }

  getDadosVenda(vendaId){
    this.httpReq = this.vendaService.getVenda(vendaId).pipe().subscribe(res =>{
      this.venda = res.body['date'][0]
    })
  }

  efetuarVenda(){
    this.vendaForm.value.id = this.vendaId
    this.vendaForm.value.data = new Date()
    this.vendaForm.value.total = this.venda.total
    this.vendaForm.value.efetuada = 1
    this.httpReq = this.vendaService.updateVenda(this.vendaId, this.vendaForm.value).subscribe(res =>{
      this.vendaForm.reset()
      this.showToastrSuccess()
      this.router.navigate([''])
      variaveisGlobais.idVenda = null
      variaveisGlobais.quantidade = 0
    }, err =>{
      this.vendaForm.reset()
      this.router.navigate([''])
      this.showToastrError()
    })
  }

  addEndereco(){
    this.enderecos = null
  }

  showToastrSuccess() {
    this.toastr.success('Compra efetuada com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this.toastr.error('Erro ao efetuar a compra. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  get rua() { return this.enderecoForm.get('rua') }
  get numero() { return this.enderecoForm.get('numero') }
  get bairro() { return this.enderecoForm.get('bairro') }
  get cidade() { return this.enderecoForm.get('cidade') }
  get estado() { return this.enderecoForm.get('estado') }
  get cep() { return this.enderecoForm.get('cep') }
  get complemento() { return this.enderecoForm.get('complemento') }
  get idCliente() { return this.enderecoForm.get('idCliente') }
}
