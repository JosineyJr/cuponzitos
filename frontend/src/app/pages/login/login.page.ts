import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { Login } from 'src/app/interfaces/login.interface';
import { Token } from 'src/app/interfaces/token.interface';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = {
    username: null,
    password: null,
    rememberMe: null,
    token: null,
  };

  token: Token;

  formLogin = new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    senha: new FormControl('', [Validators.required, Validators.minLength(5)]),
    lembrarSenha: new FormControl(false),
  });

  constructor(
    titleService: Title,
    private loginService: LoginService,
    private toastController: ToastController,
    private navController: NavController
  ) {
    titleService.setTitle('Login');
  }

  ngOnInit() {
    localStorage.setItem('loginBD', JSON.stringify(null));
  }

  async onSubmit() {
    this.login.username = this.formLogin.get('usuario').value;
    this.login.password = this.formLogin.get('senha').value;
    this.login.rememberMe = this.formLogin.get('lembrarSenha').value;

    console.log(this.login);
    try {
      await this.loginService.logar(this.login).then((json) => {
        this.token = this.loginService.getToken();
        console.log(this.token);
        if (this.token) {
          this.login.token = this.token;
          localStorage.setItem('loginBD', JSON.stringify(this.login));
          this.navController.navigateBack('/cuponzitos');
          window.location.href = window.location.href.replace('login', 'cuponzitos');
        }
      });
    } catch (error) {
      this.exibirMensagem('Usuário ou senha incorretos!');
    }
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }
}
