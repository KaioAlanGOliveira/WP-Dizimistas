import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagamento, Pagamentos } from '../domain/Pagamentos.model';
import { PagamentosVw } from '../domain/PagamentosVw.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private apiUrl2 = 'http://26.143.248.8:8080/dizimistassrv/api/Pagamento';
  private apiUrl = 'http://localhost:8080/dizimistassrv/api/pagamento';

  constructor(private http: HttpClient) { }

  apagarPagamento(Pagamento: Pagamentos) {
    return this.http.delete<{ mensagem: string }>(this.apiUrl, {
      body: Pagamento
    });
  }

  editarPagamento(Pagamento: Pagamentos) {
    return this.http.put(this.apiUrl, Pagamento);
  }

  salvarPagamento(Pagamento: Pagamento): Observable<Pagamento> {
    return this.http.post<Pagamento>(this.apiUrl, Pagamento);
  }

  listarTodos(): Observable<Pagamentos[]> {
    return this.http.get<Pagamentos[]>(this.apiUrl);
  }

  listarTodosVw(): Observable<PagamentosVw[]> {
    return this.http.get<PagamentosVw[]>(this.apiUrl);
  }
}
