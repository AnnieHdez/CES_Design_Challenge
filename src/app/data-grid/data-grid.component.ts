import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchDataService} from '../fetch-data.service';
import { Table } from '../table.model';
import { TableService } from '../table.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit, OnDestroy {
  @Input() tableName: string = "Default Table";
  @Input() numberOfRecords: number[]  = [5,10,15];

  numberOfColumns: number;
  p: number;
  recordsPerColum:number;

  private pageChangeSub: Subscription;
  private recordsChangeSub: Subscription;
  private dataSub: Subscription;

  tables = ["Table1", "table2", "table3", "Table4"]
  selectedTable = "Table1";

  collection : Object[];
  columnsNames: string[];
  columnsTypes: string[];
  columnsWidths: number[];

  constructor(private fetchDataService: FetchDataService, private tableService: TableService) { }


  ngOnInit(): void {
    this.fetchDataService.fetchData();

    this.dataSub = this.tableService.tableChanged.subscribe(
      (newTable)=>{
        this.collection = newTable.data;
        this.columnsNames = newTable.columnsNames;
        this.columnsTypes = newTable.columnsTypes;
        this.columnsWidths = newTable.columnsWidths;
      }
    )

    this.tableService.updateRecord(this.numberOfRecords[0])
    this.recordsChangeSub = this.tableService.recordsPerColumChanged.subscribe(
      (newRecords)=>{
        this.recordsPerColum = newRecords;
      }
    );

    this.pageChangeSub = this.tableService.changedPage.subscribe(
      (newPage)=>{
        this.p = newPage;
      }
    );
  }

  toggleState(){
    this.fetchDataService.fetchData();
    // this.collection = this.tableService.element;
  }

  changeValue(option){
    console.log(this.recordsPerColum);
    this.recordsPerColum = option.target.value;
    this.tableService.updateRecord(this.recordsPerColum);
    this.tableService.updatePage(1);
  }

  onPageChange(page: number){
    this.p = page;
    this.tableService.updatePage(page);
  }

  ngOnDestroy(): void{
    this.pageChangeSub.unsubscribe();
    this.recordsChangeSub.unsubscribe();
    this.dataSub.unsubscribe();
  }

}
