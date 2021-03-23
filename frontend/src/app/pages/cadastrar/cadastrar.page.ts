import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { Endereco } from 'src/app/interfaces/Endereco.interface';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  estados = [];
  municipios = [];
  endereco: Endereco = {
    cidade: null,
    estado: null,
    id: null,
  };
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

  cadastro = new FormGroup({
    inputNome: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    inputSobreNome: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    inputUsuario: new FormControl('', [
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
    inputTermosUso: new FormControl(false, Validators.required),
  });

  constructor(
    titleService: Title,
    private toastController: ToastController,
    private http: HttpClient,
    private loginService: LoginService,
    private navController: NavController
  ) {
    titleService.setTitle('Cadastrar');
    this.getEstados();
  }

  ngOnInit() {}

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

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }

  compararSenhas(): boolean {
    return (
      this.cadastro.get('inputSenha').value ===
      this.cadastro.get('inputConfirmarSenha').value
    );
  }

  verificarTermos() {
    return this.cadastro.get('inputTermosUso').value;
  }

  onClick() {
    // console.log(!this.cadastro.valid + " : " + !this.cadastro.get('inputTermosUso').value);
    console.log(this.estados[0]);
  }

  async onSubmit() {
    if (this.verificarTermos()) {
      if (this.compararSenhas()) {
        this.usuario.active = true;
        this.usuario.cpf = this.cadastro.get('inputCpf').value;
        this.usuario.dataNascimento = new Date(
          this.cadastro.get('inputDataNascimento').value
        );
        this.usuario.email = this.cadastro.get('inputEmail').value;
        this.endereco.cidade = this.cadastro.get('inputCidade').value;
        this.endereco.estado = this.cadastro.get('selectEstado').value;
        this.usuario.endereco = this.endereco;
        this.usuario.lastName = this.cadastro.get('inputSobreNome').value;
        this.usuario.name = this.cadastro.get('inputNome').value;
        this.usuario.cpf = this.cadastro.get('inputCpf').value;
        this.usuario.userName = this.cadastro.get('inputUsuario').value;
        this.usuario.password = this.cadastro.get('inputSenha').value;
        // this.exibirMensagem('Cadastro realizado');
        console.log(JSON.stringify(this.usuario));
        try {
          await this.loginService.cadastrar(this.usuario).then((json) => {
            if (json) {
              this.exibirMensagem('Cadastro relaliazado com sucesso!');
              this.navController.navigateBack('/login');
            } else {
              this.exibirMensagem('Erro ao realizar cadastro!');
            }
          });
        } catch (error) {
          this.exibirMensagem(error.error.message);
        }
      } else {
        this.exibirMensagem('Senhas nao sao compativeis');
      }
    } else {
      this.exibirMensagem('Aceite os termos de uso');
    }
  }
}
