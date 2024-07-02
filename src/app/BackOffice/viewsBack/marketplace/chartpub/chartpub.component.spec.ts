import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartpubComponent } from './chartpub.component';

describe('ChartpubComponent', () => {
  let component: ChartpubComponent;
  let fixture: ComponentFixture<ChartpubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartpubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartpubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
