import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()

export class EventoService {
  baseURL = 'https://localhost:5001/api/eventos';

  constructor(private http: HttpClient) {}

  public getEventos() {
    return this.http.get(this.baseURL);
  }
}
