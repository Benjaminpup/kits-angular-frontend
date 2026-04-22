import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CROcreateComponent } from './crocreate.component';

describe('CROcreateComponent', () => {
  let component: CROcreateComponent;
  let fixture: ComponentFixture<CROcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CROcreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CROcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
