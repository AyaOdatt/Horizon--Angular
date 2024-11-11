import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from '../DTO/user';
import { signup } from '../DTO/signup';
import { AccountService } from '../srevices/account.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupform!: FormGroup;

  constructor(
    private AccountService: AccountService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkForm();
  }

  checkForm() {
    this.signupform = this.formbuilder.group({
      txtName: ['', Validators.required],
      txtLastName: ['', Validators.required],
      txtEmail: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      txtDOB: ['', Validators.required],
      txtGender: ['', Validators.required],
      txtPassword: ['', Validators.required],
      txtConfirmPassword: ['', Validators.required],
    });
  }

  save() {
    debugger;
    if (this.signupform.valid) {
      var user = new signup();
      user.firstName = this.signupform.value['txtName'];
      user.lastName = this.signupform.value['txtLastName'];
      user.email = this.signupform.value['txtEmail'];
      user.dob = this.signupform.value['txtDOB'];
      user.gender = this.signupform.value['txtGender'];
      user.password = this.signupform.value['txtPassword'];
      user.confirmPassword = this.signupform.value['txtConfirmPassword'];
      // user.profilePhotoUrl = this.profilePhoto;

      console.log('User data:', user);

      this.AccountService.createAccount(user).subscribe({
        next: (data) => {
          console.log('API Response:', data);
          if (data.message === 'User created successfully') {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'User registered successfully!',
            });
            this.router.navigate(['/']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'User registered failed!',
            });
          }
        },
        error: (err) => {
          console.error('Error Response:', err);
          console.log('error happened');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User registered failed!',
          });
        },
      });
    }
  }
}
