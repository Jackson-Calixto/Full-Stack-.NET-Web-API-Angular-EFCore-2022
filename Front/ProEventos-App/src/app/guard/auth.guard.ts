import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {}

  canActivate(): boolean {
    var auth = this.accountService.authenticated(localStorage.getItem('user'));
    if (auth) return true;

    this.toastr.info('Usuário não autenticado!');
    this.router.navigateByUrl('/user/login');
    return false;
  }
}
