import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailFrontComponent } from './event-detail-front.component';

describe('EventDetailFrontComponent', () => {
  let component: EventDetailFrontComponent;
  let fixture: ComponentFixture<EventDetailFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDetailFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
