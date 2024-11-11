import { Component, OnInit } from '@angular/core';
import { AccountService } from '../srevices/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    localStorage.removeItem('securitKey');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
