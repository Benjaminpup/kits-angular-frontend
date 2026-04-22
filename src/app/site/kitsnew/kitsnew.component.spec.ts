import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsnewComponent } from './kitsnew.component';

describe('KitsnewComponent', () => {
  let component: KitsnewComponent;
  let fixture: ComponentFixture<KitsnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitsnewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitsnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
