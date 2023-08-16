import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatBoxComponent } from './stat-box.component';

describe('StatBoxComponent', () => {
  let component: StatBoxComponent;
  let fixture: ComponentFixture<StatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
