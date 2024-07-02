import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisonlistComponent } from './maisonlist.component';

describe('MaisonlistComponent', () => {
  let component: MaisonlistComponent;
  let fixture: ComponentFixture<MaisonlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaisonlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisonlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
