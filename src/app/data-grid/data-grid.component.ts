import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchDataService} from '../fetch-data.service';
import { TableService } from '../table.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit, OnDestroy {
  @Input() tableNames: string[] = ["table1","table2"];
  @Input() numberOfRecords: number[]  = [5,10,15];

  numberOfColumns: number;
  p: number;
  recordsPerColum:number;

  private pageChangeSub: Subscription;
  private recordsChangeSub: Subscription;
  private dataSub: Subscription;
  private errorSub: Subscription;

  tableName: string;
  selectedTable: number = 0;

  collection : Object[];
  columnsNames: string[];
  columnsTypes: string[];
  columnsWidths: number[];

  error: boolean = false;

  production = true;

  constructor(private fetchDataService: FetchDataService, private tableService: TableService) { }


  ngOnInit(): void {
    this.tableName= this.tableNames[this.selectedTable];

    this.fetchDataService.fetchData(this.production, this.tableName);

    this.dataSub = this.tableService.tableChanged.subscribe(
      newTable => {
        this.collection = newTable.data;
        this.columnsNames = newTable.columnsNames;
        this.columnsTypes = newTable.columnsTypes;
        this.columnsWidths = newTable.columnsWidths;
      },
    );

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

    this.errorSub = this.tableService.errorChanged.subscribe(
      (error) => {
        this.error = error;
      }

    )
  }

  toggleState(){
    this.tableService.updatePage(1);
    this.production = !this.production;
    this.fetchDataService.fetchData(this.production, this.tableName);
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

  changeTable(index){
    this.tableService.updatePage(1);
    this.selectedTable = index;
    this.tableName= this.tableNames[this.selectedTable];
    this.fetchDataService.fetchData(this.production, this.tableName);
  }

  onHandleError(){
    this.tableService.setError();
    this.production = false;
    this.fetchDataService.fetchData(this.production, this.tableNames[0]);
  }

  ngOnDestroy(): void{
    this.pageChangeSub.unsubscribe();
    this.recordsChangeSub.unsubscribe();
    this.dataSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

}
