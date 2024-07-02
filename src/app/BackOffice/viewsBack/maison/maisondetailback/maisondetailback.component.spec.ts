import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisondetailbackComponent } from './maisondetailback.component';

describe('MaisondetailbackComponent', () => {
  let component: MaisondetailbackComponent;
  let fixture: ComponentFixture<MaisondetailbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaisondetailbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisondetailbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
