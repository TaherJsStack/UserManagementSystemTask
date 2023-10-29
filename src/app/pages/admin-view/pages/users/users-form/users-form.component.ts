import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { selectUser } from 'src/app/Store/actions/user.actions';
import { getSelectedUserIdEntity } from 'src/app/Store/reducers';
import { UserModel } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { UserActions } from 'src/app/Store/actions';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  user: UserModel = {} as UserModel;
  
  title = 'Angular Form s';
  form: FormGroup = new FormGroup({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private toastr:  ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUserData();
    this.subscribeRouteParams()
  }
  
  initForm() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      albumId: new FormControl('', [Validators.required]),
      thumbnailUrl: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      url:  new FormControl('', [Validators.required]),
    })
  }
  
  subscribeRouteParams() {
    this.activatedRoute.params.subscribe(res => {
      if (res['userId']) {
        this.storeDispatchSelectUser(res['userId'])
      }
    })
  }
  
  storeDispatchSelectUser(userId: number) {
    this.store.dispatch(selectUser({ userId }));
  }

  getUserData() {
    this.store.pipe(select(getSelectedUserIdEntity)).subscribe((data) => {
      if (data) {
        this.setFormValues(data)
        this.user = data
      } 
    });
  }

  async setFormValues(data: UserModel | any) {
    let formInput: {[key: string]: string} = {}
    for ( const c in this.form.controls) {
      formInput[c] = await data[c]
    }
    this.form.patchValue(formInput)
  }

  updateUser() {
    
    let updateData: UserModel = {
      albumId:       this.form.controls['albumId'].value,
      phone:         this.form.controls['phone'].value,
      name:          this.form.controls['name'].value,
      email:         this.form.controls['email'].value,
      thumbnailUrl:  this.user.thumbnailUrl,
      title:         this.user.title,
      url:           this.user.url,

      id:            this.user.id,
      password:      this.user.password,
      role:          this.user.role,
      permeation:    this.user.permeation,
      imageUrl:      this.user.imageUrl,
      description:   this.user.description,
      activestate:   this.user.activestate,
      governorate:   this.user.governorate,
      city:          this.user.city,
      area:          this.user.area,
      floorNo:       this.user.floorNo,
      streetNo:      this.user.streetNo,
      buildingNo:    this.user.buildingNo,
      apartmentNo:   this.user.apartmentNo,
      createdAt:     this.user.createdAt,
      updatedAt:     this.user.updatedAt,
      showInWebsite: this.user.showInWebsite,
    };

    if (this.user && this.user.id) {
      this.store.dispatch(UserActions.updateUser({ updateUserModelData: updateData }));
      this.toastr.success('update user data d0ne....')
      this.router.navigateByUrl('/admin/users')
    } 

    this.form.reset();
  }

}
