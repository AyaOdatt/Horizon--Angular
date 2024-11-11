import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondErrorComponent } from './second-error.component';

describe('SecondErrorComponent', () => {
  let component: SecondErrorComponent;
  let fixture: ComponentFixture<SecondErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondErrorComponent]
    });
    fixture = TestBed.createComponent(SecondErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
