import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuppComponent } from './signupp.component';

describe('SignuppComponent', () => {
  let component: SignuppComponent;
  let fixture: ComponentFixture<SignuppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignuppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
