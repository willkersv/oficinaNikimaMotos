import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Servico } from '../models/servico';

@Injectable({ providedIn: 'root' })
export class ServicoService {
  private base = `${environment.apiBase}/servicos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.base);
  }

  buscarPorId(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.base}/${id}`);
  }

  criar(servico: any): Observable<Servico> {
    return this.http.post<Servico>(this.base, servico);
  }

  atualizar(id: number, servico: any): Observable<Servico> {
    return this.http.put<Servico>(`${this.base}/${id}`, servico);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
