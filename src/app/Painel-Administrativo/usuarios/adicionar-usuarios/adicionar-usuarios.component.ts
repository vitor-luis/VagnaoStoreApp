import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/commum/service/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/commum/service/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from 'src/app/commum/model/login.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adicionar-usuarios',
  templateUrl: './adicionar-usuarios.component.html',
  styleUrls: ['./adicionar-usuarios.component.css']
})
export class AdicionarUsuariosComponent implements OnInit {

  
  private httpReq: Subscription
  public loginForm: FormGroup
  public clienteForm: FormGroup

  login: Login = null
  statusResponse: number
  messageApi: string

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
    private _toastr: ToastrService,
    private serviceCliente: ClientesService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control(''),
      senha: this.formBuilder.control(''),
      isAdmin: this.formBuilder.control(1)
    })
    this.clienteForm = this.formBuilder.group({
      nome: this.formBuilder.control(''),
      cpf: this.formBuilder.control(''),
      dataNascimento: this.formBuilder.control(''),
      idLogin: this.formBuilder.control(0)
    })
  }

  onSubmit() {
    this.httpReq = this.service.postLogin(this.loginForm.value).subscribe(res =>{
      this.loginForm.reset()
      this.clienteForm.value.idLogin = res.body['data']
      this.postCliente()
    }, err =>{
      this.loginForm.reset()
      this.router.navigate(['/administrativo/usuarios'])
      this.showToastrError()
    })
  }

  postCliente(){
    this.httpReq = this.serviceCliente.postCliente(this.clienteForm.value).subscribe(res => {
      this.clienteForm.reset()
      this.router.navigate(['/administrativo/usuarios'])
      this.showToastrSuccess()
    }, err =>{
      this.loginForm.reset()
      this.router.navigate(['/administrativo/usuarios'])
      this.showToastrErrorCliente()
    })
  }

  showToastrSuccess() {
    this._toastr.success('Cadastro realizado com sucesso', null, {
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
  showToastrErrorCliente(){
    this._toastr.error('Houve um erro ao efetuar o cadastro do cliente. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  get email() { return this.loginForm.get('email') }
  get senha() { return this.loginForm.get('senha') }
  get nome() { return this.loginForm.get('nome') }
  get cpf() { return this.loginForm.get('cpf') }
  get dataNascimento() { return this.loginForm.get('dataNascimento') }
}
