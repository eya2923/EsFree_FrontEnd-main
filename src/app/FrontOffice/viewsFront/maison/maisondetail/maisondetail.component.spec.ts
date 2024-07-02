import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisondetailComponent } from './maisondetail.component';

describe('MaisondetailComponent', () => {
  let component: MaisondetailComponent;
  let fixture: ComponentFixture<MaisondetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaisondetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
