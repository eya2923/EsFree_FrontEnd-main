import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTemplatesBackComponent } from './all-templates-back.component';

describe('AllTemplatesBackComponent', () => {
  let component: AllTemplatesBackComponent;
  let fixture: ComponentFixture<AllTemplatesBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTemplatesBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTemplatesBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
