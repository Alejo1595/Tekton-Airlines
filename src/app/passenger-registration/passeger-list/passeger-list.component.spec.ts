import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassegerListComponent } from './passeger-list.component';

describe('PassegerListComponent', () => {
  let component: PassegerListComponent;
  let fixture: ComponentFixture<PassegerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassegerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassegerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
