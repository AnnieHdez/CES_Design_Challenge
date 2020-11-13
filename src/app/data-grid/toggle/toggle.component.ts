import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableService } from 'src/app/shared/table.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  production: boolean;
  @Output() changeState = new EventEmitter<boolean>();

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.production = true;
  }

  //Toggle between production an mock states, reseting variables and loading the correct table
  toggleState(){
    this.tableService.updatePage(1);
    this.production = !this.production;
    this.changeState.emit(this.production);
  }

}
