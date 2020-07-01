import { VendasService } from './../../../commum/service/vendas.service';
import { Vendas } from './../../../commum/model/vendas.model';
import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css']
})
export class ListarVendasComponent implements OnInit {
  private httpReq: Subscription
  public produtoForm: FormGroup


  venda: Vendas[] = null
  statusResponse: number
  messageApi: string

  constructor(
    private service: VendasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (variaveisGlobais.idAdm == null) {
      this.router.navigate(['/login'])
    } else {
      this.getAllVendas()
    }
  }



  getAllVendas() {
    this.httpReq = this.service.getAllVendas().subscribe(response => {
      this.messageApi = response.body['message']
      this.venda = response.body['data']


    })
    return this.venda;
  }




}
