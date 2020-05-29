import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commum/login/login.component';
import { HomeVendaComponent } from './Site-Vendas/home-venda/home-venda.component';
import { HomeAdministrativoComponent } from './Painel-Administrativo/home-administrativo/home-administrativo.component';
import { CategoriaAdministrativoComponent } from './Painel-Administrativo/categoria-administrativo/categoria-administrativo.component';


export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeVendaComponent},
  { path: 'administrativo', children:[
    { path: '', component: HomeAdministrativoComponent},
    { path: 'categoria', component: CategoriaAdministrativoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

