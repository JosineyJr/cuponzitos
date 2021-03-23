import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-desejos',
  templateUrl: './desejos.component.html',
  styleUrls: ['./desejos.component.scss'],
})
export class DesejosComponent implements OnInit {
  desejos = new FormGroup({
    tamanho: new FormControl(''),
    preco: new FormControl(''),
    produtos: new FormArray([]),
  });

  tamanhos: Array<any> = [
    { description: 'combo individual', value: 1 },
    { description: 'combo para até 3 pessoas', value: 3 },
    { description: 'combo para mais de 3 pessoas', value: 4 },
    { description: 'todos', value: 0 },
  ]

  precos: Array<any> = [
    { description: 'até R$20,00', value: 20 },
    { description: 'até R$40,00', value: 40 },
    { description: 'até R$60,00', value: 60 },
    { description: 'sem limite', value: 61 },
  ];

  categorias: Array<any> = [
    { description: 'Veggie', value: 'Veggie' },
    { description: 'CheeseBurgers', value: 'CheeseBurgers' },
    { description: 'Acompanhamentos', value: 'Acompanhamentos' },
    { description: 'Whoppers', value: 'Whoppers' },
    { description: 'Sobremesas', value: 'Sobremesas' },
    { description: 'Chedars', value: 'Chedars' },
    { description: 'Chikens', value: 'Chikens' },
  ];

  onRadioChangeTamanho(event) {
    const formControl: FormControl = this.desejos.get('tamanho') as FormControl;

    console.log(event.target.checked);
    if (event.target.checked) {
      formControl.setValue(event.target.value);
    }
  }

  onRadioChangePreco(event) {
    const formControl: FormControl = this.desejos.get('preco') as FormControl;

    console.log(event.target.checked);
    if (event.target.checked) {
      formControl.setValue(event.target.value);
    }
  }

  onCheckChange(event) {
    const formArray: FormArray = this.desejos.get('produtos') as FormArray;
    console.log(event.target);

    /* Selected */
    if (!event.target.checked) {
      // Add a new control in the arrayForm
      console.log('si');
      formArray.push(new FormControl(event.target.value));
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  constructor(
    titleService: Title,
    private toastController: ToastController,
    private navController: NavController
  ) {
    titleService.setTitle('Meus Desejos');
  }
  login;

  ngOnInit() {
    this.login = JSON.parse(localStorage.getItem('loginBD'));
    if (!this.login) {
      this.navController.navigateBack('/cuponzitos');
      this.exibirMensagem('Usuário nao autenticado');
    } else {
      this.exibirMensagem('Usuário autenticado com sucesso!');
    }
  }

  async onSubmit() {
    console.log(this.desejos.value);
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
