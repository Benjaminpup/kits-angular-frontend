import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitPreprationEditComponent } from './kit-prepration-edit.component';

describe('KitPreprationEditComponent', () => {
  let component: KitPreprationEditComponent;
  let fixture: ComponentFixture<KitPreprationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitPreprationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitPreprationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
