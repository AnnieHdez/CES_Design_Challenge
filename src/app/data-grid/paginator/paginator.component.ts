import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableService } from 'src/app/shared/table.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnDestroy {
  private pageChangeSub: Subscription;

  p: number;

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.pageChangeSub = this.tableService.changedPage.subscribe(
      (newPage)=>{
        this.p = newPage;
      }
    );
  }

  //Update the selected page in the pagination
  onPageChange(page: number){
    this.p = page;
    this.tableService.updatePage(page);
  }

  ngOnDestroy(){
    this.pageChangeSub.unsubscribe();
  }

}
