import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Table } from './table.model';

@Injectable({providedIn: 'root'})
export class TableService {
    constructor() {}

    private p: number = 1;
    changedPage = new Subject<number>();

    private recordsPerColum: number;
    recordsPerColumChanged = new Subject<number>();

    private table: Table;
    tableChanged = new Subject<Table>();

    private error: boolean = false;
    errorChanged = new Subject<boolean>();

    getPage(){
      return this.p;
    }

    updatePage(newPage: number){
      this.p = newPage;
      this.changedPage.next(this.p);
    }

    getRecord(){
      return this.recordsPerColum;
    }

    updateRecord(newRecord: number){
      this.recordsPerColum = newRecord;
      this.recordsPerColumChanged.next(this.recordsPerColum);
    }

    getTable(){
      return this.table;
    }

    updateTable(table){
        this.table = table;
        console.log(table)
        this.tableChanged.next(this.table);
    }

    throwError(error){
      this.error = true;
      this.errorChanged.next(this.error);
    }

    setError(){
      this.error = false;
      this.errorChanged.next(this.error);
    }

}