import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitDistributionComponent } from './kit-distribution.component';

describe('KitDistributionComponent', () => {
  let component: KitDistributionComponent;
  let fixture: ComponentFixture<KitDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitDistributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
