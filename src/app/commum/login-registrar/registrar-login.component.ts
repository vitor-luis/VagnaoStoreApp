import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Login } from '../model/login.model';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-login',
  templateUrl: './registrar-login.component.html',
  styleUrls: ['./registrar-login.component.css']
})
export class RegistrarLoginComponent implements OnInit {

  private httpReq: Subscription
  public loginForm: FormGroup

  login: Login = null
  statusResponse: number
  messageApi: string

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
    private _toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control(''),
      senha: this.formBuilder.control(''),
      isAdmin: this.formBuilder.control(0)
    })
  }

  onSubmit() {
    this.httpReq = this.service.postLogin(this.loginForm.value).subscribe(res =>{
      this.loginForm.reset()
      this.router.navigate(['/'])
      this.showToastrSuccess()
    }, err =>{
      this.loginForm.reset()
      this.router.navigate(['/'])
      this.showToastrError()
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

  get email() { return this.loginForm.get('email') }
  get senha() { return this.loginForm.get('senha') }
}
