import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RedeSocial } from '@app/models/RedeSocial';
import { EventoService } from '@app/services/evento.service';
import { RedeSocialService } from '@app/services/redeSocial.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-redesSociais',
  templateUrl: './redesSociais.component.html',
  styleUrls: ['./redesSociais.component.css'],
})
export class RedesSociaisComponent implements OnInit {
  modalRef: BsModalRef;
  @Input() eventoId: number = 0;
  public formRS!: FormGroup;
  public redeSocialAtual = { id: 0, nome: '', indice: 0 };

  public get redesSociais(): FormArray {
    return this.formRS.get('redesSociais') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private redeSocialService: RedeSocialService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.carregarRedeSocial();
    this.validation();
  }

  carregarRedeSocial(): void {
    let origem = 'Palestrante';

    if (this.eventoId !== 0) origem = 'Evento';

    this.spinner.show();

    this.redeSocialService
      .getRedesSociais(origem, this.eventoId)
      .subscribe(
        (redeSocialRetorno: RedeSocial[]) => {
          redeSocialRetorno.forEach((redeSocial: RedeSocial) => {
            this.redesSociais.push(this.criarRedeSocial(redeSocial));
          });
        },
        (error) => {
          this.toastr.error('Erro ao tentar carregar Rede Social!', 'Erro!');
          console.log(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  validation(): void {
    this.formRS = this.fb.group({
      redesSociais: this.fb.array([]),
    });
  }

  cssValidator(campoForm: FormControl | AbstractControl | null) {
    return { 'is-invalid': campoForm?.errors && campoForm.touched };
  }

  public retornaTitulo(nome: string): string {
    return nome === null || nome === '' ? 'Rede Social' : nome;
  }

  adicionarRedeSocial() {
    this.redesSociais.push(this.criarRedeSocial({ id: 0 } as RedeSocial));
  }

  criarRedeSocial(redeSocial: RedeSocial): FormGroup {
    return this.fb.group({
      id: [redeSocial.id],
      nome: [redeSocial.nome, Validators.required],
      url: [redeSocial.url, Validators.required],
    });
  }

  salvarRedesSociais() {
    let origem = 'Palestrante';

    if (this.eventoId !== 0) origem = 'Evento';

    this.spinner.show();
    if (this.redesSociais.valid) {
      this.redeSocialService
        .saveRedesSociais(origem, this.eventoId, this.formRS.value.redesSociais)
        .subscribe(
          () => {
            this.toastr.success('Redes Sociais salvas com sucesso.', 'Sucesso');
          },
          (err: any) => {
            console.error(err);
            this.toastr.error('Erro ao salvar Redes Sociais.', 'Erro!');
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  removerRedeSocial(template: TemplateRef<any>, indice: number) {
    this.redeSocialAtual.indice = indice;
    this.redeSocialAtual.id = this.redesSociais.value[indice].id;
    this.redeSocialAtual.nome = this.redesSociais.value[indice].nome;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDeleteRedeSocial() {
    let origem = 'Palestrante';

    if (this.eventoId !== 0) origem = 'Evento';

    this.modalRef?.hide();
    this.spinner.show();

    this.redeSocialService
      .deleteRedeSocial(origem, this.eventoId, this.redeSocialAtual.id)
      .subscribe(
        () => {
          this.toastr.success('Rede Social excluida com sucesso.', 'Sucesso');
          this.redesSociais.removeAt(this.redeSocialAtual.indice);
        },
        (err: any) => {
          console.error(err);
          this.toastr.error('Erro ao tentar excluir Rede Social.', 'Erro!');
        }
      )
      .add(() => this.spinner.hide());
  }

  declineDeleteRedeSocial() {
    this.modalRef?.hide();
  }
}
