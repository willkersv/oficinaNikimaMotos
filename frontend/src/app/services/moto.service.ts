import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Moto } from '../models/moto';
import { Status } from '../models/status';

@Injectable({ providedIn: 'root' })
export class MotoService {
  private base = `${environment.apiBase}/motos`;

  constructor(private http: HttpClient) {}

  listar(status?: Status): Observable<Moto[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Moto[]>(this.base, { params });
  }

  buscarPorId(id: number): Observable<Moto> {
    return this.http.get<Moto>(`${this.base}/${id}`);
  }

  criar(moto: Moto): Observable<Moto> {
    return this.http.post<Moto>(this.base, moto);
  }

  atualizar(id: number, moto: Moto): Observable<Moto> {
    return this.http.put<Moto>(`${this.base}/${id}`, moto);
  }

  atualizarStatus(id: number, status: Status): Observable<Moto> {
    return this.http.put<Moto>(`${this.base}/${id}/status`, null, {
      params: new HttpParams().set('status', status)
    });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
