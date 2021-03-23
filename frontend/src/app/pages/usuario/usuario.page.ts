import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Endereco } from 'src/app/interfaces/Endereco.interface';
import { Login } from 'src/app/interfaces/login.interface';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { LoginService } from 'src/app/service/login.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  salt = bcrypt.genSaltSync(10);
  login: Login;
  usuario: Usuario = {
    active: true,
    cpf: null,
    dataNascimento: null,
    email: null,
    endereco: null,
    lastName: null,
    name: null,
    password: null,
    userName: null,
    id: null,
  };
  endereco: Endereco = {
    cidade: null,
    estado: null,
    id: null,
  };
  estados;
  municipios;

  usuarioForm = new FormGroup({
    inputNome: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    inputSobreNome: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    inputDataNascimento: new FormControl('', Validators.required),
    inputCpf: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
    ]),
    inputCidade: new FormControl('', Validators.required),
    selectEstado: new FormControl('', Validators.required),
    inputEmail: new FormControl('', [Validators.required, Validators.email]),
    inputSenha: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    inputConfirmarSenha: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private loginService: LoginService,
    private navController: NavController,
    private http: HttpClient,
    private alertController: AlertController
  ) {
    this.getEstados();
  }

  ngOnInit() {
    this.login = JSON.parse(localStorage.getItem('loginBD'));
    if (!this.login) {
      this.exibirMensagem('Usuário nao autenticado');
      this.navController.navigateBack('/cuponzitos');
    } else {
      this.getUsuario(this.login.username);
    }
  }

  async onSubmit() {
    this.usuario.cpf = this.usuarioForm.get('inputCpf').value;
    this.usuario.dataNascimento = new Date(
      this.usuarioForm.get('inputDataNascimento').value
    );
    this.usuario.email = this.usuarioForm.get('inputEmail').value;
    this.endereco.cidade = this.usuarioForm.get('inputCidade').value;
    this.endereco.estado = this.usuarioForm.get('selectEstado').value;
    this.usuario.lastName = this.usuarioForm.get('inputSobreNome').value;
    this.usuario.name = this.usuarioForm.get('inputNome').value;
    this.usuario.cpf = this.usuarioForm.get('inputCpf').value;
    if (this.usuarioForm.get('inputSenha').value == '') {
      await this.loginService.cadastrar(this.usuario).then((json) => {
        if (json) {
          this.exibirMensagem('Usuario alterado com sucesso');
          window.location.href = window.location.href;
        }
      });
    } else if (
      this.usuarioForm.get('inputSenha').value != '' &&
      this.usuarioForm.get('inputSenha').value != null
    ) {
      this.usuario.password = bcrypt.hashSync(
        this.usuarioForm.get('inputSenha').value,
        this.salt
      );
      console.log(this.usuarioForm.get('inputSenha').value);
      await this.loginService.cadastrar(this.usuario).then((json) => {
        if (json) {
          this.exibirMensagem('Usuario alterado com sucesso');
          window.location.href = window.location.href;
        }
      });
    }
  }

  async excluir() {
    this.confirmarExclusao(this.usuario);
  }
  async confirmarExclusao(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: 'Nome: ' + usuario.name + ' Usuário: ' + usuario.userName,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.usuario.active = false;
            this.loginService.cadastrar(this.usuario).then((json) => {
              if (json) {
                this.exibirMensagem('Usuario desativado com sucesso');
                this.navController.navigateBack('/login');
                window.location.href = window.location.href;
              }
            });
          },
        },
      ],
    });
    await alert.present();
  }
  async getUsuario(username: string) {
    await this.loginService.getUsuario(username).then((json) => {
      this.usuario = <Usuario>json;
      this.preencherUsuario();
    });
  }

  preencherUsuario() {
    this.usuarioForm.get('inputCpf').setValue(this.usuario.cpf);
    this.usuarioForm
      .get('inputDataNascimento')
      .setValue(this.usuario.dataNascimento);
    this.usuarioForm.get('inputEmail').setValue(this.usuario.email);
    this.usuarioForm.get('inputCidade').setValue(this.endereco.cidade);
    this.usuarioForm.get('selectEstado').setValue(this.endereco.estado);
    this.usuarioForm.get('inputSobreNome').setValue(this.usuario.lastName);
    this.usuarioForm.get('inputNome').setValue(this.usuario.name);
    this.usuarioForm.get('inputCpf').setValue(this.usuario.cpf);
    // this.usuarioForm.get('inputSenha').setValue(this.usuario.password);
    console.log(this.usuario);
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }

  async getEstados() {
    this.http
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .toPromise()
      .then((json) => {
        this.estados = <[]>json;
      });
  }

  async getMunicipios(id: string) {
    this.http
      .get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' +
          id +
          '/distritos'
      )
      .toPromise()
      .then((json) => {
        this.municipios = <[]>json;
      });
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
