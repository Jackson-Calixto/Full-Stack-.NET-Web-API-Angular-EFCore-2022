import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { environment } from '@environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario = {} as UserUpdate;
  imagemURL: any;
  file: File;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  get ehPalestrante(): boolean {
    return this.usuario.funcao === 'Palestrante';
  }

  setFormValue(usuario: UserUpdate): void {
    this.usuario = usuario;
    if (this.usuario.imagemURL)
      this.imagemURL = `${environment.apiURL}resources/perfil/${this.usuario.imagemURL}`
    else
      this.imagemURL = './assets/SemImagem.png';
  }

  onFileChange(ev: any) {
    const reader = new FileReader();

    reader.onload = (e: any) => (this.imagemURL = e.target.result);

    this.file = ev.target.files[0];

    reader.readAsDataURL(this.file);

    this.uploadImagem();
  }

  uploadImagem() {
    this.spinner.show();
    this.accountService
      .postUpload(this.file)
      .subscribe(
        () => {
          this.toastr.success('Imagem atualizada com sucesso.', 'Sucesso');
        },
        (err: any) => {
          console.error(err);
          this.toastr.error('Erro ao fazer upload de imagem.', 'Erro!');
        }
      )
      .add(() => this.spinner.hide());
  }
}
