import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login.interface';
import { Token } from '../interfaces/token.interface';
import { Usuario } from '../interfaces/Usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private API = 'http://localhost:8080/public/';
  private token: Token;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  logar(login: Login) {
    let urlAuxiliar = this.API + 'authenticate';
    return this.http
      .post(urlAuxiliar, JSON.stringify(login), this.httpOptions)
      .toPromise()
      .then((json) => {
        this.token = <Token>json;
        this.logado().then((conta) => {
          console.log(conta);
        });
        return this.token;
      });
  }

  getToken() {
    return this.token;
  }

  logado() {
    let urlAuxiliar = this.API + 'account';
    return this.http.get(urlAuxiliar).toPromise();
  }

  cadastrar(usuario: Usuario) {
    let urlAuxiliar = this.API + 'register';
    if (usuario.id == null) {
      return this.http
        .post(urlAuxiliar, JSON.stringify(usuario), this.httpOptions)
        .toPromise();
    }
    return this.http
      .put(this.API + 'usuarios', JSON.stringify(usuario), this.httpOptions)
      .toPromise();
  }

  getUsuario(username: string) {
    let urlAuxiliar = this.API + 'usuarios/' + username;
    return this.http.get(urlAuxiliar).toPromise();
  }

  deleteUsuario(id: number){
    let urlAuxiliar = this.API + 'usuarios/' + id;
    return this.http.delete(urlAuxiliar).toPromise();
  }
}
