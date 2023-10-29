import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  logList: {_id: string, count:number, percentage: string}[] = []

  activeStateList:  {key: { active: number, notActive: number }}[] = []
  countsList:       [] = []

  constructor( ) {}

  ngOnInit(): void { }
  


}
