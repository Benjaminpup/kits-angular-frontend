import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolRegistrationComponent } from './protocol-registration.component';

describe('ProtocolRegistrationComponent', () => {
  let component: ProtocolRegistrationComponent;
  let fixture: ComponentFixture<ProtocolRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtocolRegistrationComponent]
    });
    fixture = TestBed.createComponent(ProtocolRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
