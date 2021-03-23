import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';
import { Promos } from 'src/app/interfaces/Promos.interface';
import { ApiBKService } from 'src/app/service/api-bk.service';
import { DesejosService } from 'src/app/service/desejos.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-desejos',
  templateUrl: './desejos.component.html',
  styleUrls: ['./desejos.component.scss'],
})
export class DesejosComponent implements OnInit {
  promos: Promos;

  desejos = new FormGroup({
    tamanho: new FormControl(''),
    preco: new FormControl(''),
    produtos: new FormArray([]),
    categorias: new FormArray([]),
  });

  tamanhos: Array<any> = [
    { description: 'combo individual', value: 1, checked: false },
    { description: 'combo para até 3 pessoas', value: 3, checked: false },
    { description: 'combo para mais de 3 pessoas', value: 4, checked: false },
    { description: 'todos', value: 0, checked: false },
  ];

  precos: Array<any> = [
    { description: 'até R$20,00', value: 20, checked: false },
    { description: 'até R$40,00', value: 40, checked: false },
    { description: 'até R$60,00', value: 60, checked: false },
    { description: 'sem limite', value: 61, checked: false },
  ];

  categorias: Array<any> = [];

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

  onCheckChangeCategoria(event) {
    const formArray: FormArray = this.desejos.get('categorias') as FormArray;
    console.log(event.target);

    /* Selected */
    if (!event.target.checked) {
      // Add a new control in the arrayForm
      console.log('si');
      // this.categorias.map((cat) => {
      //   if (event.target.value.toUpperCase() == cat.description.toUpperCase()) {
      //     cat.checked = true;
      //   }
      // });
      formArray.push(new FormControl(event.target.value));
    } else {
      // this.categorias.map((cat) => {
      //   if (event.target.value.toUpperCase() == cat.description.toUpperCase()) {
      //     cat.checked = false;
      //   }
      // });
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
    private navController: NavController,
    private cuponsService: ApiBKService,
    private loginService: LoginService,
    private desejosService: DesejosService
  ) {
    titleService.setTitle('Meus Desejos');
  }
  login;
  usuario;

  async ngOnInit() {
    this.login = JSON.parse(localStorage.getItem('loginBD'));
    if (!this.login) {
      this.navController.navigateBack('/cuponzitos');
      this.exibirMensagem('Usuário nao autenticado');
    } else {
      this.exibirMensagem('Usuário autenticado com sucesso!');
      await this.cuponsService.getCupons().then((cupons) => {
        this.promos = <Promos>cupons['data'];
        for (const promo in this.promos) {
          this.categorias.push({
            description: this.promos[promo].name,
            value: this.promos[promo].id,
            checked: false,
          });
        }
        console.log(this.categorias);
      });
      await this.loginService.getUsuario(this.login.username).then((user) => {
        console.log(user);
        this.usuario = user;
        this.desejos.get('tamanho').setValue(this.usuario.desejos.tamanhoCombo);
        this.desejos.get('preco').setValue(this.usuario.desejos.valorMaximo);
        const formArray: FormArray = this.desejos.get(
          'categorias'
        ) as FormArray;
        for (const caracteristica of this.usuario.desejos
          .caracteristicaProdutos) {
          formArray.push(
            new FormControl(caracteristica.nomeCaracteristicaProduto)
          );
          this.categorias.map((c) => {
            if (
              c.description.toUpperCase() ==
              caracteristica.nomeCaracteristicaProduto.toUpperCase()
            ) {
              c.checked = true;
            }
          });
        }
        this.tamanhos.map((t) => {
          if (t.value == this.usuario.desejos.tamanhoCombo) {
            t.checked = true;
          }
        });
        this.precos.map((p) => {
          if (p.value == this.usuario.desejos.valorMaximo) {
            p.checked = true;
          }
        });
      });
      console.log(this.categorias);
    }
  }

  async onSubmit() {
    let verificacao = null,
      aux = [];
    this.usuario.desejos.tamanhoCombo = this.desejos.get('tamanho').value;
    this.usuario.desejos.valorMaximo = this.desejos.get('preco').value;
    for (const caracteristica of this.desejos.get('categorias').value) {
      await this.desejosService
        .getCaracteristicaProduto(caracteristica)
        .then((c) => {
          aux.push(c);
        });
    }
    console.log(aux);
    this.usuario.desejos.caracteristicaProdutos = aux;
    await this.loginService.cadastrar(this.usuario).then((user) => {
      if (user) {
        this.exibirMensagem('Usuario alterado com sucesso');
        window.location.href = window.location.href;
      } else {
        this.exibirMensagem('Error');
      }
    });
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
