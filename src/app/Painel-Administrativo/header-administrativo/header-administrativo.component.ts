import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/commum/model/cliente.model';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';

@Component({
  selector: 'app-header-administrativo',
  templateUrl: './header-administrativo.component.html',
  styleUrls: ['./header-administrativo.component.css']
})
export class HeaderAdministrativoComponent implements OnInit {
  
  nome: string
  constructor() { }

  ngOnInit(): void {
    this.nome = variaveisGlobais.cliente[0].nome
  }

}
