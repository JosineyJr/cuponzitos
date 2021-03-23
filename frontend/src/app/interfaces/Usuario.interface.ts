import { Endereco } from './Endereco.interface';

export interface Usuario {
  active: boolean;
  cpf: string;
  dataNascimento: Date;
  email: string;
  endereco: Endereco;
  lastName: string;
  name: string;
  password: string;
  userName: string;
  id: number;
}
