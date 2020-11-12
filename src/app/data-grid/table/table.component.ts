import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/table.model';
import { TableService } from 'src/app/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() tableName: string;
  @Input() collection: Table;
  numberOfColumns: number;
  private pageChangeSub: Subscription;
  private recordsChangeSub: Subscription;
  p : number;
  recordsPerColum: number;
  

  
  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.p = this.tableService.getPage();

    this.pageChangeSub = this.tableService.changedPage.subscribe(
      (newPage)=>{
        this.p = newPage;
      }
    );

    this.recordsPerColum =this.tableService.getRecord();

    this.recordsChangeSub = this.tableService.recordsPerColumChanged.subscribe(
      (newRecord)=>{
        this.recordsPerColum = newRecord;
      }
    );
  }


  ngOnDestroy(): void{
    this.pageChangeSub.unsubscribe();
    this.recordsChangeSub.unsubscribe();
  }

}
