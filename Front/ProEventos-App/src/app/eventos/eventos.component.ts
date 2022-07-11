import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public evento: any = {
    Tema: 'Angular',
    Local: 'Belo Horizonte'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
