import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { TableCellComponent } from './data-grid/table/table-cell/table-cell.component';
import { BooleanCellComponent } from './data-grid/table/boolean-cell/boolean-cell.component';
import { TableComponent } from './data-grid/table/table.component';
import { LoadingSpinerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DataGridComponent,
    TableCellComponent,
    BooleanCellComponent,
    LoadingSpinerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
