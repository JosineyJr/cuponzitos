import { Cupons } from "./Cupons.interface";

export interface Promos {
  id: number;
  name: string;
  slug: string;
  url: string;
  bg_color: string;
  order: number;
  login_to_view: number;
  coupons: Cupons[];
}
