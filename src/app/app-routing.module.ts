
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commum/login/login.component';
import { HomeVendaComponent } from './Site-Vendas/home-venda/home-venda.component';
import { HomeAdministrativoComponent } from './Painel-Administrativo/home-administrativo/home-administrativo.component';
import { RegistrarLoginComponent } from './commum/login-registrar/registrar-login.component';
import { ListarUsuariosComponent } from './Painel-Administrativo/usuarios/listar-usuarios/listar-usuarios.component';
import { AdicionarUsuariosComponent } from './Painel-Administrativo/usuarios/adicionar-usuarios/adicionar-usuarios.component';
import { VisualizarUsuarioComponent } from './Painel-Administrativo/usuarios/visualizar-usuario/visualizar-usuario.component';
import { EditarUsuarioComponent } from './Painel-Administrativo/usuarios/editar-usuario/editar-usuario.component';
import { ListarProdutosComponent } from './Painel-Administrativo/produtos-administrativo/listar-produtos/listar-produtos.component';
import { ProdutosComponent } from './Painel-Administrativo/produtos-administrativo/adicionar-produtos/produtos.component';
import { EditarProdutosComponent } from './Painel-Administrativo/produtos-administrativo/editar-produtos/editar-produtos.component';
import { VisualizarProdutosComponent } from './Painel-Administrativo/produtos-administrativo/visualizar-produtos/visualizar-produtos.component';
import { ListarVendasComponent } from './Painel-Administrativo/vendas/listar-vendas/listar-vendas.component';
import { ListarCategoriasComponent } from './Painel-Administrativo/categorias/listar-categorias/listar-categorias.component';


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
   
    { path: 'categorias', children:[
    { path: '', component: ListarCategoriasComponent}
    ]},
    { path: 'usuarios', children: [
      { path: '', component: ListarUsuariosComponent},
      { path: 'adicionar', component: AdicionarUsuariosComponent},
      { path: 'visualizar/:email', component: VisualizarUsuarioComponent},
      { path: 'editar/:email', component: EditarUsuarioComponent}
    ]},
    {path: 'produtos', children:[
      { path: '', component: ListarProdutosComponent}, 
      { path: 'adicionar', component: ProdutosComponent },
      { path: 'visualizar/:id', component: VisualizarProdutosComponent},
      { path: 'editar/:id', component: EditarProdutosComponent}
    ]},
    {path: 'venda', children:[
      { path: '', component: ListarVendasComponent}, 
    ]}

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

