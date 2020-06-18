import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

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
          this.router.navigate(['administrativo'])
        } else {
          this.router.navigate(['/'])
        }
      }
    }, err =>{
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
