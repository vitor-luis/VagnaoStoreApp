
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnderecoEntregaService } from 'src/app/commum/service/endereco-entrega.service';
import { VendasService } from './../../../commum/service/vendas.service';
import { EnderecoEntrega } from 'src/app/commum/model/enderecoEntrega.model';
import { Vendas } from './../../../commum/model/vendas.model';
import { VendaComEndereco } from 'src/app/commum/model/vendaComEndereco.mode';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';


@Component({
  selector: 'app-visualizar-vendas',
  templateUrl: './visualizar-vendas.component.html',
  styleUrls: ['./visualizar-vendas.component.css']
})
export class VisualizarVendasComponent implements OnInit {

  private httpReq: Subscription

  venda: VendaComEndereco
  messageApi: string
  statusResponse: number

  constructor(
    private service: VendasService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    if (variaveisGlobais.idAdm == null) {
      this.router.navigate(['/login'])
    } else {
      const id = this._activatedRoute.snapshot.params['id']

      this.getVenda(id)
    }
  }

  getVenda(id: number) {
    this.httpReq = this.service.getVendaComEnderecoEntrega(id).pipe().subscribe(res => {
      this.statusResponse = res.body['message']
      this.venda = res.body['date'][0]
    }, err => {
      this.messageApi = err.error['message']
    })
  }

}
