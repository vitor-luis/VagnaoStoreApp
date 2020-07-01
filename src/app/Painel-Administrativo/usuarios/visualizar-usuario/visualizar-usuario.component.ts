import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientesService } from 'src/app/commum/service/clientes.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/commum/model/cliente.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDialogComponent } from 'src/app/commum/modals/modal-dialog/modal-dialog.component';
import { LoginService } from 'src/app/commum/service/login.service';
import { UsuariosService } from 'src/app/commum/service/usuarios.service';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.css']
})
export class VisualizarUsuarioComponent implements OnInit {

  private httpReq: Subscription

  usuario: Cliente
  messageApi: string
  statusResponse: number
  modalRef: BsModalRef

  constructor(
    private service: ClientesService,
    private _service: UsuariosService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modal: BsModalService
  ) {

  }

  ngOnInit(): void {
    if (variaveisGlobais.idAdm == null) {
      this.router.navigate(['/login'])
    } else {
      const email = this._activatedRoute.snapshot.params['email']

      this.getUsuario(email)
    }
  }

  getUsuario(email: string) {
    this.httpReq = this.service.getCliente(email).subscribe(res => {
      this.statusResponse = res.body['message']
      this.usuario = res.body.data[0]
    }, err => {
      this.messageApi = err.error['message']
    })
  }

  canDelete(nome: string, idUsuario: number, idLogin: number) {
    const initialState = { message: `Deseja excluir o login de ${nome} ?` }
    this.modalRef = this.modal.show(ModalDialogComponent, { initialState })


    this.modalRef.content.action.subscribe((answer) => {
      this._service.deleteCliente(idUsuario).subscribe(response => {
        this._service.deleteLogin(idLogin).subscribe(response => {
          this.router.navigate(['/administrativo/usuarios'])
          this.modalRef.hide()
          this.showToastrSuccess()
        }, err => {
          this.router.navigate(['/administrativo/usuarios'])
          this.modalRef.hide()
          this.showToastrError()
        })
      })
    })
  }

  showToastrSuccess() {
    this.toastr.success('Usuário foi excluido com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this.toastr.error('Houve um erro ao excluir o usuário. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }
}
