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
import { SidebarAdministrativoComponent } from './Painel-Administrativo/sidebar-administrativo/sidebar-administrativo.component';
import { HeaderAdministrativoComponent } from './Painel-Administrativo/header-administrativo/header-administrativo.component';
import { FooterAdministrativoComponent } from './Painel-Administrativo/footer-administrativo/footer-administrativo.component';
import { HomeAdministrativoComponent } from './Painel-Administrativo/home-administrativo/home-administrativo.component';
import { ControlSidebarAdministrativoComponent } from './Painel-Administrativo/control-sidebar-administrativo/control-sidebar-administrativo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarLoginComponent } from './commum/login-registrar/registrar-login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListarUsuariosComponent } from './Painel-Administrativo/usuarios/listar-usuarios/listar-usuarios.component';
import { AdicionarUsuariosComponent } from './Painel-Administrativo/usuarios/adicionar-usuarios/adicionar-usuarios.component';
import { VisualizarUsuarioComponent } from './Painel-Administrativo/usuarios/visualizar-usuario/visualizar-usuario.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalDialogComponent } from './commum/modals/modal-dialog/modal-dialog.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EditarUsuarioComponent } from './Painel-Administrativo/usuarios/editar-usuario/editar-usuario.component';
import { ProdutosComponent } from './Painel-Administrativo/produtos-administrativo/adicionar-produtos/produtos.component';
import { ListarProdutosComponent } from './Painel-Administrativo/produtos-administrativo/listar-produtos/listar-produtos.component';
import { EditarProdutosComponent } from './Painel-Administrativo/produtos-administrativo/editar-produtos/editar-produtos.component';
import { VisualizarProdutosComponent } from './Painel-Administrativo/produtos-administrativo/visualizar-produtos/visualizar-produtos.component';
import { ListarVendasComponent } from './Painel-Administrativo/vendas/listar-vendas/listar-vendas.component';
import { ListarCarrinhoComponent } from './Site-Vendas/listar-carrinho/listar-carrinho.component';
import { NgxCurrencyModule } from "ngx-currency";
import { AngularValidateBrLibModule } from 'angular-validate-br';
import { VendaComponent } from './Site-Vendas/venda/venda.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterVendaComponent,
    HeaderVendaComponent,
    SidebarAdministrativoComponent,
    HeaderAdministrativoComponent,
    FooterAdministrativoComponent,
    HomeAdministrativoComponent,
    ControlSidebarAdministrativoComponent,
    RegistrarLoginComponent,
    ListarUsuariosComponent,
    AdicionarUsuariosComponent,
    VisualizarUsuarioComponent,
    ModalDialogComponent,
    EditarUsuarioComponent,
    ProdutosComponent,
    ListarProdutosComponent,
    EditarProdutosComponent,
    ListarVendasComponent,
    VisualizarProdutosComponent,
    ListarCarrinhoComponent,
    VendaComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxCurrencyModule,
    AngularValidateBrLibModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(options),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
