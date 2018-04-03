import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRugComponent } from './add-rug.component';

describe('AddRugComponent', () => {
  let component: AddRugComponent;
  let fixture: ComponentFixture<AddRugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
