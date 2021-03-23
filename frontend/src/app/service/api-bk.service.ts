import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Promos } from '../interfaces/Promos.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiBKService {
  API =
    'https://thingproxy.freeboard.io/fetch/https://cupons.burgerking.com.br/api/shelves?only_featured_coupons=true';

  promo: Promos;

  constructor(private http: HttpClient) {}

  getCupons() {
    return this.http.get(this.API).toPromise();
  }

  async getPromo(name: string) {
    return await this.http
      .get(this.API)
      .toPromise()
      .then((promo) => {
        this.promo = <Promos>promo['data'];
        for (const p in this.promo) {
          if (this.promo[p].name.toUpperCase() === name.toUpperCase()) {
            return this.promo[p];
          }
        }
        return null;
      });
  }

  async getCupom(promoName: string, cupomId: number) {
    let promo: Promos;
    await this.getPromo(promoName).then((promoObject) => {
      promo = <Promos>promoObject;
    });
    for (const cupom of promo.coupons) {
      if (cupom.id == cupomId) {
        return cupom;
      }
      // console.log(cupom.id);
    }
    return null;
  }
}
