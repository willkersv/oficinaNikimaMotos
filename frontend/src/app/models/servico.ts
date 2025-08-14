import { TipoServico } from './tipo-servico';

export interface Servico {
  id?: number;
  descricao: string;
  preco: number;
  tipo: TipoServico;
  realizadoPor: string;
  // moto?: Moto;
}
