import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorStudyComponent } from './sponsor-study.component';

describe('SponsorStudyComponent', () => {
  let component: SponsorStudyComponent;
  let fixture: ComponentFixture<SponsorStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorStudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
