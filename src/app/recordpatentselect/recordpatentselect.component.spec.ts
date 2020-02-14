import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordpatentselectComponent } from './recordpatentselect.component';

describe('RecordpatentselectComponent', () => {
  let component: RecordpatentselectComponent;
  let fixture: ComponentFixture<RecordpatentselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordpatentselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordpatentselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
