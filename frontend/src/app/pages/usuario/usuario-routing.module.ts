import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioPage } from './usuario.page';
import { DesejosComponent } from './desejos/desejos.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage,
  },
  {
    path: '/:usuario',
    component: UsuarioPage,
  },
  {
    path: 'desejos',
    component: DesejosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
