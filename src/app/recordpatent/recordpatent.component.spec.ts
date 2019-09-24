import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordpatentComponent } from './recordpatent.component';

describe('RecordpatentComponent', () => {
  let component: RecordpatentComponent;
  let fixture: ComponentFixture<RecordpatentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordpatentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordpatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
