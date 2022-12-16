import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '@app/models/Lote';
import { environment } from '@environments/environment';
import { Observable, take } from 'rxjs';

@Injectable()
export class LoteService {
  baseURL = environment.apiURL + 'api/lotes';

  constructor(private http: HttpClient) {}

  public GetLoteByEventoId(eventoId: number): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.baseURL}/${eventoId}`).pipe(take(1));
  }

  public SaveLotes(eventoId: number, lotes: Lote[]): Observable<Lote> {
    return this.http
      .put<Lote>(`${this.baseURL}/${eventoId}`, lotes)
      .pipe(take(1));
  }

  public deleteLote(eventoId: number, loteId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${eventoId}/${loteId}`).pipe(take(1));
  }
}
