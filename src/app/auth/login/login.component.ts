import { Component, Inject, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleEnum } from 'src/app/enums/role.enum';
import { UserModel } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/service/app/localstorage.service';
import { UsersService } from 'src/app/service/user/users.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide  = true;
  form: UntypedFormGroup = new FormGroup({});
  isSubmited: boolean = false;
  user: UserModel = {} as UserModel;
  version = VERSION.full; 

  constructor(
    private fb:           FormBuilder,
    private router:       Router,
    private toastr:       ToastrService,
    private usersService: UsersService,
    private localstorageService:  LocalstorageService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.version = VERSION.full; 
   }

   ngOnInit(): void {
    this.initForm()
   }

  initForm() {
    this.form = this.fb.group({
      email:     new FormControl('', [Validators.required, Validators.email]),
      password:  new FormControl('', [Validators.required]),
    })
  }

  submit() {
    this.isSubmited = true;
    if (this.form.valid) {
      let userData = {
          email: this.form.controls['email'].value,
          password: this.form.controls['password'].value
        }
      this.usersService.login(userData)
      .then(existUserRole => {
        if (existUserRole && existUserRole === RoleEnum.admin) {
          this.router.navigateByUrl('/admin')
        } else if (existUserRole && existUserRole === RoleEnum.user) {
          this.router.navigateByUrl('/user')
        }
        this.localstorageService.saveUserDataInLocalStorage(existUserRole.toString(), userData)
        this.toastr.success(`Welcom ${RoleEnum[existUserRole]}`)
      },
       err => {
        this.toastr.error(`Sorry, you don't have an account`)
       })
    }
  }



}
