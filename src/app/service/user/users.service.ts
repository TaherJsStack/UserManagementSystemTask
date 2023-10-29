import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleEnum } from '../../enums/role.enum';
import { UserModel } from '../../models/user';

const BACKEND_API = environment.API_URL + '';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersList: {
    email: string,
    password: string,
    role: number
  }[] = [
    {
      email: "admin@view.com",
      password: "123456",
      role: RoleEnum.admin
    },
    {
      email: "user@view.com",
      password: "123456",
      role: RoleEnum.user
    }
  ]

  token       = '';
  user        = new BehaviorSubject<Boolean>(false);
  getErrorMsg = new Subject<string>();
  isLogin     = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) { }


  getErrMsg() {
    return this.getErrorMsg.asObservable();
  }

  onLogin() {
    return this.isLogin.asObservable();
  }

  login(userData: {email: string, password: string}):  Promise<RoleEnum>{
    return new Promise( async (resolve, reject) => {{
      let user = this.usersList.find(user => user.email == userData.email && user.password == userData.password )
        if (user) {
          resolve(user.role)
        }
      }
      reject(false)
    })
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('fullInfo');
    this.isLogin.next(false)
    this.user.next(false);
  }

  // ------------------------------------------------------------------------

  getList(): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/photos')
  }

  getById(id: string) {
    return this.http.get<{  member: UserModel, message: string, status: any }>(BACKEND_API + 'getById/' + id)
  }

  update(id: string, member: {}): Observable<{ message: string, status: number  }>{
    return this.http
      .put<{ message: string, status: number }>
      (`${BACKEND_API}member/${id}`, member)
  }

  delete(id: string): Observable<{ message: string, status: number  }>{
    return this.http
      .delete<{ message: string, status: number  }>(`${BACKEND_API}/${id}`)
  }

}
