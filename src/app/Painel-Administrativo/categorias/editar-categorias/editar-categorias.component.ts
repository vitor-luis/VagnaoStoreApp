import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categorias } from 'src/app/commum/model/categorias.model';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent implements OnInit {

  private httpReq: Subscription
  public categoriasForm: FormGroup

  categorias: Categorias = null
  statusResponse: number
  messageApi: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: CategoriasService,
    private router: Router,
    private _toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.initForm()
  }

  ngOnInit(): void {
    if (variaveisGlobais.idAdm == null) {
      this.router.navigate(['/login'])
    } else {
      const id = this.activatedRoute.snapshot.params['id']

      this.getCategorias(id)
    }
  }

  initForm() {
    this.categoriasForm = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],

    })
  }

  getCategorias(id: number) {
    this.httpReq = this.service.getCategoria(id).subscribe(response => {
      this.messageApi = response.body['message']
      this.categorias = response.body.data[0]
      console.log(this.categorias)
      this.populateForm()
    }, err => {
      this.statusResponse = err.status
      this.messageApi = err.error['message']
    })
  }

  populateForm() {
    this.categoriasForm.patchValue({
      id: this.categorias.id,
      nome: this.categorias.nome,
      descricao: this.categorias.descricao,
    })
  }

  onSubmit() {

    this.httpReq = this.service.updateCategorias(this.categoriasForm.value, this.categoriasForm.value.id).subscribe(res => {
      this.categoriasForm.reset()
      this.router.navigate(['/administrativo/categorias'])
      this.showToastrSuccess()
    }, err => {
      this.categoriasForm.reset()
      this.router.navigate(['/administrativo/categorias'])
      this.showToastrError()
    })
  }

  showToastrSuccess() {
    this._toastr.success('Edição realizado com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this._toastr.error('Houve um erro na edição da categoria. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }


  get nome() { return this.categoriasForm.get('nome') }
  get descricao() { return this.categoriasForm.get('descricao') }
}
