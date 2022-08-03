import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  //  providers: [EventoService]
})
export class EventosComponent implements OnInit {
  modalRef: any;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public widthImg = 150;
  public marginImg = 2;
  public exibirImagem = true;
  private filtroListado = '';

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.eventos.filter(
      (evento: any) =>
        evento.tema.toLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
        this.toastr.error('Erro ao carreger os eventos', 'Erro!');
      },
      complete: () => this.spinner.hide(),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O evento foi excluido com sucesso...', 'Excluido!');
  }

  decline(): void {
    this.modalRef.hide();
  }
}
