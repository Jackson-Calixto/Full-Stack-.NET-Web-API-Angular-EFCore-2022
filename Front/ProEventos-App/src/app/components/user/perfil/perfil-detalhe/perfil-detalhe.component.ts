import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.css'],
})
export class PerfilDetalheComponent implements OnInit {
  userUpdate = {} as UserUpdate;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
  }

  carregarUsuario() {
    this.spinner.show();
    this.accountService
      .getUser()
      .subscribe(
        (userRetorno: UserUpdate) => {
          console.log(userRetorno);
          this.userUpdate = userRetorno;
          this.userUpdate.confirmarPassword = this.userUpdate.password;
          this.form.patchValue(this.userUpdate);
          this.toaster.success('Usuário Carregado', 'Sucesso');
        },
        (error) => {
          console.error(error);
          this.toaster.error('Usuário não Carregado', 'Erro!');
          this.router.navigate(['/dashboard']);
        }
      )
      .add(() => this.spinner.hide());
  }

  validation() {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmarPassword'),
    };

    this.form = this.fb.group(
      {
        userName: [''],
        titulo: ['NaoInformado', Validators.required],
        primeiroNome: ['', Validators.required],
        ultimoNome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        funcao: ['NaoInformado', Validators.required],
        descricao: ['', Validators.required],
        password: ['', [Validators.minLength(4), Validators.nullValidator]],
        confirmarPassword: ['', Validators.nullValidator],
      },
      formOptions
    );
  }

  onSubmit() {
    this.atualizarUsuario();
  }

  atualizarUsuario() {
    this.userUpdate = { ...this.form.value };
    this.spinner.show();

    this.accountService
      .updadeUser(this.userUpdate)
      .subscribe(
        () => this.toaster.success('Usuário Atualizado', 'Sucesso'),
        (error) => {
          this.toaster.error(error.error);
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  resetForm(event: any) {
    event.preventDefault();
    this.form.reset();
  }

  cssValidator(campoForm: FormControl) {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  get f(): any {
    return this.form.controls;
  }
}
