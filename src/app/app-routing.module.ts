import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commum/login/login.component';
import { HomeVendaComponent } from './Site-Vendas/home-venda/home-venda.component';
import { HomeAdministrativoComponent } from './Painel-Administrativo/home-administrativo/home-administrativo.component';
import { CategoriaAdministrativoComponent } from './Painel-Administrativo/categoria-administrativo/categoria-administrativo.component';
import { RegistrarLoginComponent } from './commum/login-registrar/registrar-login.component';
import { ListarUsuariosComponent } from './Painel-Administrativo/usuarios/listar-usuarios/listar-usuarios.component';


export const ROUTES: Routes = [
  { path: '', component: HomeVendaComponent},
  { path: 'login', children: [
    { path: '', component: LoginComponent},
    { path: 'registrar', component: RegistrarLoginComponent}
  ]},
  { path: 'administrativo', children:[
    { path: '', component: HomeAdministrativoComponent},
    { path: 'categoria', component: CategoriaAdministrativoComponent},
    { path: 'usuarios', component: ListarUsuariosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

