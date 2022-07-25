import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any;
  widthImg = 150;
  marginImg = 2;
  exibirImagem = true;
  filtroBusca = '';

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => this.eventos = response,
      error => console.log(error)
    );
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
     this.getEventos();
  }

}
