import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionListBComponent } from './session-list-b.component';

describe('SessionListBComponent', () => {
  let component: SessionListBComponent;
  let fixture: ComponentFixture<SessionListBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionListBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionListBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
