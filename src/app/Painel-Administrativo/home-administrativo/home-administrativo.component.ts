import { Component, OnInit } from '@angular/core';
import { variaveisGlobais } from 'src/app/commum/variaveis-globais';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-administrativo',
  templateUrl: './home-administrativo.component.html',
  styleUrls: ['./home-administrativo.component.css']
})
export class HomeAdministrativoComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(variaveisGlobais.idAdm == null){
      this.router.navigate(['/login'])
    }
  }

}
