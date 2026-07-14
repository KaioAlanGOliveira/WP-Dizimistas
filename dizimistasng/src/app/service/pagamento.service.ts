import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagamentoList } from '../domain/PagamentoList.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private apiUrl2 = 'http://26.143.248.8:8080/dizimistassrv/api/Pagamento';
  private apiUrl = 'http://localhost:8080/dizimistassrv/api/Pagamento';

  constructor(private http: HttpClient) { }

  apagarPagamento(Pagamento: PagamentoList) {
    return this.http.delete<{ mensagem: string }>(this.apiUrl, {
      body: Pagamento
    });
  }

  editarPagamento(Pagamento: PagamentoList) {
    return this.http.put(this.apiUrl, Pagamento);
  }

  salvarPagamento(Pagamento: PagamentoList): Observable<PagamentoList> {
    return this.http.post<PagamentoList>(this.apiUrl, Pagamento);
  }

  listarTodos(): Observable<PagamentoList[]> {
    return this.http.get<PagamentoList[]>(this.apiUrl);
  }
}
