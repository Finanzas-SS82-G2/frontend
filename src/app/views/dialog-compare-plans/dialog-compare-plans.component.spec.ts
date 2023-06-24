import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComparePlansComponent } from './dialog-compare-plans.component';

describe('DialogComparePlansComponent', () => {
  let component: DialogComparePlansComponent;
  let fixture: ComponentFixture<DialogComparePlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComparePlansComponent]
    });
    fixture = TestBed.createComponent(DialogComparePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
