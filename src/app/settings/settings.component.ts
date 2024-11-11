import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../srevices/account.service';
import { updateInfo } from '../DTO/updateInfo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settingsform!: FormGroup;
  loggedInUser: any;
  profilePhoto: any;
  profileCover: any;
  constructor(
    private accountService: AccountService,
    private formbuilder: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    debugger;
    const userInfo = localStorage.getItem('loggedInUser');
    this.loggedInUser = userInfo ? JSON.parse(userInfo) : null;
    console.log('user' + this.loggedInUser);

    this.checkForm();
    this.updateValues();
  }

  checkForm() {
    this.settingsform = this.formbuilder.group({
      txtfName: [''],
      txtlName: [''],
      profileImage: [''],
      coverImage: [''],
      txtOldPassword: [''],
      txtNewPassword: [''],
      txtConfirmPassword: [''],
    });
  }
  onFileSelected(file: any) {
    debugger;
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = (_event) => {
      console.log(reader.result);
      this.profilePhoto = reader.result;
    };
  }
  onCoverSelected(file: any) {
    debugger;
    let reader2 = new FileReader();
    reader2.readAsDataURL(file.target.files[0]);
    reader2.onload = (_event) => {
      console.log(reader2.result);
      this.profileCover = reader2.result;
    };
  }

  updateValues() {
    this.settingsform.controls['txtfName'].setValue(
      this.loggedInUser.firstName
    );
    this.settingsform.controls['txtlName'].setValue(this.loggedInUser.lastName);
    this.settingsform.controls['profileImage'].setValue(
      this.loggedInUser.profileImage
    );
    this.settingsform.controls['coverImage'].setValue(
      this.loggedInUser.coverImage
    );
    this.settingsform.controls['txtOldPassword'].setValue('');
    this.settingsform.controls['txtNewPassword'].setValue('');
    this.settingsform.controls['txtConfirmPassword'].setValue('');
  }
  edit() {
    debugger;
    const newInfo = new updateInfo();
    newInfo.firstName = this.settingsform.controls['txtfName'].value;
    newInfo.lastName = this.settingsform.controls['txtlName'].value;
    newInfo.profileImage = this.profilePhoto;
    newInfo.coverImage = this.profileCover;
    newInfo.oldPassword = this.settingsform.controls['txtOldPassword'].value;
    newInfo.newPassword = this.settingsform.controls['txtNewPassword'].value;
    newInfo.confirmPassword =
      this.settingsform.controls['txtConfirmPassword'].value;

    console.log('new user' + newInfo);

    this.accountService.updateInfo(newInfo, this.loggedInUser.id).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your profile has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.accountService.getUserById(this.loggedInUser.id).subscribe({
              next: (data) => {
                localStorage.setItem('loggedInUser', JSON.stringify(data));
                this.router.navigate(['/profile']);
              },
              error: () => {
                console.log('error happened');
              },
            });
          }
        });
      },
      error: (err) => {
        console.error('error at updating the profile', err);
        console.log('error happened');
      },
    });
  }
}
