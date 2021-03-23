import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroEnderecoPage } from './cadastro-endereco.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroEnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroEnderecoPageRoutingModule {}
