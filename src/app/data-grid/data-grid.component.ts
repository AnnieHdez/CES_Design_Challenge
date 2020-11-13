import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchDataService} from '../shared/fetch-data.service';
import { TableService } from '../shared/table.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit, OnDestroy {
  @Input() prodTableNames: string[] = ["products","employees"];
  @Input() numberOfRecords: number[]  = [5,10,15];

  private dataSub: Subscription;
  private errorSub: Subscription;

  //Data and metadata from the table
  collection : Object[];
  columnsNames: string[];
  columnsTypes: string[];
  columnsWidths: number[];

  tableName: string;
  selectedTable: number;
  numberOfColumns: number;
  error: boolean;
  production: boolean;
  tableNames: string[];
  mockTablesNames: string[] = ["table1", "table2"]; 

  constructor(private fetchDataService: FetchDataService, private tableService: TableService) { }

  ngOnInit(): void {
    this.tableNames = this.prodTableNames;
    this.selectedTable = 0;
    this.error = false;
    this.production = true;
    this.tableName= this.tableNames[this.selectedTable];

    //Getting data to show the first time
    this.fetchDataService.fetchData(this.production, this.tableName);

    this.dataSub = this.tableService.tableChanged.subscribe(
      newTable => {
        this.collection = newTable.data;
        this.columnsNames = newTable.columnsNames;
        this.columnsTypes = newTable.columnsTypes;
        this.columnsWidths = newTable.columnsWidths;
      },
    );

    this.errorSub = this.tableService.errorChanged.subscribe(
      (error) => {
        this.error = error;
      }

    )
  }
  toggleState(value: boolean){
    this.selectedTable = 0;
    this.production = value;

    if(this.production)
      this.tableNames = this.prodTableNames;
    else
      this.tableNames = this.mockTablesNames;

    this.tableName = this.tableNames[this.selectedTable];
    this.fetchDataService.fetchData(this.production, this.tableName);
  }

  changeTable(index){
    this.tableService.updatePage(1);
    this.selectedTable = index;
    this.tableName= this.tableNames[this.selectedTable]; 
    this.fetchDataService.fetchData(this.production, this.tableName);
  }

  //Reset the values an switch to mock mode when an error ocurres
  onHandleError(){
    this.tableService.setError();
    this.production = false;
    this.selectedTable = 0;
    this.fetchDataService.fetchData(this.production, this.tableName);
  }

  ngOnDestroy(): void{
    this.dataSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

}
