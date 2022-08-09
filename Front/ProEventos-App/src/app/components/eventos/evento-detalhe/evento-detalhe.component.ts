import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateTimeFormatPipe } from '@app/helpers/DateTimeFormat.pipe';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { moment } from 'ngx-bootstrap/chronos/testing/chain';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  form!: FormGroup;
  evento = {} as Evento;

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
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  carregarEvento() {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();
      this.eventoService.getEvento(+eventoIdParam).subscribe(
        (evento: Evento) => {
          if (evento) {
            this.evento = { ...evento };
            this.form.patchValue(this.evento);
            this.form.controls['dataEvento'].setValue(
            this.datePipe.transform(this.evento.dataEvento, 'dd/MM/yyyy HH:mm')
            );
          }
          else this.toastr.error('Evento inexistente!', 'Erro!');
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
    });
  }

  resetForm() {
    this.form.reset();
  }

  cssValidator(campoForm: FormControl) {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }
}
