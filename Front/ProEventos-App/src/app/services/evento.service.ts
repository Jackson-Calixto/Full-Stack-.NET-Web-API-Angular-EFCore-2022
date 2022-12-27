import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination, PaginatedResult as PaginatedResult } from '@app/models/Pagination';
import { environment } from '@environments/environment';
import { map, Observable, take } from 'rxjs';
import { Evento } from '../models/Evento';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class EventoService {

  baseURL = environment.apiURL + 'api/eventos';

  constructor(private http: HttpClient) {}

  public GetEventos(page?: number, itemsPerPage?: number): Observable<PaginatedResult<Evento[]>> {
    const paginatedResult: PaginatedResult<Evento[]> = new PaginatedResult<Evento[]>();

    let params = new HttpParams;

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http
      .get<Evento[]>(this.baseURL, {observe: 'response', params})
      .pipe(
        take(1),
        map((response) => {
          if (response.body != null)
            paginatedResult.result = response.body;
          if (response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') ?? '');
          }
          return paginatedResult;
        }));
  }

  public GetEventosByTema(tema: string): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(`${this.baseURL}/tema/${tema}`)
      .pipe(take(1));
  }

  public GetEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public post(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseURL, evento).pipe(take(1));
  }

  public put(evento: Evento): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.baseURL}/${evento.id}`, evento)
      .pipe(take(1));
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

  postUpload(eventoId: number, file: File): Observable<Evento>{
    const fileToUpload = file;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http.post<Evento>(`${this.baseURL}/upload-image/${eventoId}`, formData).pipe(take(1));
  }
}
