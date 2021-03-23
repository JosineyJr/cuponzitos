import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Cupons } from 'src/app/interfaces/Cupons.interface';
import { Promos } from 'src/app/interfaces/Promos.interface';
import { ApiBKService } from 'src/app/service/api-bk.service';

@Component({
  selector: 'app-cupom',
  templateUrl: './cupom.component.html',
  styleUrls: ['./cupom.component.scss'],
})
export class CupomComponent implements OnInit {
  constructor(
    private navController: NavController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private cuponsService: ApiBKService
  ) {}
  login;
  cupom: Cupons;

  @ViewChild('descricao') descricao: ElementRef;

  async ngOnInit() {
    this.login = JSON.parse(localStorage.getItem('loginBD'));
    if (!this.login) {
      this.exibirMensagem('Usuário nao autenticado');
    } else {
      this.exibirMensagem('Usuário autenticado com sucesso!');
    }
    await this.activatedRoute.params.subscribe((params) => {
      this.getCupom(params['promo'], params['cupom']).then((cupom) => {
        this.cupom = <Cupons>cupom;
        console.log(this.cupom);
        this.descricao.nativeElement.innerHTML += this.cupom.description;
      });
    });
  }

  async getCupom(promoName: string, cupomId: number) {
    return await this.cuponsService.getCupom(promoName, cupomId);
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }

  hideMenu(element) {
    console.log(element.style.marginLeft);
    if (
      element.style.marginLeft === '-250px' ||
      element.style.marginLeft === ''
    ) {
      element.style.marginLeft = '0px';
      element.style.boxShadow = '5px 5px 8px 5px #888888';
      // element.style.display = 'block';
    } else {
      element.style.marginLeft = '-250px';
      element.style.boxShadow = 'none';
      // element.style.display = 'none';
    }
  }
}
