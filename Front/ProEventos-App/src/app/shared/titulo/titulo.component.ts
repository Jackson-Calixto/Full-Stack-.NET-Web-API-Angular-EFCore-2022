import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() subtitulo: string = 'Desde 2022';
  @Input() iconClass: string = 'fa fa-user';
  @Input() botaoListar = false;

  constructor() { }

  ngOnInit() {
  }

}
