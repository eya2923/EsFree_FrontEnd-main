import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisonlistbackComponent } from './maisonlist.component';

describe('MaisonlistComponent', () => {
  let component: MaisonlistbackComponent;
  let fixture: ComponentFixture<MaisonlistbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaisonlistbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisonlistbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
