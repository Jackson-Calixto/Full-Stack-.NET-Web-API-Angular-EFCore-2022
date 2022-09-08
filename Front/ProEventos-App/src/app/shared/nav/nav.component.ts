import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  display = 'block';

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/user/login');
  }

  ShowNav(obj: any) {
    return this.accountService.authenticated(obj);
  }
}
