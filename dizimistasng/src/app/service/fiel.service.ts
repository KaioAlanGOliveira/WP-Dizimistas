import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FielList } from '../domain/Fieis.model';

@Injectable({
  providedIn: 'root'
})
export class FielService {

  private apiUrl2 = 'http://26.143.248.8:8080/dizimistassrv/api/fiel';
  private apiUrl = 'http://localhost:8080/dizimistassrv/api/fiel';

  constructor(private http: HttpClient) { }

  apagarFiel(fiel: FielList) {
    return this.http.delete<{ mensagem: string }>(this.apiUrl, {
      body: fiel
    });
  }

  editarFiel(fiel: FielList) {
    return this.http.put(this.apiUrl, fiel);
  }

  salvarFiel(fiel: FielList): Observable<FielList> {
    return this.http.post<FielList>(this.apiUrl, fiel);
  }

  listarTodos(): Observable<FielList[]> {
    return this.http.get<FielList[]>(this.apiUrl);
  }
}
