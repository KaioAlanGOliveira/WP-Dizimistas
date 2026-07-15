export interface Pagamentos {
nomeFiel: any;
  cpf: string;
  codPagamento: number;
  valor?: number;
  tipo?: number;
}

export class Pagamento {
  id?: PagamentoId;
  codPagamento?: number;
  valor?: number;
  tipo?: number;
}

export class PagamentoId {
  
  cpf?: string;
  codPagamento?: number;
}