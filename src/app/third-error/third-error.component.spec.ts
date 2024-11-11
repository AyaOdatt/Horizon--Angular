import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdErrorComponent } from './third-error.component';

describe('ThirdErrorComponent', () => {
  let component: ThirdErrorComponent;
  let fixture: ComponentFixture<ThirdErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdErrorComponent]
    });
    fixture = TestBed.createComponent(ThirdErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
