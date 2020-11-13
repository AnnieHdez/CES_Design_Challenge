import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Table} from './table.model';
import { TableService } from './table.service';

@Injectable({providedIn: 'root'})
export class FetchDataService {
  private productionURL = 'https://demo8483635.mockable.io/';
  private mockUrl = 'assets/'

  constructor(private http: HttpClient, private tableService: TableService) {}
    
  fetchData(production: boolean, table: string) {
    let url = ""
    if(production)
      url = this.productionURL + table;

    else
      url = this.mockUrl + table + '.json'

      return this.http
          .get<Table>(
              url
          )
          .subscribe( table =>{
            this.tableService.updateTable(table);
          },
          () =>{
            this.tableService.throwError();
          }
          );
  }
}