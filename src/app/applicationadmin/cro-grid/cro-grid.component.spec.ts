import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroGridComponent } from './cro-grid.component';

describe('CroGridComponent', () => {
  let component: CroGridComponent;
  let fixture: ComponentFixture<CroGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CroGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
