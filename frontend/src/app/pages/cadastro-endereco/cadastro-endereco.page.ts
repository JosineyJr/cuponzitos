import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-endereco',
  templateUrl: './cadastro-endereco.page.html',
  styleUrls: ['./cadastro-endereco.page.scss'],
})
export class CadastroEnderecoPage implements OnInit {
  constructor(titleService: Title) {
    titleService.setTitle('Endereço');
  }

  ngOnInit() {}
}
