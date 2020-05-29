import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './commum/login/login.component';
import { FooterVendaComponent } from './Site-Vendas/footer-venda/footer-venda.component';
import { HeaderVendaComponent } from './Site-Vendas/header-venda/header-venda.component';
import { HomeVendaComponent } from './Site-Vendas/home-venda/home-venda.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterVendaComponent,
    HeaderVendaComponent,
    HomeVendaComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
