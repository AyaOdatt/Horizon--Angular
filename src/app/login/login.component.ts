import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../srevices/account.service';
import { signup } from '../DTO/signup';
import { login } from '../DTO/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginform = this.formBuilder.group({
      txtUsername: ['', Validators.required],
      txtPassword: ['', Validators.required],
    });
  }

  save() {
    debugger;
    if (this.loginform.valid) {
      var User = new login();

      User.email = this.loginform.value['txtUsername'];
      User.password = this.loginform.value['txtPassword'];

      this.accountService.login(User).subscribe({
        next: (data) => {
          debugger;
          localStorage.setItem('securitKey', data.token);
          this.accountService
            .getLoggedInUser(this.loginform.value['txtUsername'])
            .subscribe({
              next: (data) => {
                console.log(data);

                localStorage.setItem('loggedInUser', JSON.stringify(data));
                this.router.navigate(['/home']);
              },
              error: () => {
                console.log('Error occurred ');
              },
            });
        },
        error: () => {
          console.log('Error occurred during login');
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'login failed!',
      });
      this.router.navigate(['/login']);
    }
  }
  goToRegisterPage() {
    this.router.navigate(['/signup']);
  }
}
