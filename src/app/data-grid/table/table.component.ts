import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/shared/table.model';
import { TableService } from 'src/app/shared/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() tableName: string;
  @Input() collection: Object[];
  @Input() columnsNames: string[];
  @Input() columnsTypes: string[] = [];
  @Input() columnsWidths: number[] = [];

  private pageChangeSub: Subscription;
  private recordsChangeSub: Subscription;

  numberOfColumns: number;
  p : number;
  recordsPerColum: number;
  
  constructor(private tableService: TableService) { }

  ngOnInit(): void {

    this.pageChangeSub = this.tableService.changedPage.subscribe(
      (newPage)=>{
        this.p = newPage;
      }
    );

    this.p = this.tableService.getPage();

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
