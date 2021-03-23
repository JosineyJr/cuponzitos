import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'cadastrar',
    loadChildren: () =>
      import('./pages/cadastrar/cadastrar.module').then(
        (m) => m.CadastrarPageModule
      ),
  },
  {
    path: 'endereco',
    loadChildren: () =>
      import('./pages/cadastro-endereco/cadastro-endereco.module').then(
        (m) => m.CadastroEnderecoPageModule
      ),
  },
  {
    path: 'cuponzitos',
    loadChildren: () =>
      import('./pages/cupons/cupons.module').then((m) => m.CuponsPageModule),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./pages/usuario/usuario.module').then((m) => m.UsuarioPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
