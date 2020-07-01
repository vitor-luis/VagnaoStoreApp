import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/commum/service/usuarios.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/commum/model/cliente.model';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDialogComponent } from 'src/app/commum/modals/modal-dialog/modal-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  private httpReq: Subscription

  login: Cliente[] = null
  statusResponse: number
  messageApi: string
  modalRef: BsModalRef

  constructor(
    private service: UsuariosService,
    private router: Router,
    private toastr: ToastrService,
    private modal: BsModalService
  ) { }

  ngOnInit(): void {
    if (variaveisGlobais.idAdm == null) {
      this.router.navigate(['/login'])
    } else {
      this.getAllUsuarios()
    }
  }

  getAllUsuarios() {
    this.httpReq = this.service.getAllUsuarios().subscribe(response => {
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      this.login = response.body['data']
    })
  }

  canDelete(nome: string, idUsuario: number, idLogin: number) {
    const initialState = { message: `Deseja excluir o login de ${nome} ?` }
    this.modalRef = this.modal.show(ModalDialogComponent, { initialState })


    this.modalRef.content.action.subscribe((answer) => {
      this.service.deleteCliente(idUsuario).subscribe(response => {
        this.service.deleteLogin(idLogin).subscribe(response => {
          this.getAllUsuarios();
          this.modalRef.hide()
          this.showToastrSuccess()
        }, err => {
          this.getAllUsuarios()
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
