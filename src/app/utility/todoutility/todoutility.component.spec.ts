import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoutilityComponent } from './todoutility.component';

describe('TodoutilityComponent', () => {
  let component: TodoutilityComponent;
  let fixture: ComponentFixture<TodoutilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoutilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoutilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
