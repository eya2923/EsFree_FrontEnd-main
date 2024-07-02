import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListUsersComponent } from './item-list-users.component';

describe('ItemListUsersComponent', () => {
  let component: ItemListUsersComponent;
  let fixture: ComponentFixture<ItemListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
