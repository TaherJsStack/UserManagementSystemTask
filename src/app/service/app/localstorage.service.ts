import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RoleEnum } from 'src/app/enums/role.enum';
import { UserModel } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService implements OnInit {

  roleEnum = RoleEnum
  user:UserModel = {} as UserModel;

  constructor() { }

  ngOnInit(): void {
    this.getUserData()  
  }

  saveUserDataInLocalStorage(userRole: string, fullInfo: {} ) {

    localStorage.setItem('userId',    'userId');
    localStorage.setItem('token',     'token');
    localStorage.setItem('userRole',  userRole);
    localStorage.setItem('fullInfo',  JSON.stringify(fullInfo));
  }

  async getUserData():  Promise<UserModel>{
    return new Promise( async (resolve, reject) => {
      if ('fullInfo' in localStorage) {      
        let user     = await localStorage.getItem("fullInfo")
        this.user = await JSON.parse(user as string) as UserModel;
        return resolve(this.user as UserModel)
      }
      reject()
    })
  }
  

  // /--------------------------------------------------------
  hasToken(): Observable<boolean> {
    // You can implement the logic to check the authentication state here
    // For example, you can check if the user has a valid token
    const token =  'token' in localStorage
    return of(token);
  }

  // Method to retrieve user roles from localStorage and check if any of the specified roles match
  userRole(): Observable<boolean> {
    const userRole: UserModel = JSON.parse(localStorage.getItem("fullInfo") as string);
    if (userRole) {     
      return of(userRole.role === this.roleEnum.admin);
    }
    return of(false);
  }

  getRole(): Observable<string> {
    if ('userRole' in localStorage) {      
      const userRole = localStorage.getItem("userRole");
      if (userRole) {  
        return of(userRole);
      }
    }
    return of('0');
  }

  userPermeation(): Observable<number[]> {
    const userRole: UserModel = JSON.parse(localStorage.getItem("fullInfo") as string);
    if (userRole) {     
      return of(userRole.permeation);
    }
    return of([]);
  }

    
}
