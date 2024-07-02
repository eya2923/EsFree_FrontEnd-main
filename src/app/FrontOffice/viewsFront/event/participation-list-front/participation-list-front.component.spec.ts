import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationListFrontComponent } from './participation-list-front.component';

describe('ParticipationListFrontComponent', () => {
  let component: ParticipationListFrontComponent;
  let fixture: ComponentFixture<ParticipationListFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipationListFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipationListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
