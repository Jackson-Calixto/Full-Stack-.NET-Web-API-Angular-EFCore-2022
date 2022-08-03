import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalestrantesComponent } from './palestrantes.component';

describe('PalestrantesComponent', () => {
  let component: PalestrantesComponent;
  let fixture: ComponentFixture<PalestrantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalestrantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalestrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
