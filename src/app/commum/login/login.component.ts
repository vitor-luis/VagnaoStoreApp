import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  private httpReq: Subscription
  public loginForm: FormGroup

  login: Login = null
  statusResponse: number
  messageApi: string

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control(''),
      senha: this.formBuilder.control('')
    })
  }

  onSubmit() {
    this.httpReq = this.service.getEmailForValidation(this.loginForm.value.email).subscribe(response => {
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      this.login = response.body['data'][0]
      if (response.body['data'][0] != undefined) {
        this.autenticacao()
      } else {
        this.statusResponse = 304;
        this.messageApi = 'Email inválido'
      }
    }, err => {
      this.messageApi = err.error['message']
    })
  }

  autenticacao() {
    if (this.login.senha == this.loginForm.value.senha) {
      if(this.login.isAdmin == 1){
        this.router.navigate(['/administrativo'])
      }else{
        this.router.navigate(['/'])
      }
    } else {
      this.statusResponse = 304;
      this.messageApi = 'Senha inválida'
    }
  }
  get email() { return this.loginForm.get('email') }
  get senha() { return this.loginForm.get('senha') }
}
