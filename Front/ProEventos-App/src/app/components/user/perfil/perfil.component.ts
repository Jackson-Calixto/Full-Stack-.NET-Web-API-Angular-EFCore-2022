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

  carregarUsuario() {
    this.spinner.show();
    this.accountService
      .getUser()
      .subscribe(
        (userRetorno: UserUpdate) => {
          console.log(userRetorno);
          this.usuario = userRetorno;
          this.usuario.confirmarPassword = this.usuario.password;
          this.toastr.success('Usuário Carregado', 'Sucesso');
        },
        (error) => {
          console.error(error);
          this.toastr.error('Usuário não Carregado', 'Erro!');
          this.router.navigate(['/dashboard']);
        }
      )
      .add(() => this.spinner.hide());
  }
}
