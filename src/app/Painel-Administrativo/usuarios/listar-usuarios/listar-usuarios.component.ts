import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/commum/service/usuarios.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/commum/model/login.model';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  private httpReq: Subscription

  login: Login[] = null
  statusResponse: number
  messageApi: string

  constructor(
    private service: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUsuarios()
  }

  getAllUsuarios(){
    this.httpReq = this.service.getAllUsuarios().subscribe(response =>{
      this.statusResponse = response.status
      this.messageApi = response.body['message']
      this.login = response.body['data']
    })
  }
}
