import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCovoiturageComponent } from './detail-covoiturage.component';

describe('DetailCovoiturageComponent', () => {
  let component: DetailCovoiturageComponent;
  let fixture: ComponentFixture<DetailCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCovoiturageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
