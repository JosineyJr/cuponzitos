import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { MatIconRegistry } from '@angular/material/icon';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Title } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-personalizados',
  templateUrl: './personalizados.component.html',
  styleUrls: ['./personalizados.component.scss'],
})
export class PersonalizadosComponent implements OnInit {
  title = 'Cupons';
  slides = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  hideScrollbar = true;
  disabled;
  xDisabled;
  yDisabled;
  leftNavDisabled = false;
  rightNavDisabled = false;
  index = 0;
  login;

  @ViewChildren('nav', { read: DragScrollComponent })
  ds: DragScrollComponent;

  constructor(
    sanitizer: DomSanitizer,
    private toastController: ToastController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.login = JSON.parse(localStorage.getItem('loginBD'));
    if (!this.login) {
      this.navController.navigateBack('/cuponzitos');
      this.exibirMensagem('Usuário nao autenticado');
    } else {
      this.exibirMensagem('Usuário autenticado com sucesso!');
    }
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }

  clickItem(item) {
    console.log('item clicked');
  }

  toggleHideSB() {
    this.hideScrollbar = !this.hideScrollbar;
  }

  toggleDisable() {
    this.disabled = !this.disabled;
  }
  toggleXDisable() {
    this.xDisabled = !this.xDisabled;
  }
  toggleYDisable() {
    this.yDisabled = !this.yDisabled;
  }

  moveLeft(index: number) {
    this.ds['_results'][index].moveLeft();
  }

  moveRight(index: number) {
    this.ds['_results'][index].moveRight();
  }

  moveTo(idx: number) {
    this.ds.moveTo(idx);
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

  onSnapAnimationFinished() {
    console.log('snap animation finished');
  }

  onIndexChanged(idx) {
    this.index = idx;
    console.log('current index: ' + idx);
  }

  onDragScrollInitialized() {
    console.log('first demo drag scroll has been initialized.');
  }

  onDragStart() {
    console.log('drag start');
  }

  onDragEnd() {
    console.log('drag end');
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
