import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesTitlesComponent } from './tables-titles.component';

describe('TablesTitlesComponent', () => {
  let component: TablesTitlesComponent;
  let fixture: ComponentFixture<TablesTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesTitlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
