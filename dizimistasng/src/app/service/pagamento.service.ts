import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagamentos } from '../domain/Pagamentos.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private apiUrl2 = 'http://26.143.248.8:8080/dizimistassrv/api/Pagamento';
  private apiUrl = 'http://localhost:8080/dizimistassrv/api/Pagamento';

  constructor(private http: HttpClient) { }

  apagarPagamento(Pagamento: Pagamentos) {
    return this.http.delete<{ mensagem: string }>(this.apiUrl, {
      body: Pagamento
    });
  }

  editarPagamento(Pagamento: Pagamentos) {
    return this.http.put(this.apiUrl, Pagamento);
  }

  salvarPagamento(Pagamento: Pagamentos): Observable<Pagamentos> {
    return this.http.post<Pagamentos>(this.apiUrl, Pagamento);
  }

  listarTodos(): Observable<Pagamentos[]> {
    return this.http.get<Pagamentos[]>(this.apiUrl);
  }
}
