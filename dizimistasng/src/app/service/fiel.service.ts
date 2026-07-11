import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FielList } from '../domain/FielList.model';

@Injectable({
  providedIn: 'root'
})
export class FielService {

  private apiUrl = 'http://26.143.248.8:8080/dizimistassrv/api/fiel';
  private apiUrl2 = 'http://localhost:8080/dizimistassrv/api/fiel';

  constructor(private http: HttpClient) { }

  salvarFiel(fiel: FielList): Observable<FielList> {
    return this.http.post<FielList>(this.apiUrl, fiel);
  }

  listarTodos(): Observable<FielList[]> {
    return this.http.get<FielList[]>(this.apiUrl);
  }
}
