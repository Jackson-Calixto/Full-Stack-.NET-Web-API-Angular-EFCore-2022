import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  validation() {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmarSenha')
    };

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      funcao: ['', Validators.required],
      descricao: ['', Validators.required],
      senha: ['', [Validators.minLength(6)]],
      confirmarSenha: [''],
    }, formOptions);
  }

  onSubmit(){
    if (this.form.invalid){
      // Vai encerrar aqui se o form estiver inválido.
      return;
    }
  }

  resetForm(event: any) {
    event.preventDefault();
    this.form.reset();
  }

  cssValidator(campoForm: FormControl){
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }
}
