import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitPreprationComponent } from './kit-prepration.component';

describe('KitPreprationComponent', () => {
  let component: KitPreprationComponent;
  let fixture: ComponentFixture<KitPreprationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitPreprationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitPreprationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
