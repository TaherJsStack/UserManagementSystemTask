
import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/models/user';
import { DialogComponent } from 'src/app/shared/dialog/dialog/dialog.component';

import { Store, select} from '@ngrx/store';
import {
  userEntities,
  getApiError,
  getApiLoading,
  fetchUsersListPaginationSuccess
} from '../../../../../Store/reducers';
import { UserActions } from '../../../../../Store/actions';

import { deleteUser } from 'src/app/Store/actions/user.actions';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-data-list',
  templateUrl: './users-data-list.component.html',
  styleUrls: ['./users-data-list.component.scss']
})

export class UsersDataListComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['_id', 'name', 'imgPath', 'email', 'createdAt', 'action'];
  
  usersList: UserModel[] = [] 
  dataSource = new MatTableDataSource<UserModel>(this.usersList);
  
  @ViewChild(MatPaginator, { static : true}) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  
  length          = 0;
  pageSize        = 10;
  pageIndex       = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;
  
  error$:        Observable<HttpErrorResponse | undefined>  = this.store.pipe(select(getApiError));
  isLoading$:    Observable<boolean | undefined>            = this.store.pipe(select(getApiLoading));
  userEntities$: Observable<UserModel[]>                    = this.store.pipe(select(userEntities))
  
  constructor(
    public  dialog: MatDialog,
    private store: Store,
  ) {

    this.store.pipe(select(userEntities)).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(UserActions.fetchUsersListStart());
      }
    })
    
  }
  
  ngOnInit(): void { 
    this.subscribeUserDataList()
  }
  
  ngAfterViewInit() { }
  
  subscribeUserDataList() {
    this.store.dispatch(UserActions.fetchUsersListPagination({ pageNo:this.pageIndex, pageSize: this.pageSize}));
    this.store.pipe(select(fetchUsersListPaginationSuccess)).subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data);
      this.pageIndex  = res.selectedpageNo;
      this.pageIndex  = res.selectedpageSize
      this.length     = res.totalItems
    });
  }
  
  paginatorPageEvent(event: PageEvent) {
    this.pageIndex  = event.pageIndex + 1;
    this.length     = event.length;
    this.pageSize   = event.pageSize;
    this.store.dispatch(UserActions.fetchUsersListPagination({ pageNo:this.pageIndex, pageSize: this.pageSize}));
  }

  confirmDelete(id: number, name: string): void {
    const dialogRef = this.dialog.open(DialogComponent,{
      data: {type:'delete', name: 'Delete', message: `Would you like to delete ${ name }`,},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
      }
    });
  }

  delete(id: number){
    this.store.dispatch(deleteUser({ id }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

