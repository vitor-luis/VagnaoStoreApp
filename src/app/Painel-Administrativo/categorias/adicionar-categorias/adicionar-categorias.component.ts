import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adicionar-categorias',
  templateUrl: './adicionar-categorias.component.html',
  styleUrls: ['./adicionar-categorias.component.css']
})
export class AdicionarCategoriasComponent implements OnInit {

  private httpReq: Subscription
  public categoriasForm: FormGroup

  


  constructor(
    private formBuilder: FormBuilder,
    private service: CategoriasService,
    private router: Router,
    private _toastr: ToastrService
    
  ) { }

  ngOnInit(): void {
    this.categoriasForm = this.formBuilder.group({
      nome:  ['', [Validators.required]],
      descricao:  ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.httpReq = this.service.postCategorias(this.categoriasForm.value).subscribe(res =>{
      this.categoriasForm.reset()
      this.router.navigate(['/administrativo/categorias'])
      this.showToastrSuccess()
    }, err =>{
      this.categoriasForm.reset()
      this.router.navigate(['/administrativo/categorias'])
      this.showToastrError()
    })
  }

  showToastrSuccess() {
    this._toastr.success('Categoria adicionada com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this._toastr.error('Houve um erro ao efetuar o cadastro. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

}
