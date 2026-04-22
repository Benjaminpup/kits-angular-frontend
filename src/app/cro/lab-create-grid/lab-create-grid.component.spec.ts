import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabCreateGridComponent } from './lab-create-grid.component';

describe('LabCreateGridComponent', () => {
  let component: LabCreateGridComponent;
  let fixture: ComponentFixture<LabCreateGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabCreateGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabCreateGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
