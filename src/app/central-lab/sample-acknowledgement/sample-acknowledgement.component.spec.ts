import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleAcknowledgementComponent } from './sample-acknowledgement.component';

describe('SampleAcknowledgementComponent', () => {
  let component: SampleAcknowledgementComponent;
  let fixture: ComponentFixture<SampleAcknowledgementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleAcknowledgementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
