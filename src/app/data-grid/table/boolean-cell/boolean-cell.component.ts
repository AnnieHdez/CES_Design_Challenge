import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boolean-cell',
  templateUrl: './boolean-cell.component.html',
  styleUrls: ['./boolean-cell.component.css']
})
export class BooleanCellComponent implements OnInit {
  @Input() value;

  constructor() { }

  ngOnInit(): void {
  }

}
