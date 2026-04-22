import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySiteacknowledgementComponent } from './study-siteacknowledgement.component';

describe('StudySiteacknowledgementComponent', () => {
  let component: StudySiteacknowledgementComponent;
  let fixture: ComponentFixture<StudySiteacknowledgementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudySiteacknowledgementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudySiteacknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
