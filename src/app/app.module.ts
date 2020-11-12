import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { TableComponent } from './data-grid/table/table.component';
import { LoadingSpinerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DataGridComponent,
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
