import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/commum/model/cliente.model';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';
import { EnderecoEntregaService } from 'src/app/commum/service/endereco-entrega.service';
import { Subscription } from 'rxjs';
import { EnderecoEntrega } from 'src/app/commum/model/enderecoEntrega.model';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  private httpReq: Subscription

  vendaId: number = null
  idLogin: number = null
  cliente
  enderecos: EnderecoEntrega[] = null

  constructor(
    private _activatedRoute: ActivatedRoute,
    private service: EnderecoEntregaService
  ) { }

  ngOnInit(): void {
    this.vendaId = this._activatedRoute.snapshot.params['id']
    
    console.log(variaveisGlobais.cliente)

    // if (variaveisGlobais.idlogin != null && variaveisGlobais.cliente != null) {
    //   this.idLogin = variaveisGlobais.idlogin
    //   this.cliente = variaveisGlobais.cliente
    // }

    // this.getEnderecos()

  }

  getEnderecos(){
    this.httpReq = this.service.getEnderecoEntregaPorCliente(variaveisGlobais.cliente.id).pipe().subscribe(res =>{
      if(res.body['data'].length > 0){
        this.enderecos = res.body['data']
      }
    }, err =>{

    })
  }

}
