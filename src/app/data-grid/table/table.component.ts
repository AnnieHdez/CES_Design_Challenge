import { Input, OnChanges, OnDestroy, TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableService } from 'src/app/shared/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tableName: string;
  @Input() collection: Object[];
  @Input() columnsNames: string[];
  @Input() columnsTypes: string[];
  @Input() columnsWidths: number[];
  @Input() headerTemplate: TemplateRef<any>;

  private pageChangeSub: Subscription;
  private recordsChangeSub: Subscription;

  numberOfColumns: number;
  p : number;
  recordsPerColum: number;

 ctx;
  
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
    this.ctx= {columnsNames: this.columnsNames, columnsWidths: this.columnsWidths};
  }

  ngOnChanges(){
    this.ctx= {columnsNames: this.columnsNames, columnsWidths: this.columnsWidths};
  }


  ngOnDestroy(): void{
    this.pageChangeSub.unsubscribe();
    this.recordsChangeSub.unsubscribe();
  }

}
