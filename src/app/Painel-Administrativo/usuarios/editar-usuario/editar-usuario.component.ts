import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidateBrService } from 'angular-validate-br';
import { LoginService } from 'src/app/commum/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/commum/service/clientes.service';
import { Cliente } from 'src/app/commum/model/cliente.model';
import { Login } from 'src/app/commum/model/login.model';
import { Usuario } from 'src/app/commum/model/usuario.model';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  private httpReq: Subscription
  public loginForm: FormGroup
  public clienteForm: FormGroup

  cliente: Cliente = null
  login: Login
  usuario: Usuario
  statusResponse: number
  messageApi: string
  mask: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
    private _validateBrService: ValidateBrService,
    private _toastr: ToastrService,
    private serviceCliente: ClientesService
  ) {
    this.initForm()
  }

  ngOnInit(): void {
    if (variaveisGlobais.idAdm == null) {
      this.router.navigate(['/login'])
    } else {
      const email = this.activatedRoute.snapshot.params['email']

      this.getUsuarioByEmail(email)
    }
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      isAdmin: [1, [Validators.required]]
    })
    this.clienteForm = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, this._validateBrService.cpf]],
      dataNascimento: [''],
      idLogin: [0, [Validators.required]]
    })
  }


  getUsuarioByEmail(email: string) {
    this.httpReq = this.serviceCliente.getCliente(email).subscribe(response => {
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      this.cliente = response.body.data[0]
      this.populateForm()
    }, err => {
      this.statusResponse = err.status
      this.messageApi = err.error['message']
    })
  }

  populateForm() {
    this.loginForm.patchValue({
      id: this.cliente.idLogin,
      email: this.cliente.email,
      senha: this.cliente.senha
    })
    this.clienteForm.patchValue({
      id: this.cliente.id,
      nome: this.cliente.nome,
      cpf: this.cliente.cpf,
      dataNascimento: this.cliente.dataNascimento,
      idLogin: this.cliente.idLogin
    })
  }

  onSubmit() {
    this.usuario = this.clienteForm.value
    this.login = this.loginForm.value
    this.login.id = this.clienteForm.value.idLogin

    this.httpReq = this.serviceCliente.updateLogin(this.login, this.login.id).subscribe(response => {
      this.httpReq = this.serviceCliente.updateCliente(this.usuario, this.usuario.id).subscribe(res => {
        this.loginForm.reset()
        this.clienteForm.reset()
        this.router.navigate(['/administrativo/usuarios'])
        this.showToastrSuccess()
      }, err => {
        this.loginForm.reset()
        this.clienteForm.reset()
        this.router.navigate(['/administrativo/usuarios'])
        this.showToastrError()
      })
    }, err => {
      this.loginForm.reset()
      this.clienteForm.reset()
      this.router.navigate(['/administrativo/usuarios'])
      this.showToastrError()
    })
  }

  showToastrSuccess() {
    this._toastr.success('Edição realizada com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this._toastr.error('Houve um erro ao efetuar a edição. Tente novamente.', null, {
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
