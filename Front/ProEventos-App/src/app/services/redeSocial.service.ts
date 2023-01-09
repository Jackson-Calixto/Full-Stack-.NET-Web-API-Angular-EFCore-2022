import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RedeSocial } from '@app/models/RedeSocial';
import { environment } from '@environments/environment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedeSocialService {
  baseURL = environment.apiURL + 'api/redesSociais';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param origem Precisa passar a palavra palestrante ou evento.
   * @param id Precisa passar o Id do evento caso a origem seja evento.
   * @returns Observable<RedeSocial[]>
   */
  public getRedesSociais(origem: string, id: number): Observable<RedeSocial[]> {
    let URL =
      id === 0
        ? `${this.baseURL}/${origem.toLowerCase()}`
        : `${this.baseURL}/${origem.toLowerCase()}/${id}`;
    return this.http.get<RedeSocial[]>(URL).pipe(take(1));
  }

  /**
   *
   * @param origem Precisa passar a palavra palestrante ou evento.
   * @param id Precisa passar o Id do evento caso a origem seja evento.
   * @param redesSociais Precisa passar as Redes Sociais como parametro.
   * @returns Observable<RedeSocial[]>
   */
  public saveRedesSociais(
    origem: string,
    id: number,
    redesSociais: RedeSocial[]
  ): Observable<RedeSocial[]> {
    let URL =
      id === 0
        ? `${this.baseURL}/${origem.toLowerCase()}`
        : `${this.baseURL}/${origem.toLowerCase()}/${id}`;
    return this.http.put<RedeSocial[]>(URL, redesSociais).pipe(take(1));
  }

  /**
   *
   * @param origem Precisa passar a palavra palestrante ou evento.
   * @param id Precisa passar o Id do evento caso a origem seja evento.
   * @param redeSocialId Precisa passar o ID da Rede Social como parametro.
   * @returns Observable<RedeSocial[]>
   */
  public deleteRedeSocial(
    origem: string,
    id: number,
    redeSocialId: number
  ): Observable<any> {
    let URL =
      id === 0
        ? `${this.baseURL}/${origem.toLowerCase()}/${redeSocialId}`
        : `${this.baseURL}/${origem.toLowerCase()}/${id}/${redeSocialId}`;
    return this.http.delete(URL).pipe(take(1));
  }
}
