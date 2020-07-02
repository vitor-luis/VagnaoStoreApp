import { Component, OnInit } from '@angular/core';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-administrativo',
  templateUrl: './sidebar-administrativo.component.html',
  styleUrls: ['./sidebar-administrativo.component.css']
})
export class SidebarAdministrativoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  logout(){
    variaveisGlobais.idlogin = null
    variaveisGlobais.cliente = null
    this.router.navigate([''])
  }

}
