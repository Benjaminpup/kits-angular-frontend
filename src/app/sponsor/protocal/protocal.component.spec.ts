import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocalComponent } from './protocal.component';

describe('ProtocalComponent', () => {
  let component: ProtocalComponent;
  let fixture: ComponentFixture<ProtocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
