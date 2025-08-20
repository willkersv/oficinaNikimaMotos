import { Status } from './status';
import { Servico } from './servico';

export interface Moto {
  id?: number;
  modelo: string;
  placa: string;
  dataEntrada?: string;
  status: Status;
  mecanicoResponsavel: string;
  funcionarioNota: string;
  servicos: Servico[];
}
