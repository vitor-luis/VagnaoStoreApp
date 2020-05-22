import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produtos.model';
import { Subscription } from 'rxjs';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  private httpReq: Subscription

  produtos: Produto[]
  statusResponse: number
  messageApi: string

  constructor(
    private service: LoginService
  ) {

  }

  ngOnInit() {
    this.getProdutos()
  }

  getProdutos(){
    this.httpReq = this.service.getProdutos().subscribe(res =>{
      this.statusResponse = res.status

      if(this.statusResponse == 200){
        this.messageApi = res.body['message']
        this.produtos = res.body['data']
      }
    }, err =>{
      this.messageApi = err
    })
  }
}
