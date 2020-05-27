import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commum/login/login.component';
import { VendasComponent } from './Site-Vendas/vendas/vendas.component';


export const ROUTES: Routes = [
  { path: '', component: LoginComponent},
  {path: 'vendas', component: VendasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

