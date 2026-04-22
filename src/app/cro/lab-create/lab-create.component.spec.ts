import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabCreateComponent } from './lab-create.component';

describe('LabCreateComponent', () => {
  let component: LabCreateComponent;
  let fixture: ComponentFixture<LabCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
