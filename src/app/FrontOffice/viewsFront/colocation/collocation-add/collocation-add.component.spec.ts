import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollocationAddComponent } from './collocation-add.component';

describe('CollocationAddComponent', () => {
  let component: CollocationAddComponent;
  let fixture: ComponentFixture<CollocationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollocationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollocationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
