
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnderecoEntregaService } from 'src/app/commum/service/endereco-entrega.service';
import { VendasService } from './../../../commum/service/vendas.service';
import { EnderecoEntrega } from 'src/app/commum/model/enderecoEntrega.model';
import { Vendas } from './../../../commum/model/vendas.model';


@Component({
  selector: 'app-visualizar-vendas',
  templateUrl: './visualizar-vendas.component.html',
  styleUrls: ['./visualizar-vendas.component.css']
})
export class VisualizarVendasComponent implements OnInit {

  private httpReq: Subscription

  //enderecoEntrega: EnderecoEntrega = null
  venda: Vendas
  messageApi: string
  statusResponse: number

  constructor(
    private service: VendasService,
    //private serviceE: EnderecoEntrega,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    
  }
  
  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.params['id']
  
    this.getVenda(id)
  }
  
  getVenda(id: number){
    this.httpReq = this.service.getVenda(id).subscribe(res => {
      this.statusResponse = res.body['message']
      this.venda = res.body.data[0]
     
      //getidusuario, endereçoentrega
    }, err =>{
      this.messageApi = err.error['message']
    })
  }
  
  }
