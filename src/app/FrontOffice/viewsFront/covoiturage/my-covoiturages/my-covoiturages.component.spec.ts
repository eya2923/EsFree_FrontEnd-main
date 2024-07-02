import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCovoituragesComponent } from './my-covoiturages.component';

describe('MyCovoituragesComponent', () => {
  let component: MyCovoituragesComponent;
  let fixture: ComponentFixture<MyCovoituragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCovoituragesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCovoituragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
