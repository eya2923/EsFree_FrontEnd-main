import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartfComponent } from './cartf.component';

describe('CartfComponent', () => {
  let component: CartfComponent;
  let fixture: ComponentFixture<CartfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
