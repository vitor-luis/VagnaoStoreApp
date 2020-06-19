import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commum/login/login.component';
import { HomeVendaComponent } from './Site-Vendas/home-venda/home-venda.component';
import { HomeAdministrativoComponent } from './Painel-Administrativo/home-administrativo/home-administrativo.component';
import { RegistrarLoginComponent } from './commum/login-registrar/registrar-login.component';
import { ListarUsuariosComponent } from './Painel-Administrativo/usuarios/listar-usuarios/listar-usuarios.component';
import { AdicionarUsuariosComponent } from './Painel-Administrativo/usuarios/adicionar-usuarios/adicionar-usuarios.component';
import { VisualizarUsuarioComponent } from './Painel-Administrativo/usuarios/visualizar-usuario/visualizar-usuario.component';
import { EditarUsuarioComponent } from './Painel-Administrativo/usuarios/editar-usuario/editar-usuario.component';

export const ROUTES: Routes = [
  { path: '',component: HomeVendaComponent, children: [

  ]},
  //rota login
  { path: 'login', children: [
    { path: '', component: LoginComponent},
    { path: 'registrar', component: RegistrarLoginComponent},
  ]},
  { path: 'administrativo', children:[
    { path: '', component: HomeAdministrativoComponent},
    { path: 'usuarios', children: [
      { path: '', component: ListarUsuariosComponent},
      { path: 'adicionar', component: AdicionarUsuariosComponent},
      { path: 'visualizar/:email', component: VisualizarUsuarioComponent},
      { path: 'editar/:email', component: EditarUsuarioComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

