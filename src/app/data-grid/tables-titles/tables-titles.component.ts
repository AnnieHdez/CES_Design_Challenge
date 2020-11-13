import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FetchDataService } from 'src/app/fetch-data.service';
import { TableService } from 'src/app/table.service';

@Component({
  selector: 'app-tables-titles',
  templateUrl: './tables-titles.component.html',
  styleUrls: ['./tables-titles.component.css']
})
export class TablesTitlesComponent implements OnInit {
  selectedTable: number;
  tableName: string;
  @Input() tableNames;
  @Input() production;

  constructor(private tableService: TableService, private fetchDataService: FetchDataService) { }

  ngOnInit(): void {
    this.selectedTable = 0;
  }

  changeTable(index){
    this.tableService.updatePage(1);
    this.selectedTable = index;
    this.selectedTable = index;
    this.tableName= this.tableNames[this.selectedTable];
    this.fetchDataService.fetchData(this.production, this.tableName, this.selectedTable);
  }

}
