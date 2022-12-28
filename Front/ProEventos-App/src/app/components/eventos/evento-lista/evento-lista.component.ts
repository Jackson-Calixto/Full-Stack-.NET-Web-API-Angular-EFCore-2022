import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { environment } from '@environments/environment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss'],
})
export class EventoListaComponent implements OnInit {
  modalRef: any;

  public eventos: Evento[];

  public widthImg = 150;
  public marginImg = 2;
  public exibirImagem = true;
  private filtroListado = '';
  public eventoId = 0;
  public pagination = {} as Pagination;

  filtrarEventos(evt: any): void {
    this.eventoService
      .GetEventos(this.pagination.currentPage, this.pagination.pageSize, evt.value)
      .subscribe(
        (paginatedResult: PaginatedResult<Evento[]>) => {
          this.eventos = paginatedResult.result ?? [];
          this.pagination = paginatedResult.pagination;
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          this.toastr.error('Erro ao carreger os eventos', 'Erro!');
        }
      );
  }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      pageSize: 3,
      totalCount: 1,
    } as Pagination;

    this.getEventos();
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.spinner.show();

    this.eventoService
      .GetEventos(this.pagination.currentPage, this.pagination.pageSize)
      .subscribe(
        (paginatedResult: PaginatedResult<Evento[]>) => {
          this.eventos = paginatedResult.result ?? [];
          this.pagination = paginatedResult.pagination;
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          this.toastr.error('Erro ao carreger os eventos', 'Erro!');
        }
      )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number) {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.eventoService
      .delete(this.eventoId)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O evento foi excluido com sucesso.',
              'Excluido!'
            );
            this.getEventos();
          }
        },
        (error: any) => {
          console.log(error);
          this.toastr.error(
            `Erro ao tentar excluir o evento código ${this.eventoId}.`,
            'Erro!'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  eventoDetalhe(id: number) {
    this.router.navigate([`/eventos/detalhe/${id}`]);
  }

  eventoImagem(imagem: string) {
    return imagem !== ''
      ? environment.apiURL + 'resources/images/' + imagem
      : 'assets/SemImagem.png';
  }

  pageChanged($event: PageChangedEvent) {
    this.pagination.currentPage = $event.page;
    this.getEventos();
  }
}
