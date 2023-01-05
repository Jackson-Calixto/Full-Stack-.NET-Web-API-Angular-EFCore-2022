import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { environment } from '@environments/environment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-palestrante-lista',
  templateUrl: './palestrante-lista.component.html',
  styleUrls: ['./palestrante-lista.component.css']
})
export class PalestranteListaComponent implements OnInit {
  modalRef: any;

  public palestrantes: Palestrante[];

  public widthImg = 150;
  public marginImg = 2;
  public exibirImagem = true;
  private filtroListado = '';
  public palestranteId = 0;
  public pagination = {} as Pagination;

  termoBuscaChanged: Subject<string> = new Subject<string>();

  filtrarPalestrantes(evt: any): void {
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged
        .pipe(debounceTime(750))
        .subscribe((filtrarPor) => {
          this.spinner.show();
          this.palestranteService
            .GetPalestrantes(
              this.pagination.currentPage,
              this.pagination.pageSize,
              filtrarPor
            )
            .subscribe(
              (paginatedResult: PaginatedResult<Palestrante[]>) => {
                this.palestrantes = paginatedResult.result ?? [];
                this.pagination = paginatedResult.pagination;
              },
              (error) => {
                console.log(error);
                this.spinner.hide();
                this.toastr.error('Erro ao carreger os palestrantes', 'Erro!');
              }
            )
            .add(() => this.spinner.hide());
        });
    }
    this.termoBuscaChanged.next(evt.value);
  }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
  }

  constructor(
    private palestranteService: PalestranteService,
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

    this.getPalestrantes();
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getPalestrantes(): void {
    this.spinner.show();

    this.palestranteService
      .GetPalestrantes(this.pagination.currentPage, this.pagination.pageSize)
      .subscribe(
        (paginatedResult: PaginatedResult<Palestrante[]>) => {
          this.palestrantes = paginatedResult.result ?? [];
          this.pagination = paginatedResult.pagination;
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          this.toastr.error('Erro ao carreger os palestrantes', 'Erro!');
        }
      )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, palestranteId: number) {
    event.stopPropagation();
    this.palestranteId = palestranteId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  // confirm(): void {
  //   this.modalRef.hide();
  //   this.spinner.show();

  //   this.palestranteService
  //     .delete(this.palestranteId)
  //     .subscribe(
  //       (result: any) => {
  //         if (result.message === 'Deletado') {
  //           this.toastr.success(
  //             'O palestrante foi excluido com sucesso.',
  //             'Excluido!'
  //           );
  //           this.getPalestrantes();
  //         }
  //       },
  //       (error: any) => {
  //         console.log(error);
  //         this.toastr.error(
  //           `Erro ao tentar excluir o palestrante código ${this.palestranteId}.`,
  //           'Erro!'
  //         );
  //       }
  //     )
  //     .add(() => this.spinner.hide());
  // }

  decline(): void {
    this.modalRef.hide();
  }

  palestranteDetalhe(id: number) {
    this.router.navigate([`/palestrantes/detalhe/${id}`]);
  }

  palestranteImagem(imagem: string) {
    return imagem !== ''
      ? environment.apiURL + 'resources/images/' + imagem
      : 'assets/SemImagem.png';
  }

  pageChanged($event: PageChangedEvent) {
    this.pagination.currentPage = $event.page;
    this.getPalestrantes();
  }
}
