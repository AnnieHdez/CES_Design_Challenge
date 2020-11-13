import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableService } from 'src/app/shared/table.service';

@Component({
  selector: 'app-records-selector',
  templateUrl: './records-selector.component.html',
  styleUrls: ['./records-selector.component.css']
})
export class RecordsSelectorComponent implements OnInit, OnDestroy {

  @Input() numberOfRecords;
  private recordsChangeSub: Subscription;

  recordsPerColum:number;

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.tableService.updateRecord(this.numberOfRecords[0])
    this.recordsChangeSub = this.tableService.recordsPerColumChanged.subscribe(
      (newRecords)=>{
        this.recordsPerColum = newRecords;
      }
    );
  }

   //Change the number of records per page to show
   changeValue(option){
    this.recordsPerColum = option.target.value;
    this.tableService.updateRecord(this.recordsPerColum);
    this.tableService.updatePage(1);
  }

  ngOnDestroy(){
    this.recordsChangeSub.unsubscribe();
  }
}
