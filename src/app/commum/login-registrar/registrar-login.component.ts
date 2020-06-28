import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../model/login.model';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from '../service/clientes.service';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-registrar-login',
  templateUrl: './registrar-login.component.html',
  styleUrls: ['./registrar-login.component.css']
})
export class RegistrarLoginComponent implements OnInit {

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
    private _validateBrService: ValidateBrService,
    private serviceCliente: ClientesService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:  ['', [Validators.required, Validators.email]],
      senha:  ['', [Validators.required]],
      isAdmin:  [0, [Validators.required]]
    })
    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, this._validateBrService.cpf]],
      dataNascimento:  ['', [Validators.required]],
      idLogin:  [0, [Validators.required]]
    })
  }

  onSubmit() {
    this.httpReq = this.service.postLogin(this.loginForm.value).subscribe(res =>{
      this.loginForm.reset()
      this.clienteForm.value.idLogin = res.body['data']
      this.postCliente()
    }, err =>{
      this.loginForm.reset()
      this.router.navigate(['/'])
      this.showToastrError()
    })
  }

  postCliente(){
    this.httpReq = this.serviceCliente.postCliente(this.clienteForm.value).subscribe(res => {
      this.clienteForm.reset()
      this.router.navigate(['/'])
      this.showToastrSuccess()
    }, err =>{
      this.loginForm.reset()
      this.router.navigate(['/'])
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
