import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commum/login/login.component';
import { HomeVendaComponent } from './Site-Vendas/home-venda/home-venda.component';
import { HomeAdministrativoComponent } from './Painel-Administrativo/home-administrativo/home-administrativo.component';
import { RegistrarLoginComponent } from './commum/login-registrar/registrar-login.component';
import { ListarUsuariosComponent } from './Painel-Administrativo/usuarios/listar-usuarios/listar-usuarios.component';
import { AdicionarUsuariosComponent } from './Painel-Administrativo/usuarios/adicionar-usuarios/adicionar-usuarios.component';
import { VisualizarUsuarioComponent } from './Painel-Administrativo/usuarios/visualizar-usuario/visualizar-usuario.component';
import { ListarProdutosComponent } from './Painel-Administrativo/produtos-administrativo/listarProdutos/listar-produtos.component';
import { ProdutosComponent } from './Painel-Administrativo/produtos-administrativo/produtoss/produtos.component';
import { EditarProdutosComponent } from './Painel-Administrativo/produtos-administrativo/editar-produtos/editar-produtos.component';

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
      { path: 'visualizar/:email', component: VisualizarUsuarioComponent}
    ]},
    { path: 'produtos', component: ListarProdutosComponent},
    { path: 'produtos/adicionar', component: ProdutosComponent},
    { path: 'produtos/:id', component: EditarProdutosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

