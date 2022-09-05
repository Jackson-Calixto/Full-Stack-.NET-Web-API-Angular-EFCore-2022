import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, take } from 'rxjs';
import { Evento } from '../models/Evento';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class EventoService {

  baseURL = environment.apiURL + 'api/eventos';
  tokenHeader = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJqYWNrc29uIiwibmJmIjoxNjYyMzY0MzI5LCJleHAiOjE2NjI0NTA3MjksImlhdCI6MTY2MjM2NDMyOX0.3iYTGFIOidX3eLf7jLDMLVwD5PTXIYA-RKMvTyWMKeL5Q-DiN8QAqRr6gEf0VYmJw2yjnsoywd-01trXG7J4YA'
  });

  constructor(private http: HttpClient) {}

  public GetEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL, {headers: this.tokenHeader}).pipe(take(1));
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
