import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewkitsComponent } from './newkits.component';

describe('NewkitsComponent', () => {
  let component: NewkitsComponent;
  let fixture: ComponentFixture<NewkitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewkitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewkitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
