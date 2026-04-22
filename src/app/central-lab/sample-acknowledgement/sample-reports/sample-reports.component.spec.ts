import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleReportsComponent } from './sample-reports.component';

describe('SampleReportsComponent', () => {
  let component: SampleReportsComponent;
  let fixture: ComponentFixture<SampleReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
