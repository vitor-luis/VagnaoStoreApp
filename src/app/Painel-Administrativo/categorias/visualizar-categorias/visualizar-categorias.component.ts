import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Categorias } from 'src/app/commum/model/categorias.model';
import { ModalDialogComponent } from 'src/app/commum/modals/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-visualizar-categorias',
  templateUrl: './visualizar-categorias.component.html',
  styleUrls: ['./visualizar-categorias.component.css']
})
export class VisualizarCategoriasComponent implements OnInit {
  private httpReq: Subscription

categorias: Categorias
messageApi: string
statusResponse: number
modalRef: BsModalRef

  constructor(
    private service: CategoriasService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modal: BsModalService
  ) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.params['id']

    this.getCategoria(id)
  }

  getCategoria(id: number){
       this.httpReq = this.service.getCategoria(id).subscribe(response =>{
       this.messageApi = response.body['message']
       this.categorias = response.body['data'][0];
       
     }, err=>{
       this.statusResponse =err.status
       this.messageApi= err.error['message']
   })
  }

  canDelete(nome: string, id:number) {
    const initialState = { message: `Deseja excluir a categoria "${nome}" ?` }
    this.modalRef = this.modal.show(ModalDialogComponent, { initialState })
    
    
    this.modalRef.content.action.subscribe((answer) => {
      
      if(answer ==true){
      this.service.deleteCategorias(id).subscribe(response => {

                this.modalRef.hide()
          this.showToastrSuccess()
          this.router.navigate(['/administrativo/categorias'])
  
        }, err => { 
          
          this.modalRef.hide()
          this.showToastrError()
          this.router.navigate(['/administrativo/categorias'])
        })
      }else{
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
}

