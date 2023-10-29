import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserModel } from 'src/app/models/user';
import { selectUser } from 'src/app/Store/actions/user.actions';
import { getSelectedUserIdEntity } from 'src/app/Store/reducers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserModel     = {} as UserModel;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}
  
  async ngOnInit() {
    this.subscribeRouteParams()
    this. getUserData()
  }

  subscribeRouteParams() {
    this.route.params.subscribe(res => {
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
        this.user = data
      }
    });
  }

  
}
