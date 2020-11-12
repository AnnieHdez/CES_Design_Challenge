import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Table } from './table.model';

@Injectable({providedIn: 'root'})
export class TableService {
    constructor(private http: HttpClient) {}

    p: number = 1;
    changedPage = new Subject<number>();

    recordsPerColum: number;
    recordsPerColumChanged = new Subject<number>();

    table: Table;
    tableChanged = new Subject<Table>();

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

    updateTable(table){
        this.table = table;
        this.tableChanged.next(this.table);
    }

}