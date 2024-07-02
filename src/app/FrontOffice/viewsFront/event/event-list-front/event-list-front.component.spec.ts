import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListFrontComponent } from './event-list-front.component';

describe('EventListFrontComponent', () => {
  let component: EventListFrontComponent;
  let fixture: ComponentFixture<EventListFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
