import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitVerificationComponent } from './kit-verification.component';

describe('KitVerificationComponent', () => {
  let component: KitVerificationComponent;
  let fixture: ComponentFixture<KitVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
