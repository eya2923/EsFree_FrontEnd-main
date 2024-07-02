import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratLocationlistComponent } from './contrat-locationlist.component';

describe('ContratLocationlistComponent', () => {
  let component: ContratLocationlistComponent;
  let fixture: ComponentFixture<ContratLocationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratLocationlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratLocationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
