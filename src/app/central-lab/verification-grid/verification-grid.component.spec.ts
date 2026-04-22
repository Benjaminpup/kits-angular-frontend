import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationGridComponent } from './verification-grid.component';

describe('VerificationGridComponent', () => {
  let component: VerificationGridComponent;
  let fixture: ComponentFixture<VerificationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
