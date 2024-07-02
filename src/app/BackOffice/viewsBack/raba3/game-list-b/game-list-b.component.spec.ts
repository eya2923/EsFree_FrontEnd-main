import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListBComponent } from './game-list-b.component';

describe('GameListBComponent', () => {
  let component: GameListBComponent;
  let fixture: ComponentFixture<GameListBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameListBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameListBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
