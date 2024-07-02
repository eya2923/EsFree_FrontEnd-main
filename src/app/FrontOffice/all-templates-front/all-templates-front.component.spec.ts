import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTemplatesFrontComponent } from './all-templates-front.component';

describe('AllTemplatesFrontComponent', () => {
  let component: AllTemplatesFrontComponent;
  let fixture: ComponentFixture<AllTemplatesFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTemplatesFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTemplatesFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
