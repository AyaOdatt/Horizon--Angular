import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstErrorComponent } from './first-error.component';

describe('FirstErrorComponent', () => {
  let component: FirstErrorComponent;
  let fixture: ComponentFixture<FirstErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstErrorComponent]
    });
    fixture = TestBed.createComponent(FirstErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
