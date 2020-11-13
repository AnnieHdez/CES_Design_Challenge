import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { TableComponent } from './data-grid/table/table.component';
import { LoadingSpinerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { ToggleComponent } from './data-grid/toggle/toggle.component';
import { TablesTitlesComponent } from './data-grid/tables-titles/tables-titles.component';
import { PaginatorComponent } from './data-grid/paginator/paginator.component';
import { RecordsSelectorComponent } from './data-grid/records-selector/records-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DataGridComponent,
    LoadingSpinerComponent,
    AlertComponent,
    ToggleComponent,
    TablesTitlesComponent,
    PaginatorComponent,
    RecordsSelectorComponent
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
