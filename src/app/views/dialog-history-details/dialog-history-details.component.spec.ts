import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistoryDetailsComponent } from './dialog-history-details.component';

describe('DialogHistoryDetailsComponent', () => {
  let component: DialogHistoryDetailsComponent;
  let fixture: ComponentFixture<DialogHistoryDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogHistoryDetailsComponent]
    });
    fixture = TestBed.createComponent(DialogHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
