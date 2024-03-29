import { DatePipe, formatDate, JsonPipe, KeyValuePipe } from '@angular/common';
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
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';
import { Constants } from '@app/util/constants';
import { environment } from '@environments/environment';
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
  loteAtual = { id: 0, nome: '', indice: 0 };
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';
  imagemURL = 'assets/upload.png';
  file: any;

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
      dateInputFormat: 'MM/DD/YYYY HH:mm',
      showTodayButton: true,
      containerClass: 'theme-default',
    };
  }

  get bsConfigLote() {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'MM/DD/YYYY',
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

  // dataEventoChange(data: Date) {
  //   this.form.value.dataEvento = data;
  //   this.evento.dataEvento = data;
  // }

  // dataInicioChange(data: any, field: any) {
  //   field.dataInicio = new DateFormatPipe().transform(data, 'change');
  // }

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

            if (this.evento.imagemURL !== '')
              this.imagemURL = environment.apiURL + 'resources/images/' + this.evento.imagemURL;

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
      imagemURL: [''],
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
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
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

  onFileChange(ev: any) {
    const reader = new FileReader();

    reader.onload = (e: any) => (this.imagemURL = e.target.result);

    this.file = ev.target.files[0];

    reader.readAsDataURL(this.file);

    this.uploadImagem();
  }

  uploadImagem(){
    this.spinner.show();
    this.eventoService.postUpload(this.eventoId, this.file).subscribe(
      () => {
        this.carregarEvento();
        this.toastr.success('Sessão carregada com sucesso.', 'Sucesso');
      },
      (err: any) => {
        console.error(err);
        this.toastr.error('Erro ao tentar carrgar.', 'Erro!');
      }
    ).add(() => this.spinner.hide());
  }
}
