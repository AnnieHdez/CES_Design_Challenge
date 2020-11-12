import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchDataService, Table } from '../fetch-data.service';

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

  tables = ["Table1", "table2", "table3", "Table4"]
  selectedTable = "Table1";

  collection : Table;

  // collection = [
  //   {'name': 'Smith','address': 'Australia','skills': 'PHP', 'boolean': true},
  //   {'name':'William', 'address':'England','skills': 'Java', 'boolean':true},
  //   {'name':'Andy', 'address':'Africa','skills': 'Perl', 'boolean': false},
  //   {'name':'Jhon', 'address':'Africa','skills': 'JavaScript', 'boolean': false},
  //   {'name':'Flower', 'address':'Brazil','skills': 'Angular', 'boolean':true},
  //   {'name':'Grant', 'address':'India','skills': 'JavaScript', 'boolean':true},
  //   {'name':'Root', 'address':'Sri Lanka','skills': 'PHP', 'boolean': false},
  //   {'name':'Joy', 'address':'Canada','skills': 'NodeJS', 'boolean': false},
  //   {'name':'Samson', 'address':'India','skills': 'JavaScript', 'boolean':true},
  //   {'name':'Sanju', 'address':'India','skills': 'PHP', 'boolean':true},
  //   {'name':'Rocky', 'address':'America','skills': 'PHP', 'boolean': false},
  //   {'name':'Monty', 'address':'England','skills': 'Angular', 'boolean': false},
  //   {'name':'Peter', 'address':'England','skills': 'JavaScript', 'boolean':true},
  //   {'name':'Fleming', 'address':'Newziland','skills': 'PHP', 'boolean':true},
  //   {'name':'Astle', 'address':'England','skills': 'Angular', 'boolean': false},
  //   {'name':'Chris', 'address':'France','skills': 'JavaScript', 'boolean': false},
  //   {'name':'Butler', 'address':'England','skills': 'PHP', 'boolean':true}
  // ];

  constructor(private fetchDataService: FetchDataService) { }


  ngOnInit(): void {
    this.fetchDataService.fetchData();
    this.collection = this.fetchDataService.element;
    console.log(this.collection);

    this.fetchDataService.updateRecord(this.numberOfRecords[0])
    this.recordsChangeSub = this.fetchDataService.recordsPerColumChanged.subscribe(
      (newRecords)=>{
        this.recordsPerColum = newRecords;
      }
    );

    this.recordsPerColum = this.fetchDataService.getRecord();

    this.numberOfColumns = this.collection.columnsNames.length;

    this.p = this.fetchDataService.getPage();

    this.pageChangeSub = this.fetchDataService.changedPage.subscribe(
      (newPage)=>{
        this.p = newPage;
      }
    );
  }

  toggleState(){
    this.fetchDataService.fetchData();
    this.collection = this.fetchDataService.element;
  }

  changeValue(option){
    console.log(this.recordsPerColum);
    this.recordsPerColum = option.target.value;
    this.fetchDataService.updateRecord(this.recordsPerColum);
    this.fetchDataService.updatePage(1);
  }

  onPageChange(page: number){
    this.p = page;
    this.fetchDataService.updatePage(page);
  }

  ngOnDestroy(): void{
    this.pageChangeSub.unsubscribe();
    this.recordsChangeSub.unsubscribe();
  }

}
