import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComparacionComponent } from './dialog-comparacion.component';

describe('DialogComparacionComponent', () => {
  let component: DialogComparacionComponent;
  let fixture: ComponentFixture<DialogComparacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComparacionComponent]
    });
    fixture = TestBed.createComponent(DialogComparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
