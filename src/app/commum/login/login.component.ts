import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { HeaderVendaComponent } from 'src/app/Site-Vendas/header-venda/header-venda.component';
import { AppComponent } from 'src/app/app.component';
import { variaveisGlobais } from '../variaveis-globais';

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
    this.httpReq = this.service.postLogar(this.loginForm.value).subscribe(res => {
      if (res.status == 200) {
        let response = this.decodificarToken(res.body['token'])
        if (response.isAdmin == 1) {
          this.httpReq = this.service.getClientePorIdLogin(response.id).pipe().subscribe(res => {
            variaveisGlobais.idAdm = response.id
            variaveisGlobais.cliente = res.body['data']
            this.router.navigate(['administrativo'])
          }, err => {
            this.statusResponse = err.status
            this.messageApi = 'Falha na autenticação!'
          })
        } else {
          this.httpReq = this.service.getClientePorIdLogin(response.id).pipe().subscribe(res => {
            variaveisGlobais.idlogin = response.id
            variaveisGlobais.cliente = res.body['data']
            this.router.navigate([''])
          }, err => {
            this.statusResponse = err.status
            this.messageApi = 'Falha na autenticação!'
          })
        }
      }
    }, err => {
      this.statusResponse = err.status
      this.messageApi = 'Falha na autenticação!'
    })
  }

  decodificarToken(token): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }


  get email() { return this.loginForm.get('email') }
  get senha() { return this.loginForm.get('senha') }
}
