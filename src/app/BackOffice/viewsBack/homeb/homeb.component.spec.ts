import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebComponent } from './homeb.component';

describe('HomebComponent', () => {
  let component: HomebComponent;
  let fixture: ComponentFixture<HomebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
