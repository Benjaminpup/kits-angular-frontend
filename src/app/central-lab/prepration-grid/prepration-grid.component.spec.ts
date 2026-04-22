import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprationGridComponent } from './prepration-grid.component';

describe('PreprationGridComponent', () => {
  let component: PreprationGridComponent;
  let fixture: ComponentFixture<PreprationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreprationGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreprationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
