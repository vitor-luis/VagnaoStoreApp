import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorias } from 'src/app/commum/model/categorias.model'
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { ModalDialogComponent } from 'src/app/commum/modals/modal-dialog/modal-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';
import { ProdutoService } from 'src/app/commum/service/produto.service';


@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {

  private httpReq: Subscription

  categorias: Categorias[] = null
  statusResponse: number
  messageApi: string
  modalRef: BsModalRef

  constructor(
    private service: CategoriasService,
    private produtoService: ProdutoService,
    private router: Router,
    private toastr: ToastrService,
    private modal: BsModalService
  ) { }

  ngOnInit(): void {
    if (variaveisGlobais.idAdm == null) {
      this.router.navigate(['/login'])
    } else {
      this.getAllCategorias()
    }
  }

  getAllCategorias() {
    this.httpReq = this.service.getAllCategorias().subscribe(response => {
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      this.categorias = response.body['data']
    })
  }

  canDelete(nome: string, id: number) {
    const initialState = { message: `Deseja excluir a categoria "${nome}" ?` }
    this.modalRef = this.modal.show(ModalDialogComponent, { initialState })

    this.modalRef.content.action.subscribe((answer) => {
      if (answer == true) {
        this.httpReq = this.produtoService.getProdutosPorCategoria(id).pipe().subscribe(res => {
          if (res.body['data'].length > 0) {
            this.modalRef.hide()
            this.showToastrErrorDeleteProduto()
            this.getAllCategorias()
          } else {

            this.service.deleteCategorias(id).subscribe(response => {
              this.modalRef.hide()
              this.showToastrSuccess()
              this.getAllCategorias()
              this.getAllCategorias()
            }, err => {
              this.modalRef.hide()
              this.showToastrError()
              this.getAllCategorias()
            })
          }
        }, err => {
          this.modalRef.hide()
          this.showToastrError()
          this.router.navigate(['/administrativo/categorias'])
        })
      } else {
        this.modalRef.hide()
      }
    })
  }


  showToastrSuccess() {
    this.toastr.success('Categoria foi excluida com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this.toastr.error('Houve um erro ao excluir a categoria. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrErrorDeleteProduto() {
    this.toastr.error('Não foi possível excluir a categoria há algum produto relacionado a ela. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }
}
