import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DesejosService {
  private API = 'http://localhost:8080/public/';
  constructor(private http: HttpClient) {}

  async getCaracteristicaProduto(nomeProdutoCaracteristica: string) {
    const urlAuxiliar = this.API + 'caracteristicaProduto/';
    return this.http.get(urlAuxiliar + nomeProdutoCaracteristica).toPromise();
  }
}
