import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDataListComponent } from './users-data-list.component';

describe('UsersDataListComponent', () => {
  let component: UsersDataListComponent;
  let fixture: ComponentFixture<UsersDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDataListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
