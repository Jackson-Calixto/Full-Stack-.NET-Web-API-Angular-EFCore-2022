import { DatePipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatPipe } from '@app/helpers/DateFormat.pipe';
import { DateTimeFormatPipe } from '@app/helpers/DateTimeFormat.pipe';
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';
import { Constants } from '@app/util/constants';
import { moment } from 'ngx-bootstrap/chronos/testing/chain';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  modalRef?: BsModalRef;
  eventoId: any;
  loteAtual = {id: 0, nome:'', indice:0};
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';

  get modoEditar() {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig() {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      showTodayButton: true,
      containerClass: 'theme-default',
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRoute: ActivatedRoute,
    private eventoService: EventoService,
    private loteService: LoteService,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.localeService.use('pt-br');
  }

  carregarEvento() {
    this.eventoId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.eventoId !== null || this.eventoId === 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.GetEventoById(this.eventoId).subscribe(
        (evento: Evento) => {
          if (evento) {
            this.evento = { ...evento };
            this.form.patchValue(this.evento);
            this.form.controls['dataEvento'].setValue(
              this.datePipe.transform(
                this.evento.dataEvento,
                'dd/MM/yyyy HH:mm'
              )
            );
            this.evento.lotes.forEach((lote) => {
              this.lotes.push(this.criarLote(lote));
            });
            //this.carregarLotes();
          } else this.toastr.error('Evento inexistente!', 'Erro!');
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar Evento!', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide()
      );
    }
  }

  carregarLotes() {
    this.loteService
      .GetLoteByEventoId(this.eventoId)
      .subscribe(
        (lotes: Lote[]) => {
          lotes.forEach((lote) => {
            this.lotes.push(this.criarLote(lote));
          });
        },
        (err: any) => {
          this.toastr.error('Erro ao tentar carregar Lotes!', 'Erro!');
          console.error(err);
        }
      )
      .add(() => this.spinner.hide());
  }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  validation() {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
      lotes: this.fb.array([]),
    });
  }

  adicionarLote() {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [new DateFormatPipe().transform(lote.dataInicio)],
      dataFim: [new DateFormatPipe().transform(lote.dataFim)],
    });
  }

  resetForm() {
    this.form.reset();
  }

  cssValidator(campoForm: FormControl | AbstractControl | null) {
    return { 'is-invalid': campoForm?.errors && campoForm.touched };
  }

  salvarEvento() {
    this.spinner.show();
    if (this.form.valid) {
      this.evento =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.evento.id, ...this.form.value };

      (this.eventoService as any)[this.estadoSalvar](this.evento).subscribe(
        (eventoRetorno: Evento) => {
          this.toastr.success('Evento salvo com sucesso.', 'Sucesso');
          this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
        },
        (err: any) => {
          console.log(err);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar Evento.', 'Erro!');
        },
        () => {
          this.spinner.hide();
        }
      );
    }
  }

  salvarLote() {
    this.spinner.show();
    if (this.lotes.valid) {
      //this.dateFix(this.lotes.);
      //this.dateFix('dataFim');

      for (let i = 0; i < this.lotes.value.length; i++) {
        this.lotes.value[i].dataInicio = new DateFormatPipe().transform(
          this.lotes.value[i].dataInicio,
          'save'
        );
        this.lotes.value[i].dataFim = new DateFormatPipe().transform(
          this.lotes.value[i].dataFim,
          'save'
        );
      }

      this.loteService
        .SaveLotes(this.eventoId, this.form.value.lotes)
        .subscribe(
          () => {
            this.toastr.success('Lotes salvos com sucesso.', 'Sucesso');
          },
          (err: any) => {
            console.error(err);
            this.toastr.error('Erro ao salvar Lotes.', 'Erro!');
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  removerLote(template: TemplateRef<any>, indice: number) {
    this.loteAtual.indice = indice;
    this.loteAtual.id = this.lotes.value[indice].id;
    this.loteAtual.nome = this.lotes.value[indice].nome;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmRemoverLote() {
    this.modalRef?.hide();
    this.spinner.show();

    this.loteService
      .deleteLote(this.eventoId, this.loteAtual.id)
      .subscribe(
        () => {
          this.toastr.success('Lote excluido com sucesso.', 'Sucesso');
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (err: any) => {
          console.error(err);
          this.toastr.error('Erro ao tentar excluir Lote.', 'Erro!');
        }
      )
      .add(() => this.spinner.hide());
  }

  declineRemoverLote() {
    this.modalRef?.hide();
  }
}
