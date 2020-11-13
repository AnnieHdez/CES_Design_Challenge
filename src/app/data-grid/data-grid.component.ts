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
  @Input() tableNames: string[] = ["products","employees"];
  @Input() numberOfRecords: number[]  = [5,10,15];

  private pageChangeSub: Subscription;
  private recordsChangeSub: Subscription;
  private dataSub: Subscription;
  private errorSub: Subscription;
  private tableNameSub: Subscription;

  //Data and metadata from the table
  collection : Object[];
  columnsNames: string[];
  columnsTypes: string[];
  columnsWidths: number[];

  tableName: string;
  selectedTable: number;
  numberOfColumns: number;
  p: number;
  recordsPerColum:number;
  error: boolean;
  production: boolean;

  constructor(private fetchDataService: FetchDataService, private tableService: TableService) { }

  ngOnInit(): void {
    this.selectedTable = 0;
    this.error = false;
    this.production = true;
    this.tableName= this.tableNames[this.selectedTable];

    //Getting data to show the first time
    this.fetchDataService.fetchData(this.production, this.tableName, this.selectedTable);

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

  //Toggle between production an mock states, reseting variables and loading the correct table
  toggleState(){
    this.tableService.updatePage(1);
    this.selectedTable = 0;
    this.production = !this.production;
    this.fetchDataService.fetchData(this.production, this.tableName, this.selectedTable);
  }

  //Change the number of records per page to show
  changeValue(option){
    console.log(this.recordsPerColum);
    this.recordsPerColum = option.target.value;
    this.tableService.updateRecord(this.recordsPerColum);
    this.tableService.updatePage(1);
  }

  //Update the selected page in the pagination
  onPageChange(page: number){
    this.p = page;
    this.tableService.updatePage(page);
  }

  //Load the corresponding table when selected
  changeTable(index){
    this.tableService.updatePage(1);
    this.selectedTable = index;
    this.tableName= this.tableNames[this.selectedTable];
    this.fetchDataService.fetchData(this.production, this.tableName, this.selectedTable);
  }

  //Reset the values an switch to mock mode when an error ocurres
  onHandleError(){
    this.tableService.setError();
    this.production = false;
    this.selectedTable = 0;
    this.fetchDataService.fetchData(this.production, this.tableName, this.selectedTable);
  }

  ngOnDestroy(): void{
    this.pageChangeSub.unsubscribe();
    this.recordsChangeSub.unsubscribe();
    this.dataSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

}
