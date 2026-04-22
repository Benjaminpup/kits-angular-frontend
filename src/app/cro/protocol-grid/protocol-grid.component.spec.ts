import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolGridComponent } from './protocol-grid.component';

describe('ProtocolGridComponent', () => {
  let component: ProtocolGridComponent;
  let fixture: ComponentFixture<ProtocolGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocolGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocolGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
