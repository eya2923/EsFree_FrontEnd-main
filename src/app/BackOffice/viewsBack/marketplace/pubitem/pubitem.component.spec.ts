import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubitemComponent } from './pubitem.component';

describe('PubitemComponent', () => {
  let component: PubitemComponent;
  let fixture: ComponentFixture<PubitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
