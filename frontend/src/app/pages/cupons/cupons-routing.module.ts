import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuponsPage } from './cupons.page';
import { PersonalizadosComponent } from './personalizados/personalizados.component';
import { CupomComponent } from './cupom/cupom.component';

const routes: Routes = [
  {
    path: '',
    component: CuponsPage,
  },
  {
    path: 'personalizados',
    component: PersonalizadosComponent,
  },
  {
    path: ':promo/:cupom',
    component: CupomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuponsPageRoutingModule {}
