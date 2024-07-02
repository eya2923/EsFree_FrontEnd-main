import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddFrontComponent } from './event-add-front.component';

describe('EventAddFrontComponent', () => {
  let component: EventAddFrontComponent;
  let fixture: ComponentFixture<EventAddFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAddFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAddFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
