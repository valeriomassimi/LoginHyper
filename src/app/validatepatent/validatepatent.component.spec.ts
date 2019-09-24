import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatepatentComponent } from './validatepatent.component';

describe('ValidatepatentComponent', () => {
  let component: ValidatepatentComponent;
  let fixture: ComponentFixture<ValidatepatentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatepatentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatepatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
