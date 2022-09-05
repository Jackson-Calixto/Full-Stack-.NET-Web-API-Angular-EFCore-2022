import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '@app/models/identity/UserLogin';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = {} as UserLogin;

  constructor(public accountService: AccountService,
              private router: Router,
              private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  public login(){
    this.accountService.login(this.model).subscribe(
      () => {this.router.navigateByUrl('/dashboard');},
      (error: any) => {
        if (error.status == 401)
          this.toaster.error('Usuário ou senha inválidos');
        else
          console.error(error);
      }
    );
  }
}
