import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
//  providers: [EventoService]
})
export class EventosComponent implements OnInit {

  filtrarEventos(filtrarPor: string): any {
    filtrarPor =  filtrarPor.toLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLowerCase().indexOf(filtrarPor) !== -1 ||
                       evento.local.toLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  public eventos: any;
  public eventosFiltrados: any;
  widthImg = 150;
  marginImg = 2;
  exibirImagem = true;
  private _filtroBusca = '';

  public get filtroBusca():string {
    return this._filtroBusca;
  }

  public set filtroBusca(value: string) {
    this._filtroBusca = value;
    this.eventosFiltrados = this.filtroBusca ? this.filtrarEventos(this.filtroBusca) : this.eventos;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
     this.getEventos();
  }

}
