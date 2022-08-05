import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  display = 'block';

  constructor(private router: Router) {}

  ngOnInit() {}

  showMenu() {
    return this.router.url !== '/user/login';
  }
}
