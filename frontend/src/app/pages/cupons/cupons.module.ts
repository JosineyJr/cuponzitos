import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuponsPageRoutingModule } from './cupons-routing.module';

import { CuponsPage } from './cupons.page';
import { DragScrollModule } from 'ngx-drag-scroll';
import { PersonalizadosComponent } from './personalizados/personalizados.component';
import { CupomComponent } from './cupom/cupom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuponsPageRoutingModule,
    DragScrollModule,
  ],
  declarations: [CuponsPage, PersonalizadosComponent, CupomComponent],
})
export class CuponsPageModule {}
