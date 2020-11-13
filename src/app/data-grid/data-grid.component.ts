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

    this.errorSub = this.tableService.errorChanged.subscribe(
      (error) => {
        this.error = error;
      }

    )
  }
  toggleState(value: boolean){
    this.selectedTable = 0;
    this.production = value;
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
    this.dataSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

}
