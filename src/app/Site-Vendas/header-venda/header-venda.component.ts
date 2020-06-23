import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categorias } from 'src/app/commum/model/categorias.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriasService } from 'src/app/commum/service/categorias.service';

@Component({
  selector: 'app-header-venda',
  templateUrl: './header-venda.component.html',
  styleUrls: ['./header-venda.component.css']
})
export class HeaderVendaComponent implements OnInit {

  private httpReq: Subscription

  categorias: Categorias[] = null
  statusResponse: number
  messageApi: string
  modalRef: BsModalRef

  constructor(
    private service: CategoriasService
  ) { }

  ngOnInit(): void {
    this.getCategoriasParaMenu()
  }

  getCategoriasParaMenu(){
    this.httpReq = this.service.getAllCategorias().subscribe(response => {
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      console.log(response.body['data'])
      this.categorias = response.body['data']
    })
  }

}
