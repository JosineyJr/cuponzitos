import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroEnderecoPageRoutingModule } from './cadastro-endereco-routing.module';

import { CadastroEnderecoPage } from './cadastro-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroEnderecoPageRoutingModule
  ],
  declarations: [CadastroEnderecoPage]
})
export class CadastroEnderecoPageModule {}
