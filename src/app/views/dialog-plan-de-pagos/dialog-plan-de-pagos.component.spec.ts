import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlanDePagosComponent } from './dialog-plan-de-pagos.component';

describe('DialogPlanDePagosComponent', () => {
  let component: DialogPlanDePagosComponent;
  let fixture: ComponentFixture<DialogPlanDePagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPlanDePagosComponent]
    });
    fixture = TestBed.createComponent(DialogPlanDePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
