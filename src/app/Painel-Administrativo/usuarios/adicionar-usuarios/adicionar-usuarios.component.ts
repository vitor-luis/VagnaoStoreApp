import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/commum/service/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/commum/service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/commum/model/login.model';
import { Subscription } from 'rxjs';
import { ValidateBrService } from 'angular-validate-br';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';


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
  mask: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
    private _validateBrService: ValidateBrService,
    private _toastr: ToastrService,
    private serviceCliente: ClientesService
  ) {

  }

  ngOnInit(): void {
    if (variaveisGlobais.idAdm == null) {
      this.router.navigate(['/login'])
    } else {
      this.clienteForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.maxLength(250)]],
        cpf: ['', [Validators.required, this._validateBrService.cpf]],
        dataNascimento: [''],
        idLogin: [0, [Validators.required]]
      }),
        this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
          senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
          isAdmin: [1, [Validators.required]],
        })
    }
  }

  onSubmit() {


    this.httpReq = this.service.postLogin(this.loginForm.value).subscribe(res => {
      this.loginForm.reset()
      this.clienteForm.value.idLogin = res.body['data']
      this.postCliente()
    }, err => {
      this.loginForm.reset()
      this.router.navigate(['/administrativo/usuarios'])
      this.showToastrError()
    })
  }

  postCliente() {
    this.httpReq = this.serviceCliente.postCliente(this.clienteForm.value).subscribe(res => {
      this.clienteForm.reset()
      this.router.navigate(['/administrativo/usuarios'])
      this.showToastrSuccess()
    }, err => {
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
  showToastrErrorCliente() {
    this._toastr.error('Houve um erro ao efetuar o cadastro do cliente. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  get email() { return this.loginForm.get('email') }
  get senha() { return this.loginForm.get('senha') }
  get nome() { return this.clienteForm.get('nome') }
  get cpf() { return this.clienteForm.get('cpf') }
  get dataNascimento() { return this.clienteForm.get('dataNascimento') }
}
