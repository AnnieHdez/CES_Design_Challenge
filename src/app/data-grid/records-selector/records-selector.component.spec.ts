import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsSelectorComponent } from './records-selector.component';

describe('RecordsSelectorComponent', () => {
  let component: RecordsSelectorComponent;
  let fixture: ComponentFixture<RecordsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
