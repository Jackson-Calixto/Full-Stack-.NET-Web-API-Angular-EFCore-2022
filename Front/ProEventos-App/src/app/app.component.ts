import { Component } from '@angular/core';
import { User } from './models/identity/User';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public accountService: AccountService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let user: User;

    user = localStorage.getItem('user')
      ? (JSON.parse(localStorage.getItem('user')!.toString()) as User)
      : ({} as User);

    if (user) this.accountService.setCurrentUser(user);
  }
}
