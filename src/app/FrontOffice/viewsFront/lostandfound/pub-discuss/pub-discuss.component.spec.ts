import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubDiscussComponent } from './pub-discuss.component';

describe('PubDiscussComponent', () => {
  let component: PubDiscussComponent;
  let fixture: ComponentFixture<PubDiscussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubDiscussComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubDiscussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
