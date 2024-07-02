import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListUserComponent } from './event-list-user.component';

describe('EventListUserComponent', () => {
  let component: EventListUserComponent;
  let fixture: ComponentFixture<EventListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
